export const notifyType = (statusCode) => {
  if (statusCode === 404) {
    return "info";
  } 
  if (statusCode === 400 || statusCode === 409 || statusCode === 401 || statusCode === 403) {
    return "warning";
  }
  if (statusCode === 500) {
    return "error";
  }
  return "success";
};
