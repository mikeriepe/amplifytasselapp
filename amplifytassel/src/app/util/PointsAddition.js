import { DataStore } from '@aws-amplify/datastore';
import {  Profile } from '../../models';

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
