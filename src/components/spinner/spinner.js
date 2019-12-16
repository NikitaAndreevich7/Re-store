import React from 'react';
import './spinner.css'
const Spinner = () =>{

    return(
        <React.Fragment>
            <div className="lds-ripple"><div></div><div></div></div>
        </React.Fragment>
    )
}

export  default Spinner;