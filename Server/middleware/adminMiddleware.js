import authMiddleware from './authMiddleware.js';

const adminMiddleware = async (req, res, next) => {
  await authMiddleware(req, res, async () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
    }
    next();
  });
};

export default adminMiddleware;
