import React from "react";
import { useEffect, useRef } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    div:{
        margin:'1vh 0.4vh',
        width:0,
        overflow:'hidden',

      },
      img:{
        height:'300px',
        maxWidth:'540px',
        display:'flex',
        margin:'auto',
        cursor:'pointer',
      }
})


function Paint({idPaint, urlPaint, setPaintSelected, setIsPaintZoomed, onDragPaintStart, onDragPaint, onDragPaintEnd}) {
    // style css
    const classes = useStyles();
    // variables
    const paint = useRef(null);
    // gestionnaires d'évènements
    useEffect(()=>{
        const images = document.querySelectorAll(`.${classes.div}`);
        images.forEach((img, i) => {
            setTimeout(()=>{
                img.style.width = "fit-content";
            },(i+1)*10)
        })
    },[classes.div])

    function handleClick() {
        setIsPaintZoomed(true);
        setPaintSelected({"idPaint":idPaint, "urlPaint":urlPaint});
    }

    return (
        <div className={classes.div} draggable={true} ref={paint} onDragStart={(e)=>onDragPaintStart(e,paint)} onDrag={(e)=>onDragPaint(e,paint)} onDragEnd={(e)=>onDragPaintEnd(e,paint)}>
            <img src={urlPaint} alt="" data-id={idPaint} className={classes.img} onClick={handleClick} draggable={false}/>
        </div>
    )
}

export default Paint;