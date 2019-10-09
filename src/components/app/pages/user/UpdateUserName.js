import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../auth/FirebaseAuthContext";
import FirebaseAuth from '../../../auth/FirebaseAuth';
import Alert from '../../../Alert';

const UpdateUserName = () => {

  const {authUser} = useContext(AuthContext);
  const [data, setData] = useState({
      'displayName': authUser.user.displayName
  });
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState({
    'show': false,
    'style':'',
    'message':'',
    'count': 0
  });
  
  var title = 'Change Your Name';

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
            <div class="card shadow mb-4">
                <div className="card-body">
                    <div className="form-group row">
                        <label for="display-name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="display-name" aria-describedby="display-name-help" placeholder="Your full name" value={data.displayName} onChange={(e) => {
                                setData({
                                    'displayName': e.target.value
                                })
                            }} />
                            <small id="display-name-help" className="form-text text-muted">Please put in your full name.</small>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" disabled={processing?true:false} onClick={(e) => {
                            e.preventDefault();
                            setProcessing(true);
                            FirebaseAuth.auth().currentUser.updateProfile({
                                displayName: document.getElementById('display-name').value
                            }).then(function(){
                                setProcessing(false);
                                setAlert({
                                    'show':true, 
                                    'style':'success',
                                    'message':'Your name has been updated. Please click "Back" button to go back to your profile page.',
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
    </div>
  );
};

export default UpdateUserName;