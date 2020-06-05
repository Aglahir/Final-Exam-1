let codes = {
  MISSING_BODY: 406,
  DO_NOT_MATCH: 409,
  MISSING_FIRST_OR_LAST: 403,
  DB_NOT_EXISTS: 404,
};

function errorHandler(req, res, next) {
  if (res.errorMessage && res.errorStatus) {
    res.statusMessage = res.errorMessage;
    return res.status(codes[res.errorStatus]).end();
  } else {
    res.statusMessage = "Not found";
    return res.status(404).end();
  }
}

module.exports = errorHandler;
