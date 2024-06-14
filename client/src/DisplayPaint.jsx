import React from "react";
import { createUseStyles } from 'react-jss';
import Paint from './Paint'

const useStyles = createUseStyles({
  container:{
    padding:"0 10px 0 5vh",
    flexGrow:"1",
    minHeight:'100vh',
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"space-around",
    backgroundColor:'#333333',
  },

})

function DisplayPaint({paintArray, setPaintSelected,setIsPaintZoomed}) {
  const classes = useStyles();

    return (
      <section className={classes.container}>
        {paintArray.map((urlPaint,index)=> <Paint urlPaint={urlPaint} index={index} setPaintSelected={setPaintSelected} setIsPaintZoomed={setIsPaintZoomed} key={`peinture-${index}`}></Paint>)}
      </section>
         
    );
}

export default DisplayPaint;