import * as React from 'react';
import useAuth from '../util/AuthContext';
import ThemedDropdown2 from '../components/ThemedDropdown2';

import { DataStore } from '@aws-amplify/datastore';
import { Keyword, KeywordProfile, Profile } from '../../models';

/**
 * creates settings page
 * @return {HTML} settings page
 */
export default function Settings() {
  const {user, userProfile, setUserProfile} = useAuth();
  
  const testQuery = () => {
    DataStore.query(KeywordProfile, k => k.profileId.eq(userProfile.id))
      .then((kpRelationship) => {
        console.log('kpRelationship', kpRelationship);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='Settings'>
      <ThemedDropdown2
        menuItems={['One', 'Two', 'Three']}
        initName={'hi'}
      />
      <h1>Settings</h1>
      <button onClick={testQuery}>test</button>
    </div>
  );
}
