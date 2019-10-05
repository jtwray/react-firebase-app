import React from "react";

const Alert = ({show, style, message, hideAlert}) => {

    return (
        <>
        {(show)?(
            <div className="col">
              <div className={"alert shadow alert-"+style} role="alert">
                {message}
                <button type="button" className="close" aria-label="Close" onClick={hideAlert}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
        ):(<></>)}
        </>
    );
    

}

export default Alert;