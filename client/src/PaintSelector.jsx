import React from 'react';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import ModalConfirm from './ModalConfirm';
import ButtonModal from "./ButtonModal";

const useStyles = createUseStyles({
  container : {
    minWidth : (isClosed) => isClosed ? "0px" : "20vw",
    width : "0px",
    maxWidth : "20vw",
    height : "100vh",
    maxHeight : "100vh",
    background: "rgba(0,0,0,0.75)",
    fontSize: "1em",
    color:"lightgray",
    borderRight:"solid black 1px",
    padding:(isClosed) => isClosed ? "0px" : '10px 10px 0 10px',
    position:'fixed',
    top:'0px',
    display:"flex",
    flexDirection:"column",
    transition:"min-width 0.4s ease",
    zIndex:"1",
  },
  svgClose :{
    width:"5vh",
    alignSelf:"end",
    cursor:"pointer",
  },
  svgHidden:{
    position:"absolute",
    width:"5vh",
    padding:"1vh",
    cursor:"pointer",
    transition:(isClosed) => isClosed && "top 0s 0.4s",
  },
  svgBurger:{
    top:(isClosed) => isClosed ? "0" : "-10vh",
  },
  svgPencil:{
    top:(isClosed) => isClosed ? "6vh" : "-10vh",
  },
  svgTrash:{
    top:(isClosed) => isClosed ? "12vh" : "-10vh",
    "&:hover":{
      stroke:'red',
    },
  },
  pointer:{
    cursor:"pointer"
  },
  hideWhenClose:{
    display:(isClosed) => isClosed && "none",
  },
  buttonAdd:{
    alignSelf:"flex-end",
    width:"fit-content",
    cursor: "pointer",
    marginTop:"10px",
    padding: "5px 16px",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "20px",
    verticalAlign: "middle",
    border: "1px solid lightgrey",
    borderRadius: "6px",
    color: "lightgrey",
    backgroundColor: "transparent",
    boxShadow: "rgba(27, 31, 35, 0.04) 0px 1px 0px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset",
    transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
    transitionProperty: "color, background-color, border-color",
    "&:hover":{
        backgroundColor: "#f3f4f6",
        borderColor: "#1b1f2326",
        color:"black",
        transitionDuration: "0.1s",
    },
  },
  input:{
    width:"95%",
    height:"30px",
    margin:"0 2.5% 20px 2.5%",
    border:"0",
    paddingLeft:"10px",

  },
  p:{
    marginTop:"0",
    padding:"0 12px"
  }


})

