const setCookie = (res, name, value) => {
  const oneDayMilliseconds = 24 * 60 * 60 * 1000;

  console.log("Setting cookie", name, value);

  res.cookie(name, value, {
    maxAge: oneDayMilliseconds, // oneDayMilliseconds from now
    httpOnly: false,
    sameSite: "none",
    secure: true,
  });
};

module.exports = {
    setCookie,
};
