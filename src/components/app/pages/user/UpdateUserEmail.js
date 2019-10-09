import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../auth/FirebaseAuthContext";
import Alert from '../../../Alert';

const UpdateUserEmail = () => {
    
  const {authUser} = useContext(AuthContext);
  const [data, setData] = useState({
      'emailAddress': authUser.user.email||''
  });
  const [formVisibility, setFormVisibility] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState({
    'show': false,
    'style':'',
    'message':'',
    'count': 0
  });
  
  var title = 'Change Your Email';

  document.title = title;

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">{title}</h1>
      </div>
      <div className="row">      
        <Alert show={alert.show} style={alert.style} message={alert.message} count={alert.count} />
      </div>
      {formVisibility?(
      <div className="row">
        <div className="col mb-4">
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="form-group row">
                        <label htmlFor="email-address" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="email-address" aria-describedby="email-address-help" placeholder="Your email address" value={data.emailAddress} onChange={(e) => {
                                setData({
                                    'emailAddress': e.target.value
                                })
                            }} />
                            <small id="email-address-help" className="form-text text-muted">Please put in your new email address.</small>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" disabled={processing?true:false} onClick={(e) => {
                            e.preventDefault();
                            setProcessing(true);
                            authUser.user.updateEmail(data.emailAddress).then(function(){
                                setProcessing(false);
                                setFormVisibility(false);
                                setAlert({
                                    'show':true, 
                                    'style':'success',
                                    'message':'Your email address has been updated. Please click "Back" button to go back to your profile page.',
                                    'count':alert.count+1
                                });
                            }).catch(function(error){
                                setProcessing(false);
                                setAlert({
                                    'show':true, 
                                    'style':'danger',
                                    'message':error.message,
                                    'count':alert.count+1
                                });
                            })
                        }}>{processing?(
                            <i className="fa fa-spinner fa-spin"></i>
                        ):(
                            <></>
                        )} Submit</button>
                        &nbsp;
                        <Link className="btn btn-secondary" to="/user/profile">Back</Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
      ):(<Link className="btn btn-secondary" to="/user/profile">Back</Link>)}
    </div>
  );
};

export default UpdateUserEmail;