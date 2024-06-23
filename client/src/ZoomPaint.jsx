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
        '&:hover':{
            stroke:"darkgrey",
        },
    },
    trash:{
        right:"0",
        '&:hover':{
            stroke:"red",
        },
    },
    gear:{
        right:"0",
        top:"5.5vh",
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
    input:{
        width:"80%",
        height:"25px",
        margin:"auto",
        marginBottom:"20px",
    },
    flexColumnCenter:{
        display:'flex',
        flexDirection:"column",
    }
})



function ZoomPaint({paintSelected, setIsPaintZoomed, categoriesNames, paintArray, setPaintArray}) {
    const [isMouseBottomScreen, setIsMouseBottomScreen] = useState(true);
    const [zoomed, setZoomed] = useState(false);
    const classes = useStyles({zoomed});
    
    function handleClickSvgReturn() {
        setIsPaintZoomed(false);   
    }
    function handleModalDelete() {
        const modal = document.querySelector("#modalDeleteImage");
        modal.open ? modal.close() : modal.showModal();
    }

    function handleModalChangeCategory() {
        const modal = document.querySelector("#modalChangeCategory");
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

    async function deleteImage(){
        await fetch("/api/deleteImage",{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                idPaint : paintSelected.idPaint
            })
        })
        let newPaintArray = [...paintArray];
        newPaintArray.slice(newPaintArray.findIndex(paint => paint[0] === paintSelected.idPaint),1);
        setPaintArray(newPaintArray);
        setIsPaintZoomed(false);   
    }

    function changeCategory() {
        const newCategory = document.querySelector('select').value;

        fetch('http://localhost:3001/api/changeImageCategory',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                id:paintSelected.idPaint,
                nouvelleCategorie:newCategory,
            })
        })
        .then(()=>{
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="lightgrey" className={`${classes.svg} ${classes.trash}`} onClick={handleModalDelete}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="lightgrey" className={`${classes.svg} ${classes.gear}`} onClick={handleModalChangeCategory}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

            <img src={paintSelected.urlPaint} className={classes.img} alt=" vue pleine écran avec description" onClick={handleClickIMG}></img>
            
               <ModalConfirm id="modalDeleteImage"
                    header={
                        <p className={classes.p}>Êtes vous sûr de vouloir supprimer cette image ?</p>
                    }
                    buttonConfirm = {
                        <ButtonModal text="oui" f={deleteImage}></ButtonModal>
                    }
                    buttonCancel = {
                        <ButtonModal text="non" f={handleModalDelete}></ButtonModal>
                    }>
               </ModalConfirm>
               <ModalConfirm id="modalChangeCategory"
                    header={
                        <div className={classes.flexColumnCenter}>
                            <p className={classes.p}>Sélectionnez la nouvelle catégorie pour cette image</p>
                            <select className={classes.input} >
                                {categoriesNames.map(category => <option value={category} key={category}>{category}</option>)}
                            </select>
                        </div>
                    }
                    buttonConfirm = {
                        <ButtonModal text="confirmer" f={changeCategory}></ButtonModal>
                    }
                    buttonCancel = {
                        <ButtonModal text="annuler" f={handleModalChangeCategory}></ButtonModal>
                    }>
               </ModalConfirm>
               
            <FooterDescriptionPaint isMouseBottomScreen={isMouseBottomScreen} paintSelected={paintSelected}></FooterDescriptionPaint>                             
        </div>
    )
}


export default ZoomPaint