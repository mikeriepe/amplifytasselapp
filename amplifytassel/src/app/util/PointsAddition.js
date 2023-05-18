import { DataStore } from '@aws-amplify/datastore';
import {  Profile } from '../../models';
import useAuth from './AuthContext';

export async function PointsAddition(points, profileid, setUserProfile) {
  try{
    let res = await DataStore.query(Profile, profileid);
    const updatedProfile = await DataStore.save(Profile.copyOf(res, updated => {
        updated.points = updated.points + points;
      }));
    setUserProfile(updatedProfile);
  }
  catch (error) {
    console.error("Error updating points: ", error);
    return false;
  }
  return true;
}

/*
* The level map will work in the following way:
* When a user has < 100 points, they will be level 1,
* When a user has >= 100 points, but < 300 they will be level 2,
* When a user has >= 300 points and < 600, they will be level 3,
* ect.
* After a user reaches 4500 points, they will stay at level 10.
*
* So the way to read this is:
* "user is lvl x until they get levelToPointsMap[x] points, then they cross to the next lvl"
*/
const levelToPointsMap = {
  1: 100,
  2: 300,
  3: 600,
  4: 1000,
  5: 1500,
  6: 2100,
  7: 2800,
  8: 3600,
  9: 4500,
  // 10: 4500+
};


/**
 * Calulates what level a user is
 * 
 * @param {int} profilePoints - points on a user profile
 * @return {int} level of user
 */
export function calculateUserLevel(profilePoints) {
  if (profilePoints < levelToPointsMap[1]) {
    return 1;
  } else if (levelToPointsMap[1] <= profilePoints && profilePoints < levelToPointsMap[2]) {
    return 2;
  } else if (levelToPointsMap[2] <= profilePoints && profilePoints < levelToPointsMap[3]) {
    return 3;
  } else if (levelToPointsMap[3] <= profilePoints && profilePoints < levelToPointsMap[4]) {
    return 4;
  } else if (levelToPointsMap[4] <= profilePoints && profilePoints < levelToPointsMap[5]) {
    return 5;
  } else if (levelToPointsMap[5] <= profilePoints && profilePoints < levelToPointsMap[6]) {
    return 6;
  } else if (levelToPointsMap[6] <= profilePoints && profilePoints < levelToPointsMap[7]) {
    return 7;
  } else if (levelToPointsMap[7] <= profilePoints && profilePoints < levelToPointsMap[8]) {
    return 8;
  } else if (levelToPointsMap[8] <= profilePoints && profilePoints < levelToPointsMap[9]) {
    return 9;
  } else if (profilePoints >= levelToPointsMap[9]) {
    return 10;
  }
}

/**
 * Calulates whether or not action caused user to level up
 * 
 * @param {int} oldPoints - points on a user profile before action
 * @param {int} pointsToAdd - points that will be received by user for completing action
 * @return {boolean} whether user crossed theshold to new level
 */
export function calculateIfUserLeveledUp(oldPoints, pointsToAdd) {
  const newPoints = oldPoints + pointsToAdd;
  if (calculateUserLevel(newPoints) > calculateUserLevel(oldPoints)) {
    return true;
  } else {
    return false;
  }
}