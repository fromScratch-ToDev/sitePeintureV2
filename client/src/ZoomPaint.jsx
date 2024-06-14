import React, { useState, useEffect } from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    div:{
        minWidth:'100%',
        minHeight:'100vh',
        backgroundColor:'#333333',
        display:"flex",
    },
    svg:{
        width:"5vh",
        margin:"12px",
        cursor:"pointer",
        position:"absolute",
        top:"0"
    },
    img:{
        maxHeight:"95vh",
        maxWidth:"95%",
        cursor:"zoom-in",
        margin:"auto",
    },
    zoomed:{
        maxHeight:"150vh",
        maxWidth:"150%",
        cursor:"zoom-out",
    },
    footer:{
        backgroundColor:"rgba(0,0,0,0.75)",
        boxShadow:(isMouseBottomScreen)=>(isMouseBottomScreen ? "0px 0px 100vh 10px rgba(0, 0, 0, 0.4)":"none"),
        minWidth:"100%",
        minHeight:(isMouseBottomScreen)=>( isMouseBottomScreen ? "10vh" : "0vh"),
        maxHeight:(isMouseBottomScreen)=>( isMouseBottomScreen ? "20vh" : "0vh"),
        overflow:"hidden",
        position:"absolute",
        bottom:"0",
        transition:"all 0.4s ease",
        display:"flex",
    },
    p:{
        margin:"auto",
        fontSize:"1.2em",
        color:"rgba(255,255,255,0.75)"
    }
    
 
})

function ZoomPaint({paintSelected, setIsPaintZoomed}) {
    
    const [isMouseBottomScreen, setIsMouseBottomScreen] = useState(false);
    const [descriptionPaint, setdescriptionPaint] = useState("");
    const classes = useStyles(isMouseBottomScreen);

    const urlPaint = paintSelected.replace("http://localhost:3001","");
    const img = document.querySelector('img');

    useEffect(() => {
        fetch(`http://localhost:3001/api/getDescriptionPeinture?urlPaint=${urlPaint}`)
        .then(result => result.json())
        .then(data => {
            setdescriptionPaint(data)
        });
    },[urlPaint])


    function handleClickSVG() {
        setIsPaintZoomed(false);
    }
    function handleClickIMG() {
        if (img.classList.contains(classes.zoomed)) {
            img.classList.remove(classes.zoomed);
        }
        else{
            img.classList.add(classes.zoomed);
        }
    }
    
    function handleMouseMove(event){
        if (img.classList.contains(classes.zoomed) === false) {
            
            const hauteurFenetre = window.innerHeight;
            const margeBas = hauteurFenetre*0.2 ;
            
            if (event.clientY > hauteurFenetre - margeBas) {
                setIsMouseBottomScreen(true);
            } else {
                setIsMouseBottomScreen(false);
            }
        }
        else {
            setIsMouseBottomScreen(false);
        }
    }
   
    document.addEventListener('mousemove', handleMouseMove);

    return(
        <div className={classes.div}>
            
            <svg  viewBox="0 0 24 24" fill="none"   strokeWidth="2" stroke="lightgrey" className={classes.svg} onClick={handleClickSVG}>
                <path strokeLinecap="round"  strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
            <img src={paintSelected} className={classes.img} alt=" vue pleine écran avec description" onClick={handleClickIMG}></img>
          
            <footer className={classes.footer}>
                <p className={classes.p}>
                    {descriptionPaint}
                </p>
            </footer>                               
        </div>
    )
}


export default ZoomPaint