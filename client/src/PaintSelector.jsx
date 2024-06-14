import React from 'react';
import { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container : {
    minWidth : (isClosed) => isClosed ? "0px" : "250px",
    width : "0px",
    maxWidth : "20%",
    maxHeight : "100vh",
    borderRight:"solid black 1px",
    padding:(isClosed) => isClosed ? "0px" : '10px 10px 0 10px',
    position:'sticky',
    top:'0px',
    display:"flex",
    flexDirection:"column",
    transition:"min-width 0.4s ease"
  },
  svgClose :{
    width:"5vh",
    alignSelf:"end",
    cursor:"pointer",
    display:(isClosed) => isClosed && "none",

  },
  svgBurger:{
    position:"absolute",
    top:(isClosed) => isClosed ? "0" : "-10vh",
    width:"5vh",
    padding:"10px",
    cursor:"pointer",
    transition:(isClosed) => isClosed && "all 0s 0.4s",
  },
  form:{
    display:(isClosed) => isClosed && "none",
  }
})

function PaintSelector({checkboxes, setCheckboxes, data, setPaintArray}) {

  const [isClosed, setIsClosed] = useState(false);
  const classes = useStyles(isClosed);
  
  let newPaintArray = [];

  async function requestForPaint(newCheckboxes, index=0) {
    if (index < Array.from(newCheckboxes).length) {
      const request = await fetch(`http://localhost:3001/api/getPeintures?galerieName=${newCheckboxes[index]}`)
      const urlPaints = await request.json() 
      urlPaints.forEach((urlPaint)=>{
        newPaintArray.push(urlPaint)
      })
      
     requestForPaint(newCheckboxes, index+1) 
    }
    else{
      setPaintArray(newPaintArray);
    }
  }

  function handleCheckboxChange(index) {
    const newCheckboxes = [...checkboxes];
    if (newCheckboxes.includes(data[index])){
      newCheckboxes.splice(newCheckboxes.indexOf(data[index]),1);
    }
    else{
      newCheckboxes.unshift(data[index]);
    }

    setCheckboxes(newCheckboxes);
    requestForPaint(newCheckboxes);
  };

  function handleCloseButton() {
    setIsClosed(!isClosed);
  }

  useEffect(()=>{
    const newCheckboxes = [...checkboxes];
    requestForPaint(newCheckboxes);
    // eslint-disable-next-line 
  },[checkboxes])
  return (
    <section className={classes.container}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={classes.svgClose} onClick={handleCloseButton}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="lightgray" className={classes.svgBurger} onClick={handleCloseButton}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      

      <form className={classes.form}>
        {data.map((option, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`option-${index}`}
              name={`option-${index}`}
              checked={checkboxes.includes(option)?true:false}
              onChange={() => handleCheckboxChange(index)}
              />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
      </form>
    </section>
    );
    
}

export default PaintSelector;