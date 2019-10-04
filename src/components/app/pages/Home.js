import React, {useContext} from "react";
import { AuthContext } from "../../auth/FirebaseAuthContext";

const Home = () => {
  const {authUser} = useContext(AuthContext);
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Profile</h1>
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
            <a href="/user/update-profile" className="list-group-item list-group-item-action" v-link="true">
                <div className="row">
                    <div className="col-3 text-muted text-left small"><strong>NAME</strong></div>
                    <div className="col-7 text-left small">
                      {authUser.user.displayName}
                    </div>
                    <div className="col-2 text-right"><i className="fa fa-angle-right"></i></div>
                </div>
            </a>
            <a href="/user/update-email" className="list-group-item list-group-item-action" v-link="true">
                <div className="row">
                    <div className="col-3 text-muted text-left small"><strong>EMAIL</strong></div>
                    <div className="col-7 text-left small">
                      {authUser.user.email}
                    </div>
                    <div className="col-2 text-right"><i className="fa fa-angle-right"></i></div>
                </div>
            </a>
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
            <a href="/user/update-profile" className="list-group-item list-group-item-action" v-link="true">
                <div className="row">
                    <div className="col-3 text-muted text-left small"><strong>PHONE</strong></div>
                    <div className="col-7 text-left small">
                    {authUser.user.phoneNumber}
                    </div>
                    <div className="col-2 text-right"><i className="fa fa-angle-right"></i></div>
                </div>
            </a>
            <a href="/" id="your-profile-reset-password" className="list-group-item list-group-item-action">
                <div className="row">
                    <div className="col-3 text-muted text-left small"><strong>PASSWORD</strong></div>
                    <div className="col-7 text-left small">
                    ••••••••
                    </div>
                    <div className="col-2 text-right"><i className="fa fa-angle-right"></i></div>
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

export default Home;