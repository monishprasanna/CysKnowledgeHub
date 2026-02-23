import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { User } from '../models/User';

type Role = 'student' | 'author' | 'admin';

/**
 * Middleware factory: checks that the authenticated user has at least one
 * of the permitted roles (roles are inclusive — admin can do everything author can).
 */
export function requireRole(...permitted: Role[]) {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    try {
      const user = await User.findOne({ uid: req.user.uid });
      if (!user) {
        res.status(401).json({ message: 'User not found in database' });
        return;
      }

      // Admin can always pass, otherwise check against specified roles
      if (user.role === 'admin' || permitted.includes(user.role as Role)) {
        // Attach DB role to request for downstream use
        (req as any).dbUser = user;
        next();
        return;
      }

      res.status(403).json({ message: `Access denied. Required role: ${permitted.join(' or ')}` });
    } catch (err) {
      res.status(500).json({ message: 'Role check error', error: String(err) });
    }
  };
}
