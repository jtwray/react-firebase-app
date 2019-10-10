import React, {useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../auth/FirebaseAuthContext";
import { Firestore } from '../../../auth/FirebaseAuth';

const UserActivities = () => {

  var title = 'Your Activities';

  document.title = title;

  const {authUser} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [qs, setQs] = useState(null);

  useEffect(() => {
    var records = [];
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
                <>
                    <span>records</span>
                {data.map(r => <li key={r.timestamp}>{r.action}</li>)}
                </>
            ):(
                <></>
            )}          
        </div>
      </div>
    </div>
  );
};

export default UserActivities;