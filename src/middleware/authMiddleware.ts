import { Request, Response, NextFunction } from 'express';

interface SessionAuthRequest extends Request {
  session: any; // session type is augmented via express-session.d.ts
}

// Protect route using session
export const protect = (
  req: SessionAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).json({ message: 'Not authorized, please log in' });
  }
  next();
};

// Check role
export const authorize = (...roles: string[]) => {
  return (req: SessionAuthRequest, res: Response, next: NextFunction) => {
    const user = req.session.user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
};
