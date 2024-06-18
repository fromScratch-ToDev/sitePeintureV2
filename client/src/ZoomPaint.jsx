import React, { useState } from "react"
import { createUseStyles } from "react-jss"
import FooterDescriptionPaint from "./FooterDescriptionPaint";
import ModalConfirm from "./ModalConfirm";
import ButtonModal from "./ButtonModal";

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
    },
    trash:{
        right:"0",
        '&:hover':{
            stroke:"red",
        },
    },
    img:({zoomed})=>({
        maxHeight:zoomed?"150vh":"95vh",
        maxWidth:zoomed?"150%":"95%",
        cursor:zoomed?"zoom-out":"zoom-in",
        margin:"auto",
    }),
    p:{
        marginTop:"0",
        padding:'0px 12px',
    },
})



function ZoomPaint({paintSelected, setIsPaintZoomed, paintArray, setPaintArray}) {
    
    const [isMouseBottomScreen, setIsMouseBottomScreen] = useState(true);
    const [zoomed, setZoomed] = useState(false);
    const classes = useStyles({zoomed});
    
    function handleClickSvgReturn() {
        setIsPaintZoomed(false);   
    }
    function handleModalShow() {
        const modal = document.querySelector("dialog");
        modal.open ? modal.close() : modal.showModal();
    }
  
    function handleClickIMG() {
        setZoomed(!zoomed);
    }
    function handleMouseMove(event){
        if (!zoomed) {
            
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

    function deleteImage(){
        fetch("/api/deleteImage",{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                urlPeinture : paintSelected.replace("http://localhost:3001","")
            })
        })
        .then(()=>{
            paintArray.splice(paintArray.indexOf(paintSelected),1);
            setPaintArray(paintArray);
            setIsPaintZoomed(false);
        })

    }
    
    setTimeout(() => {
        document.addEventListener('mousemove', handleMouseMove);
    }, 1500);


    return(
        <div className={classes.div}>
            <div className={classes.backdrop}></div>
            <svg  viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="lightgrey" className={classes.svg} onClick={handleClickSvgReturn}>
                <path strokeLinecap="round"  strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="lightgrey" className={`${classes.svg} ${classes.trash}`} onClick={handleModalShow}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            <img src={paintSelected} className={classes.img} alt=" vue pleine écran avec description" onClick={handleClickIMG}></img>
            
               <ModalConfirm 
                    header={
                        <p className={classes.p}>Êtes vous sûr de vouloir supprimer cette image ?</p>
                    }
                    buttonConfirm = {
                        <ButtonModal text="oui" f={deleteImage}></ButtonModal>
                    }
                    buttonCancel = {
                        <ButtonModal text="non" f={handleModalShow}></ButtonModal>
                    }>
               </ModalConfirm>
               
            <FooterDescriptionPaint isMouseBottomScreen={isMouseBottomScreen} paintSelected={paintSelected}></FooterDescriptionPaint>                             
        </div>
    )
}


export default ZoomPaint