import React from "react";
import { useEffect } from "react";
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


function Paint({idPaint, urlPaint, setPaintSelected, setIsPaintZoomed}) {
    const classes = useStyles();

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
        <div className={classes.div} key={urlPaint} draggable={true}>
            <img src={urlPaint} alt="" data-id={idPaint} className={classes.img} onClick={handleClick} draggable={false}/>
        </div>
    )
}

export default Paint;