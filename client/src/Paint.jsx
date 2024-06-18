import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    div:{
        margin:'1vh 0.4vh',
      },
      img:{
        maxHeight:'300px',
        maxWidth:'540px',
        display:'flex',
        margin:'auto',
        cursor:'pointer'
      }
})


function Paint({urlPaint, index, setPaintSelected, setIsPaintZoomed}) {
    const classes = useStyles();
    
    function handleClick() {
        setIsPaintZoomed(true);
        setPaintSelected(`http://localhost:3001${urlPaint}`);
    }


    return (
        <div className={classes.div} key={urlPaint} draggable={true}>
            <img src={`http://localhost:3001${urlPaint}`} alt="" className={classes.img} onClick={handleClick} draggable={false}/>
        </div>
    )
}

export default Paint;