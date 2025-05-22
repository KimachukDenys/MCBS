import { Request, Response, NextFunction } from 'express';
const Sentry = require("@sentry/node");

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err.stack);

  Sentry.captureException(err);
  Sentry.setupExpressErrorHandler(err);

  if (err.message.startsWith('ValidationError')) {
    res.status(400).json({ message: err.message.replace('ValidationError: ', '') });
    return;
  }
  if (err.message.startsWith('ConflictError')) {
    res.status(409).json({ message: err.message.replace('ConflictError: ', '') });
    return;
  }
  if (err.message.startsWith('NotFoundError')) {
    res.status(404).json({ message: err.message.replace('NotFoundError: ', '') });
    return;
  }
  if (err.message.startsWith('AuthError')) {
    res.status(400).json({ message: err.message.replace('AuthError: ', '') });
    return;
  }

  res.status(err.status || 500).json({ message: err.message || 'Server error' });
};
