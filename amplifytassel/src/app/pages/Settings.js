import * as React from 'react';
import useAuth from '../util/AuthContext';

import { DataStore } from '@aws-amplify/datastore';
import { Keyword, KeywordProfile, Profile } from '../../models';

/**
 * creates settings page
 * @return {HTML} settings page
 */
export default function Settings() {
  const {user, userProfile, setUserProfile} = useAuth();
  
  const testQuery = () => {
    let profileIds = ['2cda8741-543a-4614-83cc-c28fae98adf2', '03bc5db5-46b3-4100-942b-e9ddb89ec1cc'];
    DataStore.query(KeywordProfile, k => k)
      .then((kpRelationship) => {
        console.log('kpRelationship', kpRelationship);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='Settings'>
      <h1>Settings</h1>
      <button onClick={testQuery}>test</button>
    </div>
  );
}
