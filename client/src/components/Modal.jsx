import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    modal:{
        position:'fixed',
        top:'0',
        left:'0',
        width:'100%',
        height:'100vh',
        background:'transparent', 
        backdropFilter:'blur(10px)',
    },
    containerModal:{
        width:"fit-content",
        border:"solid rgb(137, 151, 155) 4px",
        background:"whitesmoke",
        color:'rgb(61, 79, 88)',
        fontSize:"22px",
        margin:'auto',
        padding:"10px",
        transform:"translateY(50vh) translateY(-100%)",
    },
    containerButton:{
        display:'flex',
        justifyContent:'space-between',
    },
 
})

function Modal(props) {
    const classes = useStyles();
    return ( <dialog className={classes.modal} id={props.id}>
                <div className={classes.containerModal}>
                    {props.header}
                    <div className={classes.containerButton}>
                        {props.buttonConfirm}
                        {props.buttonCancel}
                    </div>
                </div>
            </dialog>  );
}

export default Modal;