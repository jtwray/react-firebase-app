import React, {useEffect, useState} from "react";

const Alert = ({show, style, message}) => {

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
                <button type="button" className="close" aria-label="Close" onClick={(e) => {
                  setVisibility(false);
                }}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
        ):(<></>)}
        </>
    );
    

}

export default Alert;