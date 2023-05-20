import { DataStore } from '@aws-amplify/datastore';
import {  Profile } from '../../models';
import useAuth from './AuthContext';


/**
 * Updates the user's profile by adding points and updates the user's profile in the state
 * 
 * @param {int} points - The number of points to be added to the user's profile
 * @param {string} profileid - The ID of the user's profile to be updated
 * @param {function} setUserProfile - The function to update the user's profile in the state
 * @return {boolean} - True if the profile was successfully updated; false otherwise
 */

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


/**
 * Calculates the percentage filled in the XP bar based on user's current points.
 * 
 * @param {int} profilePoints - The current points on the user's profile
 * @return {float} - The percentage filled in the XP bar (ranges between 0 to 100)
 */
export function calculateXpBarPercentage(profilePoints) {
  let level = calculateUserLevel(profilePoints);
  let lowerBound = level == 1 ? 0 : levelToPointsMap[level - 1];
  let upperBound = levelToPointsMap[level] ? levelToPointsMap[level] : Infinity;

  // If the upper bound is infinity, then the user is level 10 and the XP bar should be fully filled
  if (upperBound == Infinity) {
    return 100;
  } else {
    let pointsIntoLevel = profilePoints - lowerBound;
    let totalPointsThisLevel = upperBound - lowerBound;
    return (pointsIntoLevel / totalPointsThisLevel) * 100;
  }
}

/**
 * Calculates how many more points are needed for the user to reach the next level.
 * 
 * @param {int} profilePoints - The current points on the user's profile
 * @return {int} - The points needed until the user reaches the next level
 */
export function calculatePointsToNextLevel(profilePoints) {
  let level = calculateUserLevel(profilePoints);
  let upperBound = levelToPointsMap[level] ? levelToPointsMap[level] : Infinity;

  // If the upper bound is infinity, then the user is level 10 and no more points are needed for the next level
  if (upperBound == Infinity) {
    return 0;
  } else {
    return upperBound - profilePoints;
  }
}