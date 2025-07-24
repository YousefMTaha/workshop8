function errResponse({ error, res } = {}) {
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ errMsg: "email already exist", error });
  }

  if (error.name === "SequelizeValidationError") {
    return res
      .status(400)
      .json({ errMsg: error.message, error, stack: error.stack });
  }

  return res
    .status(500)
    .json({ errorMsg: error.message, error, errorStack: error.stack });
}

export default errResponse;
