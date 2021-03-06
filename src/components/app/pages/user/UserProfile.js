import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../auth/FirebaseAuthContext";
import { FirebaseAuth, addLog } from '../../../auth/FirebaseAuth';
import Alert from '../../../Alert';
import UserAvatar from '../../UserAvatar';

const UserProfile = () => {

  const {authUser} = useContext(AuthContext);
  const [passwordResetActive, setPasswordResetActive] = useState(false);
  const [sendVerficationActive, setSendVerificationActive] = useState(false);
  const [alert, setAlert] = useState({
    'show': false,
    'style':'',
    'message':'',
    'count': 0
  });

  var title = 'Your Profile';

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
          <div className="list-group shadow">
            <a href="/" className="list-group-item list-group-item-action disabled">
                <div className="row">
                    <div className="col-3 text-muted text-left small"><strong>PHOTO</strong></div>
                    <div className="col-6 text-muted text-left small">
                        Update via social login
                    </div>
                    <div className="col-3 text-muted text-right">
                      <UserAvatar name={authUser.user.displayName} photoUrl={authUser.user.photoURL} className="img-thumbnail rounded-circle" size="64" />
                    </div>
                </div>
            </a>
            <Link to="/user/profile/update-name" className="list-group-item list-group-item-action" v-link="true">
                <div className="row">
                    <div className="col-3 text-muted text-left small"><strong>NAME</strong></div>
                    <div className="col-7 text-left small">
                      {authUser.user.displayName}
                    </div>
                    <div className="col-2 text-right"><i className="fa fa-angle-right"></i></div>
                </div>
            </Link>
            <Link to="/user/profile/update-email" className="list-group-item list-group-item-action" v-link="true">
                <div className="row">
                    <div className="col-3 text-muted text-left small"><strong>EMAIL</strong></div>
                    <div className="col-7 text-left small">
                      {authUser.user.email}
                    </div>
                    <div className="col-2 text-right"><i className="fa fa-angle-right"></i></div>
                </div>
            </Link>
            <a href="/" className={"list-group-item list-group-item-action "+(authUser.user.emailVerified||sendVerficationActive?'disabled':'')} onClick={(e) => {
              e.preventDefault();
              setSendVerificationActive(true);
              authUser.user.sendEmailVerification().then(function(){
                addLog('requested verification email');
                setSendVerificationActive(false);
                setAlert({
                  'show':true, 
                  'style':'success',
                  'message':'Please check your email for the verification link.',
                  'count':alert.count+1
                });
              }).catch(function(error){
                setSendVerificationActive(false);
                setAlert({
                  'show':true, 
                  'style':'danger',
                  'message':error.message,
                  'count':alert.count+1
                });
              });
            }}>
                <div className="row">
                    <div className="col-3 text-muted text-left small"><strong>STATUS</strong></div>
                    <div className="col-7 text-left small">
                      {
                        authUser.user.emailVerified?'Email verified':'Unverified email'
                      }
                    </div>
                    <div className="col-2 text-right"><i className={"fa "+(sendVerficationActive?'fa-spinner fa-spin':'fa-angle-right')}></i></div>
                </div>
            </a>
            <Link to="/user/profile/update-phone" className="list-group-item list-group-item-action" v-link="true">
                <div className="row">
                    <div className="col-3 text-muted text-left small"><strong>PHONE</strong></div>
                    <div className="col-7 text-left small">
                    {authUser.user.phoneNumber}
                    </div>
                    <div className="col-2 text-right"><i className="fa fa-angle-right"></i></div>
                </div>
            </Link>
            <a href="/" id="your-profile-reset-password" className={"list-group-item list-group-item-action "+(passwordResetActive?'disabled':'')} onClick={(e) => {
              e.preventDefault();
              setPasswordResetActive(true);
              FirebaseAuth.auth().sendPasswordResetEmail(authUser.user.email).then(function(){
                addLog('requested password reset email');
                setPasswordResetActive(false);
                setAlert({
                  'show':true, 
                  'style':'success',
                  'message':'Please check your email for the password reset link.',
                  'count':alert.count+1
                });
              }).catch(function(error){
                setPasswordResetActive(false);
                setAlert({
                  'show':true, 
                  'style':'danger',
                  'message':error.message,
                  'count':alert.count+1
                });
              });
            }}>
                <div className="row">
                    <div className="col-3 text-muted text-left small"><strong>PASSWORD</strong></div>
                    <div className="col-7 text-left small">
                    ••••••••
                    </div>
                    <div className="col-2 text-right"><i className={"fa "+(passwordResetActive?'fa-spinner fa-spin':'fa-angle-right')}></i></div>
                </div>
            </a>
            <Link to="/user/profile/delete-account" className="list-group-item list-group-item-action" v-link="true">
                <div className="row">
                    <div className="col-10 text-danger text-left small"><strong>DELETE ACCOUNT</strong></div>
                    <div className="col-2 text-right"><i className="fa fa-angle-right"></i></div>
                </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;