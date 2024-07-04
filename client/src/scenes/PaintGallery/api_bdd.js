export function modifyPaintOrder(paintIds){
    fetch('/api/paintings/modifyPaintOrder', {
        method:"PUT",
        headers:{'content-type':'application/json'},
        body:JSON.stringify({
            paintIds:paintIds,
        })
    })
}