const jwt = require("jsonwebtoken");

module.exports.resData = {
  success: (data) =>
    data
      ? {
          data,
          success: true,
        }
      : { success: true },
  error: (message) => ({
    message,
    success: false,
  }),
};

module.exports.getUserIdFromToken = (token) => {
  try {
    var decoded = jwt.verify(token, "secret-token-key");
  } catch (err) {
    return -1;
  }

  return decoded._id;
};
