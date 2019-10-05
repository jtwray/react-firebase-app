import React, {useEffect, useState} from "react";

const Alert = ({show, style, message, hideAlert}) => {

    const [visibility, setVisibility] = useState(show);

    useEffect(() => {
        setVisibility(show);
    },[show]);

    return (
        <>
        {(visibility)?(
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