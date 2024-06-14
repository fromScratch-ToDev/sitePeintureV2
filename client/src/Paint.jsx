import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    div:{
        margin:'10px',
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
    function handleClick() {
        setIsPaintZoomed(true);
        setPaintSelected(`http://localhost:3001${urlPaint}`);
    }
    
    const classes = useStyles();

    return (
        <div className={classes.div} key={`peinture-${index}}`}>
            <img src={`http://localhost:3001${urlPaint}`} alt="" className={classes.img} onClick={handleClick}/>
        </div>
    )
}

export default Paint;