function PaintSelector({ buttonRadioSelected, setButtonRadioSelected, categoriesNames, setCategoriesNames, setPaintArray, isClosed, setIsClosed}) {

  const classes = useStyles(isClosed);
  const [inputValueChange, setInputValueChange] = useState(categoriesNames[buttonRadioSelected] === undefined ? " ": categoriesNames[buttonRadioSelected]);
  const [inputValueAdd, setInputValueAdd] = useState('');

  useEffect(() => {
    setInputValueChange(categoriesNames[buttonRadioSelected] === undefined ? " ": categoriesNames[buttonRadioSelected]);
  }, [categoriesNames,buttonRadioSelected]);
 
  useEffect(()=>{
    requestForPaint(buttonRadioSelected);
    // eslint-disable-next-line
  },[buttonRadioSelected]);

  async function requestForPaint(index) {
    const newPaintArray = []

    const request = await fetch(`http://localhost:3001/api/getPeintures?galerieName=${categoriesNames[index]}`)
    const urlPaints = await request.json() 
    urlPaints.forEach((urlPaint)=>{
      newPaintArray.push(urlPaint)
    })  
    setPaintArray(newPaintArray);
  }

  function handleRadioChange(index) {
    setButtonRadioSelected(index);
  };
  
  function handleCloseButton() {
    setIsClosed(!isClosed);
  }


  function handleModalShowRename() {
    const modal = document.querySelector("#modalRename");
    modal.open ? modal.close() : modal.showModal();
  }

  async function renameCategorie() {
    const input = document.querySelector('#inputChangeNameCategory');
    const newName = input.value.trim();
    const oldName = categoriesNames[buttonRadioSelected];
    if (newName !== "" && newName !== undefined && oldName!=undefined) {
      await fetch('http://localhost:3001/api/changeCategoryName',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({
          newName:newName,
          oldName:oldName,
        })
      })
      
      let newCategoriesNames = [...categoriesNames];
      newCategoriesNames[buttonRadioSelected] = newName;
    
      setCategoriesNames(newCategoriesNames);
    }
    else if(oldName!=undefined){
      setInputValueChange(oldName);
    } 
    handleModalShowRename();

  }

  function handleModalShowDelete() {
    const modal = document.querySelector("#modalDelete");
    modal.open ? modal.close() : modal.showModal();
  }

  function deleteCategorie() {
    const categoryName = categoriesNames[buttonRadioSelected];
    fetch('http://localhost:3001/api/deleteCategoryName',{
      method:'POST',
      headers:{"content-type":"application/json"},
      body:JSON.stringify({
        nomCategorie:categoryName,
      })
    })
    let newCategoriesNames = [...categoriesNames];
    newCategoriesNames.splice(categoriesNames.indexOf(categoryName),1) ;
    setCategoriesNames(newCategoriesNames);
    setButtonRadioSelected(undefined);
    handleModalShowDelete()
  }

  function handleModalShowAdd(event) {
    event.currentTarget.blur();
    const modal = document.querySelector("#modalAdd");
    modal.open ? modal.close() : modal.showModal();
    setInputValueAdd('');
  }

  function addCategorie() {
    const name = document.querySelector("#inputNameNewCategory").value.trim();
    if (name !== "" && name !== undefined) {
      fetch('http://localhost:3001/api/addCategoryName',{
        method:'POST',
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
          name:name,
        })
      })
      
      let newCategoriesNames = [...categoriesNames,name];
      setCategoriesNames(newCategoriesNames);
      
    }
    document.querySelector("#modalAdd").close();
  }
  
  

  return (
    <section className={classes.container}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="lightgray" className={classes.svgClose} onClick={handleCloseButton}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="lightgray" className={`${classes.svgHidden} ${classes.svgBurger}`} onClick={handleCloseButton}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="lightgray" className={`${classes.svgHidden} ${classes.svgPencil}`} onClick={handleModalShowRename}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="lightgray" className={`${classes.svgHidden} ${classes.svgTrash}`}onClick={handleModalShowDelete}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>

      
      <fieldset className={classes.hideWhenClose}>
        <legend>Catégorie</legend>
        {categoriesNames.map((categoryName, index) => (
          <div key={index} className={classes.divCheckbox}>
            <input
              type="radio"
              id={`button-radio-${index}`}
              name="catégorie"
              checked={buttonRadioSelected === index && true}
              className={classes.pointer}
              onChange={() => handleRadioChange(index)}
              />
            <label htmlFor={`button-radio-${index}`} className={classes.pointer}>{categoryName}</label>
          </div>
        ))}
      </fieldset>
      <button className={`${classes.buttonAdd} ${classes.hideWhenClose}`} onClick={(e)=>handleModalShowAdd(e)}>Ajouter une catégorie</button>


      <ModalConfirm id="modalRename"
        header={
          <>
            <p className={classes.p}>Entrer le nouveau nom de la catégorie</p>
            <input id="inputChangeNameCategory" autoFocus type="text" value={inputValueChange} onChange={(e)=>setInputValueChange(e.target.value)} onKeyDown={(e)=> e.key === 'Enter' && renameCategorie()} className={classes.input}></input>
          </>
        }
        buttonConfirm={
          <ButtonModal text="valider" f={renameCategorie}></ButtonModal>
        }
        buttonCancel={
          <ButtonModal text="annuler" f={handleModalShowRename}></ButtonModal>
        }
        >
      </ModalConfirm>

      <ModalConfirm id="modalDelete"
        header={
            <p className={classes.p}>Êtes vous sûr de vouloir supprimer la catégorie {categoriesNames[buttonRadioSelected]} et toutes ces images ?</p>
        }
        buttonConfirm={
          <ButtonModal text="valider" f={deleteCategorie}></ButtonModal>
        }
        buttonCancel={
          <ButtonModal text="annuler" f={handleModalShowDelete}></ButtonModal>
        }
        >
      </ModalConfirm>

      <ModalConfirm id="modalAdd"
        header={
          <>
            <p className={classes.p}>Entrer le nom de la nouvelle catégorie</p>
            <input id="inputNameNewCategory" autoFocus type="text" value={inputValueAdd} onChange={(e)=>setInputValueAdd(e.target.value)}  onKeyDown={(e)=> e.key === 'Enter' && addCategorie()} className={classes.input}></input>
          </>

        }
        buttonConfirm={
          <ButtonModal text="valider" f={addCategorie}></ButtonModal>
        }
        buttonCancel={
          <ButtonModal text="annuler" f={handleModalShowAdd}></ButtonModal>
        }
        >
      </ModalConfirm>

    </section>
    );
    
}

export default PaintSelector;