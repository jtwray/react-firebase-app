import React, {useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../auth/FirebaseAuthContext";
import { Firestore } from '../../../auth/FirebaseAuth';

const UserActivities = () => {

  var title = 'Your Activities';

  document.title = title;

  const {authUser} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [qs, setQs] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    var records = [];
    var userData = Firestore.collection('users').doc(authUser.user.uid).get().then(function(doc){
      if(doc.exists){
        setTotal(doc.data().activities);
      }
    });
    var logs = Firestore.collection('users').doc(authUser.user.uid).collection('activities');
    var first = logs.orderBy('timestamp', 'desc').limit(4);
    var firstRecords = first.get().then(function(documentSnapshots){
        documentSnapshots.forEach(function(doc) {
            records.push({
                'timestamp': doc.id,
                'action': doc.data().action
            })
        });
        setQs(documentSnapshots);
        setData(records);
    })
  }, []);
  
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">{title}</h1>
      </div>
      <div className="row">
        <div className="col mb-4">
            {data.length>0?(
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Activity Log Records</h6>
                  </div>
                  <div className="card-body">
                    <div>
                      <div>
                        <div className="row" style={{margin:'0',padding:'0'}}>
                          <div className="col-sm-12 table-responsive">
                            <table className="table table-bordered table-vcenter">
                              <thead>
                                <tr role="row">
                                  <th>Time</th>
                                  <th>Activity</th>
                                </tr>
                              </thead>
                              <tbody className="small">
                              {data.map(r => 
                                <tr key={r.timestamp} role="row">
                                  <td style={{whiteSpace:'nowrap'}}>{''+(new Date(parseInt(r.timestamp)))}</td>
                                  <td style={{whiteSpace:'nowrap'}}>{r.action}</td>
                                </tr>
                              )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="row" style={{margin:'0',padding:'0'}}>
                          <div className="col-sm-12 col-md-5">
                            Total: {total}
                          </div>
                          <div className="col-sm-12 col-md-7"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                
                </div>
            ):(
                <></>
            )}          
        </div>
      </div>
    </div>
  );
};

export default UserActivities;