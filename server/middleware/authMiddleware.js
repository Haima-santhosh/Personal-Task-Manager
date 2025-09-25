import jwt from 'jsonwebtoken'

// Middleware to protect routes
const auth = (req, res, next) => {
  // get token from header
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token, access denied' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: decoded.id }
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export default auth
