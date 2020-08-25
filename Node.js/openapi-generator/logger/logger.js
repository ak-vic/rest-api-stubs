const { transports, createLogger, format } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  //defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error', timestamp: true }),
    new transports.File({ filename: 'combined.log', timestamp: true }),
  ],
});

function logRequest(req, res, msg = "", level = "info") {
  const xRequestId = res.getHeader("x-request-id");
  const xCorrelationId = res.getHeader("x-correlation-id");
  const logMessage = { 
    requestId: xRequestId, 
    correlationId: xCorrelationId,
    method: req.method, 
    url: req.url,
    requestHeaders: req.headers,
    responseHeaders: res.getHeaders()
  };
  if(msg){
    if (level === "error") {
      logMessage.error = msg;
    }
    else{
      logMessage.message = msg;
    }
  }
  logger.log(level, logMessage);
}

/*if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({ format: format.simple() }));
}*/

module.exports.logger = logger;
module.exports.logRequest = logRequest;