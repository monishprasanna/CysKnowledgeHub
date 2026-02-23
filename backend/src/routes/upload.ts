import { Router, Response, Request } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';

const router = Router();

// ─── Storage configuration ────────────────────────────────────────────────────

const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads', 'ctf-images');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB max
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// ─── POST /api/upload/image ───────────────────────────────────────────────────

router.post(
  '/image',
  requireAuth,
  requireRole('author'),
  (req: Request, res: Response, next: any) => {
    upload.single('image')(req as any, res as any, (err: any) => {
      if (err instanceof multer.MulterError) {
        res.status(400).json({ message: `Upload error: ${err.message}` });
        return;
      }
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }
      next();
    });
  },
  (req: Request, res: Response): void => {
    const file = (req as any).file as Express.Multer.File | undefined;
    if (!file) {
      res.status(400).json({ message: 'No image file provided' });
      return;
    }

    const baseUrl = process.env.SERVER_URL ?? `http://localhost:${process.env.PORT ?? 5000}`;
    const url = `${baseUrl}/uploads/ctf-images/${file.filename}`;
    res.json({ url });
  }
);

export default router;
