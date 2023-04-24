const opportunityStatus = {
  'PENDING': 'Pending', // pending admin response
  'APPROVED': 'Approved', // opp is approved
  'DENIED': 'Denied', // opp is denied
};

const opportunityStatusColor = {
  'PENDING': 'var(--text-gray)', // pending admin response - gray
  'APPROVED': 'var(--toastify-color-success)', // user is approved - green
  'DENIED': 'var(--error-red-main)', // user is denied - red
};

/**
 * converts opportunity status integer into text
 * @param {*} status takes in an integer from the status column of opportunitys
 * @return {*} displayable string representing status
 */
export function opportunityStatusToText(status) {
  return opportunityStatus[status];
}

/**
 * converts opportunity status integer into text
 * @param {*} status takes in an integer from the status column of opportunitys
 * @return {*} color associated with status
 */
export function opportunityStatusToColor(status) {
  return opportunityStatusColor[status];
}
