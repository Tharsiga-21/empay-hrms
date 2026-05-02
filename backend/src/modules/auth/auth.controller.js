const authService = require('./auth.service');

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const data = await authService.login(email, password);
    res.json({
      success: true,
      message: 'Login successful',
      data,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.id);
    res.json({
      success: true,
      message: 'Profile fetched successfully',
      data: user,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
    await authService.forgotPassword(email);
    // Always return success to prevent email enumeration
    res.json({ success: true, message: 'If an account exists, a reset link has been sent' });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, message: error.message || 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ success: false, message: 'Token and new password required' });
    await authService.resetPassword(token, newPassword);
    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, message: error.message || 'Internal server error' });
  }
};

module.exports = { register, login, getMe, forgotPassword, resetPassword };
