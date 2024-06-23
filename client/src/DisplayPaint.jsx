import React from "react";
import { createUseStyles } from 'react-jss';
import Paint from './Paint'
import HeaderDescriptionCategory from './HeaderDescriptionCategory'

const useStyles = createUseStyles({
  container:{
    padding:"1vh 2vh 1vh 6.6vh",
    flexGrow:"1",
    minHeight:'100vh',
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"space-between",
    backgroundColor:'#333333',
  },
  modal:{
    position:"fixed",
    width:"100vw",
    height:"100vh",
    margin:'0',
    padding:'0',
    background:"rgba(0,0,0,0.5)",
    
  },
  modalContainer:{
    height:"90vh",
    width:"70vw",
    border:"dashed white 0.5em",
    margin:"auto",
    transform:"translateY(50vh) translateY(-50%)",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center"
  },
  p:{
    fontSize:"3em",
    color:"lightgray",
  }
})

function drop_handler(event, paintArray, setPaintArray, nameCategorySelected, modal) {
  event.preventDefault();
  modal.close();
  const files = event.dataTransfer.files;
  const allowedTypes = [
    'image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/webp',
    'image/svg+xml', 'image/tiff', 'image/vnd.microsoft.icon',
    'image/heic', 'image/heif', 'image/avif',
  ];
  Array.from(files).forEach(async (file) => {
    if (allowedTypes.includes(file.type)) {
      const formData = new FormData(); 
      formData.append('image', file); 
      formData.append('name', file.name);
      formData.append('nomCategorie',nameCategorySelected);
      
      if (nameCategorySelected !== undefined) {
        let newPaintArray = [...paintArray];
        await fetch('http://localhost:3001/api/createImage',{
          method:"POST",
          body:formData,
          })
          .then(response => response.json())
          .then(result => {
            const file = new File([new Uint8Array(result.datapeinture.data)], "image");
            const urlPaint = URL.createObjectURL(file); 
            newPaintArray.push([result.numpeinture, urlPaint])
          })
        
        setPaintArray(newPaintArray);
      }
      else{
        alert("SÉLECTIONNEZ D'ABORD UNE CATÉGORIE !")
      }
    }
    else{
      alert("SEULES LES IMAGES SONT ACCEPTÉES !")
    }
  });
}

function handlerDragEnter(event, modal) {
  if (event.dataTransfer.types.length !== 0) {
    modal.show(); 
  }
}
function handlerDragLeave(event, modal) {
  if(! modal.contains(event.relatedTarget)){
    modal.close(); 
  }
}

function DisplayPaint({paintArray,setPaintArray, setPaintSelected,setIsPaintZoomed,categoriesNames, buttonRadioSelected, categoryDescription}) {
  const classes = useStyles();
  const nameCategorySelected = categoriesNames[buttonRadioSelected];
  const modal = document.querySelector('#modalDragAndDrop');
 
  return (
    <>
      <HeaderDescriptionCategory categoryDescription={categoryDescription} categoryName={categoriesNames[buttonRadioSelected]}></HeaderDescriptionCategory>

      <section className={classes.container} onDragOver={(event) => event.preventDefault()} onDrop={(event)=>drop_handler(event, paintArray, setPaintArray, nameCategorySelected, modal)} onDragEnter={(event)=>handlerDragEnter(event,modal)}>
        <dialog id="modalDragAndDrop" className={classes.modal} onDragLeave={(event)=>handlerDragLeave(event, modal)} >
          <div className={classes.modalContainer} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="lightgrey" width="20vw">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>

            <p className={classes.p}>Ajouter une image</p>
          </div>
        </dialog>
        {paintArray.map(([idPaint, urlPaint])=> <Paint idPaint={idPaint} urlPaint={urlPaint} setPaintSelected={setPaintSelected} setIsPaintZoomed={setIsPaintZoomed} key={`peinture-${idPaint}`}></Paint>)}
      </section>
    </>
         
    );
}

export default DisplayPaint;