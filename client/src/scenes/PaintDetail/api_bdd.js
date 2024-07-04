export async function deleteImage(paintSelected, paintArray, setPaintArray, setIsPaintZoomed){
    await fetch("/api/images/deleteImage",{
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

export function changeCategory(paintSelected, setIsPaintZoomed) {
    const newCategory = document.querySelector('select').value;

    fetch('http://localhost:3001/api/images/changeImageCategory',{
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
