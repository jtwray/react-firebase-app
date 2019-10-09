import React, {useContext, useState, useEffect, createRef} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../auth/FirebaseAuthContext";
import FirebaseAuth from '../../../auth/FirebaseAuth';
import Alert from '../../../Alert';
import * as firebase from "firebase/app";

const UpdateUserPhone = () => {

  let recaptcha = React.createRef();

  const {authUser} = useContext(AuthContext);
  const [data, setData] = useState({
      'phoneNumber': authUser.user.phoneNumber||''
  });
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState({
    'show': false,
    'style':'',
    'message':'',
    'count': 0
  });

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptcha, {
        'size': 'normal',
        'callback': function (response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        'expired-callback': function () {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
     });
     window.recaptchaVerifier.render().then(function (widgetId) {
       window.recaptchaWidgetId = widgetId;
     });
  },[]);
  
  var title = 'Change Your Phone';

  document.title = title;

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">{title}</h1>
      </div>
      <div className="row">      
        <Alert show={alert.show} style={alert.style} message={alert.message} count={alert.count} />
      </div>  
      <div className="row">
        <div className="col mb-4">
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="form-group row">
                        <label htmlFor="phone-number" className="col-sm-2 col-form-label">Phone</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="phone-number" aria-describedby="phone-number-help" placeholder="Your phone number" value={data.phoneNumber} onChange={(e) => {
                                setData({
                                    'phoneNumber': e.target.value,
                                })
                            }} />
                            <small id="phone-number-help" className="form-text text-muted">Please put in your phone number.</small>
                        </div>
                    </div>
                    <div className="form-group row" ref={(ref)=>recaptcha=ref}>

                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" disabled={processing?true:false} onClick={(e) => {
                            e.preventDefault();
                            setProcessing(true);
                            /*
                            FirebaseAuth.auth().currentUser.reauthenticateWithPhoneNumber(
                                document.getElementById('phone-number').value,
                                firebase.auth.RecaptchaVerifier
                            ).then(function(){
                                setProcessing(false);
                                setAlert({
                                    'show':true, 
                                    'style':'success',
                                    'message':'Your phone number has been updated. Please click "Back" button to go back to your profile page.',
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
                            */
                        }}>
                        {processing?(
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
    </div>
  );
};

export default UpdateUserPhone;