import PaintSelector from "./PaintSelector";
import DisplayPaint from "./DisplayPaint";
import { createUseStyles } from 'react-jss';
import { useState } from "react";
import ZoomPaint from "./ZoomPaint";

const useStyles = createUseStyles({
  app : {
    display : 'flex',
    width:'100%'
  }
})
async function fetchData() {
  const request = await fetch('http://localhost:3001/api/nomCollection');
  const res = await request.json();
  return res;
}

const data = await fetchData();

function App() {
  
  const classes = useStyles();

  const [paintArray, setPaintArray] = useState([]);
  const [isPaintZoomed, setIsPaintZoomed] = useState(false);
  const [paintSelected, setPaintSelected] = useState();
  const [checkboxes, setCheckboxes] = useState(data);
  
  
  if (isPaintZoomed) {
    return(
      <ZoomPaint paintSelected={paintSelected} setIsPaintZoomed={setIsPaintZoomed}></ZoomPaint>
    )
  }
  else{
    return (
      <div className={classes.app}>
        <PaintSelector checkboxes={checkboxes} setCheckboxes={setCheckboxes} data={data} setPaintArray={setPaintArray}/>
        <DisplayPaint paintArray={paintArray} setPaintSelected={setPaintSelected} setIsPaintZoomed={setIsPaintZoomed}/>
      </div>
    );
  }
}

export default App;
