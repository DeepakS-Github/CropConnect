const formatDate = (dateString) => {
  // Create a new Date object with the provided date string
  const dateObject = new Date(dateString);

  // Extract the date components
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Month is zero-based, so we add 1
  const day = dateObject.getDate();

  // Construct the formatted date string
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  return formattedDate;
};

module.exports = { formatDate };
