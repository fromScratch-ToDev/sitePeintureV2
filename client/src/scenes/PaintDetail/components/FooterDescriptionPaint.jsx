import React, {useState, useEffect} from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    footer:({isMouseBottomScreen})=>({
        backgroundColor:"rgba(0,0,0,0.75)",
        boxShadow:isMouseBottomScreen ? "0px 0px 100vh 10px rgba(0, 0, 0, 0.4)":"none",
        minWidth:"100%",
        minHeight:isMouseBottomScreen ? "10vh" : "0vh",
        maxHeight:isMouseBottomScreen ? "20vh" : "0vh",
        overflowY:"hidden",
        position:"absolute",
        bottom:"0",
        transition:"all 0.4s ease",
        display:"flex",
    }),
    textarea:{
        width:"90%",
        height:"auto",
        margin:"auto",
        fontSize:"1.2em",
        color:"rgba(255,255,255,0.75)",
        backgroundColor:"transparent",
        outline:"none",
        border:"0",
        resize:"none",
        textAlign:"center",
    }
        
 
})

function saveDescriptionPaint(idPaint, description) {
    fetch("http://localhost:3001/api/paintings/postPaintDescription",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description : description,
            idPaint : idPaint
        })
    })
}

function FooterDescriptionPaint({isMouseBottomScreen, paintSelected}) {
    const [descriptionPaint, setDescriptionPaint] = useState("");
    useEffect(() => {
        fetch(`http://localhost:3001/api/paintings/getPaintDescription?idPaint=${paintSelected.idPaint}`)
        .then(result => result.json())
        .then(data => {
            setDescriptionPaint(data)
        });
      },[paintSelected])  

    function handleOnInput() {
        const tx = document.querySelector('textarea');
        tx.style.height = 'auto';
        tx.style.height = (tx.scrollHeight) + "px";
        const description = document.querySelector("textarea").value
        saveDescriptionPaint(paintSelected.idPaint, description);   
    }
 
    const classes = useStyles({isMouseBottomScreen});
  
    return(
        <footer className={classes.footer}>
            <textarea className={classes.textarea} onInput={handleOnInput} defaultValue={descriptionPaint}></textarea>
        </footer>  
    )
    
}

export default FooterDescriptionPaint