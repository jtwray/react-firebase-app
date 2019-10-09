import React, {useContext, useState, useEffect, createRef} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../auth/FirebaseAuthContext";
import Alert from '../../../Alert';
import * as firebase from "firebase/app";

const UpdateUserPhone = () => {

  let recaptcha = createRef();

  const {authUser} = useContext(AuthContext);
  const [data, setData] = useState({
      'phoneNumber': authUser.user.phoneNumber||'',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [verifyStep, setVerifyStep] = useState(false);
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
            setRecaptchaVerified(true);
        },
        'expired-callback': function () {
            setRecaptchaVerified(false);
        }
     });
     window.recaptchaVerifier.render().then(function (widgetId) {
       window.recaptchaWidgetId = widgetId;
     });
     // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    {verifyStep?(
                        <div className="form-group row">
                            <label htmlFor="verification-code" className="col-sm-2 col-form-label">Verification Code</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="verification-code" aria-describedby="verification-code-help" placeholder="Verification Code" value={verificationCode} onChange={(e) => {
                                    setVerificationCode(e.target.value);
                                }} />
                                <small id="verification-code-help" className="form-text text-muted">Please find your verification code in the text message we sent to your phone.</small>
                            </div>
                        </div>    
                    ):(
                        <div className="form-group row">
                            <label htmlFor="phone-number" className="col-sm-2 col-form-label">Phone</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="phone-number" aria-describedby="phone-number-help" placeholder="Your phone number" value={data.phoneNumber} onChange={(e) => {
                                    setData({
                                        'phoneNumber': e.target.value,
                                    })
                                }} />
                                <small id="phone-number-help" className="form-text text-muted">Please put in your phone number including country code (e.g. +16505550101).</small>
                            </div>
                        </div>
                    )}
                    {!verifyStep?(
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <div ref={(ref)=>recaptcha=ref}></div>
                            </div>
                        </div>
                    ):(<></>)}
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" disabled={(processing||(!recaptchaVerified))?true:false} onClick={(e) => {
                            e.preventDefault();
                            setProcessing(true);
                            setRecaptchaVerified(false);
                            var provider = new firebase.auth.PhoneAuthProvider();
                            provider.verifyPhoneNumber(
                                document.getElementById('phone-number').value,
                                window.recaptchaVerifier
                            ).then(function(){
                                setProcessing(false);
                                /*
                                setAlert({
                                    'show':true, 
                                    'style':'success',
                                    'message':'Your phone number has been updated. Please click "Back" button to go back to your profile page.',
                                    'count':alert.count+1
                                });
                                */
                                setVerifyStep(true);
                            }).catch(function(error){
                                setProcessing(false);
                                setAlert({
                                    'show':true, 
                                    'style':'danger',
                                    'message':error.message,
                                    'count':alert.count+1
                                });
                            })
                            
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