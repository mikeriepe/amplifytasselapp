const opportunityStatus = {
  null: 'Pending', // pending admin response
  true: 'Approved', // opp is approved
  false: 'Denied', // opp is denied
};

const opportunityStatusColor = {
  null: 'var(--text-gray)', // pending admin response - gray
  true: 'var(--toastify-color-success)', // user is approved - green
  false: 'var(--error-red-main)', // user is denied - red
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
