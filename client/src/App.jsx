import PaintSelector from "./scenes/PaintSelector/PaintSelector";
import PaintGallery from "./scenes/PaintGallery/PaintGallery";
import { createUseStyles } from 'react-jss';
import { useState, useEffect, useRef } from "react";
import PaintDetail from "./scenes/PaintDetail/PaintDetail";

const useStyles = createUseStyles({
  app : {
    display : 'flex',
    flexDirection : "column",
    width:'100%',
  }
})
async function fetchCategoriesNames() {
  const request = await fetch('http://localhost:3001/api/categories/getCategoryNames');
  const res = await request.json();
  return res;
}


function App() {
  
  const classes = useStyles();

  const [paintArray, setPaintArray] = useState([]);
  const [isPaintZoomed, setIsPaintZoomed] = useState(false);
  const [paintSelected, setPaintSelected] = useState("");
  const [isClosed, setIsClosed] = useState(true);
  const [buttonRadioSelected, setButtonRadioSelected] = useState();
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState('');

  const paintSelector = useRef(null);

  useEffect(()=>{
    const promise = fetchCategoriesNames();
   
    promise.then(newCategoriesNames => {
      setCategoriesNames(newCategoriesNames)
      setButtonRadioSelected(0)
    });

    fetch('http://localhost:3001/api/backup/backup');
  },[])
  
  function handleClick(e) {
      if(! paintSelector.current.contains(e.target)){
        setIsClosed(true)
      }
  }

  if (isPaintZoomed) {
    return(
      <PaintDetail paintSelected={paintSelected} setIsPaintZoomed={setIsPaintZoomed} categoriesNames={categoriesNames} paintArray={paintArray} setPaintArray={setPaintArray}></PaintDetail>
    )
  }
  else{
    return (
      <div className={classes.app} onClick={(e)=>handleClick(e)}>
        <PaintSelector ref={paintSelector} buttonRadioSelected={buttonRadioSelected} setButtonRadioSelected={setButtonRadioSelected} categoriesNames={categoriesNames} setCategoriesNames={setCategoriesNames} setPaintArray={setPaintArray} isClosed={isClosed} setIsClosed={setIsClosed} setCategoryDescription={setCategoryDescription}/>
        <PaintGallery paintArray={paintArray} setPaintArray={setPaintArray} setPaintSelected={setPaintSelected} setIsPaintZoomed={setIsPaintZoomed} categoriesNames={categoriesNames} buttonRadioSelected={buttonRadioSelected} categoryDescription={categoryDescription}/>
      </div>
    );
  }
}

export default App;
