import PaintSelector from "./PaintSelector";
import DisplayPaint from "./DisplayPaint";
import { createUseStyles } from 'react-jss';
import { useState, useEffect } from "react";
import ZoomPaint from "./ZoomPaint";

const useStyles = createUseStyles({
  app : {
    display : 'flex',
    width:'100%'
  }
})
async function fetchCategoriesNames() {
  const request = await fetch('http://localhost:3001/api/nomCategorie');
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

  useEffect(()=>{
    const promise = fetchCategoriesNames();
   
    promise.then(newCategoriesNames => {
      setCategoriesNames(newCategoriesNames)
      setButtonRadioSelected(0)
    });

    fetch('http://localhost:3001/api/backup');
  },[])
  
  if (isPaintZoomed) {
    return(
      <ZoomPaint paintSelected={paintSelected} setIsPaintZoomed={setIsPaintZoomed} categoriesNames={categoriesNames}></ZoomPaint>
    )
  }
  else{
    return (
      <div className={classes.app}>
        <PaintSelector buttonRadioSelected={buttonRadioSelected} setButtonRadioSelected={setButtonRadioSelected} categoriesNames={categoriesNames} setCategoriesNames={setCategoriesNames} setPaintArray={setPaintArray} isClosed={isClosed} setIsClosed={setIsClosed}/>
        <DisplayPaint paintArray={paintArray} setPaintArray={setPaintArray} setPaintSelected={setPaintSelected} setIsPaintZoomed={setIsPaintZoomed} categoriesNames={categoriesNames} buttonRadioSelected={buttonRadioSelected}/>
      </div>
    );
  }
}

export default App;
