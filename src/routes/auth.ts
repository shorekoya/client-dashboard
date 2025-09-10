import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} from '../controllers/authController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Example protected route
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: `Welcome ${req.session.user?.email}` });
});

export default router;
