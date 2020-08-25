import { transports, createLogger, format } from 'winston';
import { Request, Response } from 'express';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  //defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

export function logRequest(req: Request, res: Response, msg: string = "", level: string = "info") {
  const xRequestId = res.getHeader("x-request-id") as string;
  const xCorrelationId = res.getHeader("x-correlation-id") as string;
  const logMessage: any = { 
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

