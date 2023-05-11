
import { DataStore } from '@aws-amplify/datastore';
import {  Profile } from '../../models';
import useAuth from '../util/AuthContext';

export async function PointsAddition(points, profileid) {

    try{
    let res = await DataStore.query(Profile, profileid);
    await DataStore.save(Profile.copyOf(res, updated => {
        updated.points = updated.points + points;
      }));
    }
    catch (error) {
        console.error("Error updating points: ", error);
        return false;
    }
    return true;
  }
//         PointsAddition(10,userProfile.id);
// import { PointsAddition } from '../util/PointsAddition';
