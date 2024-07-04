export async function requestForPaint(index, categoriesNames, setPaintArray) {
    let newPaintArray = [];
    const response = await fetch(`http://localhost:3001/api/paintings/getPaintingsIds?galerieName=${categoriesNames[index]}`);
    const ids = await response.json(); 
    if (Array.from(ids).length !== 0) {
      Array.from(ids).forEach(async (id)=>{
        const response = await fetch(`http://localhost:3001/api/paintings/getPaintData?idPaint=${id}`);
        const buffer = await response.json();
        const datapeinture = buffer[0];
        const file = new File([new Uint8Array(datapeinture.data)], "image");  
        const urlPaint = URL.createObjectURL(file); 
        newPaintArray = [...newPaintArray, [id, urlPaint]];
        // Crée un objet pour mapper les IDs à leurs positions
        const idIndexMap = {};
        ids.forEach((id, index) => {
          idIndexMap[id] = index;
        });
        console.log(idIndexMap);
        // Trie le deuxième tableau en utilisant le mapping des positions des IDs
        newPaintArray.sort((a, b) => {
          return idIndexMap[a[0]] - idIndexMap[b[0]];
        });
        setPaintArray(newPaintArray)
      })    
    }
    else{
      setPaintArray([]);
    }
}

export async function getCategoryDescription(categoriesNames, buttonRadioSelected, setCategoryDescription){
    const result = await fetch(`http://localhost:3001/api/categories/getCategoryDescription?categorie=${categoriesNames[buttonRadioSelected]}`);
    const description = await result.json();
    setCategoryDescription(description); 
  }

  export  async function renameCategorie(categoriesNames, buttonRadioSelected, setCategoriesNames, setInputValueChange, handleModalShowRename) {
    const input = document.querySelector('#inputChangeNameCategory');
    const newName = input.value.trim();
    const oldName = categoriesNames[buttonRadioSelected];
    if (newName !== "" && newName !== undefined && oldName!==undefined) {
      await fetch('http://localhost:3001/api/categories/changeCategoryName',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({
          newName:newName,
          oldName:oldName,
        })
      })
      
      let newCategoriesNames = [...categoriesNames];
      newCategoriesNames[buttonRadioSelected] = newName;
    
      setCategoriesNames(newCategoriesNames);
    }
    else if(oldName!==undefined){
      setInputValueChange(oldName);
    } 
    handleModalShowRename();
  }

  export function deleteCategorie(categoriesNames, buttonRadioSelected, setCategoriesNames, setButtonRadioSelected, handleModalShowDelete) {
    const categoryName = categoriesNames[buttonRadioSelected];
    fetch('http://localhost:3001/api/categories/deleteCategoryName',{
      method:'POST',
      headers:{"content-type":"application/json"},
      body:JSON.stringify({
        nomCategorie:categoryName,
      })
    })
    let newCategoriesNames = [...categoriesNames];
    newCategoriesNames.splice(categoriesNames.indexOf(categoryName),1) ;
    setCategoriesNames(newCategoriesNames);
    setButtonRadioSelected(undefined);
    handleModalShowDelete()
  }

  export function addCategorie(categoriesNames, setCategoriesNames) {
    const name = document.querySelector("#inputNameNewCategory").value.trim();
    if (name !== "" && name !== undefined) {
      fetch('http://localhost:3001/api/categories/addCategoryName',{
        method:'POST',
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
          name:name,
        })
      })
      
      let newCategoriesNames = [...categoriesNames,name];
      setCategoriesNames(newCategoriesNames);
      
    }
    document.querySelector("#modalAdd").close();
  }