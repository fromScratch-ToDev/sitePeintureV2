import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    button:{        
        display:'inline-block',
        outline:'0',
        appearance:'none',
        padding:'0px 12px',
        margin:'0px 24px',
        borderRadius: '4px',
        textDecoration: 'none',
        cursor: 'pointer',
        backgroundColor: 'rgb(249, 251, 250)',
        border: '1px solid rgb(137, 151, 155)',
        boxShadow: 'rgb(6 22 33 / 30%) 0px 1px 2px',
        color: 'rgb(61, 79, 88)',
        fontSize: '18px',
        fontWeight: '400',
        height: '36px',
        transition: "all 150ms ease-in-out 0s",
        '&:hover':{
            color: 'rgb(61, 79, 88)',
            backgroundColor: 'rgb(255, 255, 255)',
            border: '1px solid rgb(93, 108, 116)',
            boxShadow: 'rgb(0 0 0 / 30%) 0px 4px 4px, rgb(231 238 236) 0px 0px 0px 3px',
        }
    },
});

function ButtonModal({text, f}) {
    const classes = useStyles();
    return ( <button className={`${classes.button}`} onClick={f} >{text}</button> );
}

export default ButtonModal;