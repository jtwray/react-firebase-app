import React, {useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../auth/FirebaseAuthContext";
import { Firestore } from '../../../auth/FirebaseAuth';

const UserActivities = () => {

  var title = 'Your Activities';

  document.title = title;
  
  const pageSize = 20;

  
  const {authUser} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [qs, setQs] = useState(null);
  const [total, setTotal] = useState(0);
  const [showCount, setShowCount] = useState(0);

  useEffect(() => {
    if(showCount === 0){
      var records = [];
      var userDocRef = Firestore.collection('users').doc(authUser.user.uid);
      userDocRef.get().then(function(userDoc){
        if(userDoc.exists){
          setTotal(userDoc.data().activityCount);
        }
      });
      userDocRef.collection('activities').orderBy('timestamp', 'desc').limit(pageSize)
      .get().then(function(documentSnapshots){
          documentSnapshots.forEach(function(doc) {
              records.push({
                  'timestamp': doc.id,
                  'action': doc.data().action
              })
          });
          setShowCount(documentSnapshots.size+showCount);
          setQs(documentSnapshots);
          setData(records);
      });
    }
  }, [authUser.user.uid, showCount]);
  
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">{title}</h1>
      </div>
      <div className="row">
        <div className="col mb-4">
            {total>0?(
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
                        <div className="row" style={{marginLeft:'0',marginRight:'0',marginTop:'10px',paddingLeft:'0',paddingRight:'0'}}>
                          <div className="col-5">
                            {showCount} of {total}
                          </div>
                          <div className="col-7 text-right">
                            <button className={"btn btn-primary "+((total===showCount)?'disabled':'')} onClick={(e) => {
                              e.preventDefault();
                              if(total > showCount){
                                var records = [];
                                var userDocRef = Firestore.collection('users').doc(authUser.user.uid);
                                var lastDoc = qs.docs[qs.docs.length-1];
                                userDocRef.collection('activities').orderBy('timestamp', 'desc').startAfter(lastDoc).limit(pageSize).get().then(function(documentSnapshots){
                                  documentSnapshots.forEach(function(doc) {
                                    records.push({
                                        'timestamp': doc.id,
                                        'action': doc.data().action
                                    })
                                  });
                                  var existingRecords = data;
                                  existingRecords.push.apply(existingRecords, records);
                                  setData(existingRecords);
                                  setQs(documentSnapshots);
                                  setShowCount(documentSnapshots.size+showCount);
                                });
                              }
                            }}>More activities...</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                
                </div>
            ):(
                <>
                {
                  (qs===null)?(
                    <div><i className="fa fa-spinner fa-spin"></i> Loading...</div>
                  ):(
                    <div>No activity is found</div>
                  )
                }
                </>
            )}          
        </div>
      </div>
    </div>
  );
};

export default UserActivities;