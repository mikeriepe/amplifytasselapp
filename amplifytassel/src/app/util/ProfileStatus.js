const profileStatus = {
    1: 'Pending', // pending admin response
    2: 'Requested', // admin requested more information
    3: 'Updated', // user inputted requested information
    4: 'Approved', // user is approved
    99: 'Denied', // user is denied
  };
  
  const profileStatusColor = {
    1: 'var(--text-gray)', // pending admin response - gray
    2: 'var(--primary-blue-main)', // admin requested more information - blue
    3: 'var(--secondary-yellow-light)', // user inputted information - yellow
    4: 'var(--toastify-color-success)', // user is approved - green
    99: 'var(--error-red-main)', // user is denied - red
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