import React, { useState } from 'react';
import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    header:{
        width:"100wh",
        display:"flex",
        backgroundColor:"#333333",
	borderBottom:"solid lightgrey 1px",
    },
    textarea:{
        width:"100vw",
        height:"auto",
        backgroundColor:"#333333",
        margin:"10px auto",
        fontSize:"1.6em",
        color:"rgba(255,255,255,0.75)",
        outline:"none",
        border:"0",
        resize:"none",
        textAlign:"center",
    },
});

function HeaderDescriptionCategory({categoryDescription, categoryName}) {

    const [inputValue, setInputValue] = useState(categoryDescription);

    const classes = useStyles();

    useEffect(()=>{
        setInputValue(categoryDescription);
    },[categoryDescription])

    useEffect(()=>{
 	const tx = document.querySelector('textarea');
        tx.style.height = 'fit-content';
        tx.style.height = (tx.scrollHeight) + "px";
    },[inputValue])
   	

    function handleChange() {
        const description = document.querySelector("textarea").value
        setInputValue(description);
        putDescriptionCategory(description);
    }

    function putDescriptionCategory(description) {
        fetch('http://localhost:3001/api/categories/updateCategoryDescription',{
            method:'PUT',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                description:description,
                nomCategorie:categoryName,
            })
        })
    }

    return (  
        <header className={classes.header}>
            <textarea rows="1" value={inputValue} onChange={handleChange} className={classes.textarea}/>
        </header>
    );
}

export default HeaderDescriptionCategory;