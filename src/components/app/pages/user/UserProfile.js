import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../auth/FirebaseAuthContext";
import FirebaseAuth from '../../../auth/FirebaseAuth';
import Alert from '../../../Alert';

const UserProfile = () => {

  const {authUser} = useContext(AuthContext);
  const [passwordResetActive, setPasswordResetActive] = useState(false);
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
                        Update via social login or Gravatar
                    </div>
                    <div className="col-3 text-muted text-right">
                        <img src={authUser.user.photoURL} alt="Avatar" className="img-thumbnail rounded-circle" width="64" height="64" />
                    </div>
                </div>
            </a>
            <Link to="/user/update-name" className="list-group-item list-group-item-action" v-link="true">
                <div className="row">
                    <div className="col-3 text-muted text-left small"><strong>NAME</strong></div>
                    <div className="col-7 text-left small">
                      {authUser.user.displayName}
                    </div>
                    <div className="col-2 text-right"><i className="fa fa-angle-right"></i></div>
                </div>
            </Link>
            <Link to="/user/update-email" className="list-group-item list-group-item-action" v-link="true">
                <div className="row">
                    <div className="col-3 text-muted text-left small"><strong>EMAIL</strong></div>
                    <div className="col-7 text-left small">
                      {authUser.user.email}
                    </div>
                    <div className="col-2 text-right"><i className="fa fa-angle-right"></i></div>
                </div>
            </Link>
            <a href="/" className={"list-group-item list-group-item-action "+(authUser.user.emailVerified?'disabled':'')}>
                <div className="row">
                    <div className="col-3 text-muted text-left small"><strong>STATUS</strong></div>
                    <div className="col-7 text-left small">
                      {
                        authUser.user.emailVerified?'Email verified':'Unverified email'
                      }
                    </div>
                    <div className="col-2 text-right"><i className="fa fa-angle-right"></i></div>
                </div>
            </a>
            <Link to="/user/update-phone" className="list-group-item list-group-item-action" v-link="true">
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
            <a href="/user/delete-account" className="list-group-item list-group-item-action" v-link="true">
                <div className="row">
                    <div className="col-10 text-danger text-left small"><strong>DELETE ACCOUNT</strong></div>
                    <div className="col-2 text-right"><i className="fa fa-angle-right"></i></div>
                </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;