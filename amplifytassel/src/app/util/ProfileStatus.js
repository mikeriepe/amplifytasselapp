const profileStatus = {
  1: 'Pending', // pending admin response
  2: 'Requested', // admin requested more information
  3: 'Updated', // user inputted requested information
  4: 'Approved', // user is approved
  5: 'Admin', //user is an admin
  99: 'Denied', // user is denied
};

const profileStatusColor = {
  'PENDING': 'var(--text-gray)', // pending admin response - gray
  'REQUESTED': 'var(--primary-blue-main)', // admin requested more information - blue
  'UPDATED': 'var(--secondary-yellow-main)', // user inputted information - yellow
  'APPROVED': 'var(--toastify-color-success)', // user is approved - green
  'ADMIN': 'var(--secondary-yellow-dark)', // user is admin - gold
  'DENIED': 'var(--error-red-main)', // user is denied - red
};

/**
 * converts profile status integer into text
 * @param {*} status takes in an integer from the status column of profiles
 * @return {*} displayable string representing status
 */
export function profileStatusToText(status) {
  return profileStatus[status];
}

/**
 * converts profile status integer into text
 * @param {*} status takes in an integer from the status column of profiles
 * @return {*} color associated with status
 */
export function profileStatusToColor(status) {
  return profileStatusColor[status];
}
