const logger = require("./logger");

const requestLogger = (request, _response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("--------------------------------");
  next();
};

const errorHandler = (error, _request, response, next) => {
  // having no idea what this handles
  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).json({ error: "mal-formatted id" });
  }

  // having no idea, too
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ message: "Invalid token" });
  }

  next(error);
};

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }

  next();
};

module.exports = { requestLogger, errorHandler, tokenExtractor };
