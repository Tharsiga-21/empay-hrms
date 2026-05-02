const express = require('express');
const router = express.Router();
const dashboardController = require('./dashboard.controller');
const authMiddleware = require('../../middleware/auth');
const roleGuard = require('../../middleware/roleGuard');

router.use(authMiddleware);

router.get('/admin', roleGuard(['admin']), dashboardController.getAdminDashboard);
router.get('/employee', dashboardController.getEmployeeDashboard);
router.get('/hr', roleGuard(['admin', 'hr_officer']), dashboardController.getHRDashboard);
router.get('/payroll', roleGuard(['admin', 'payroll_officer']), dashboardController.getPayrollDashboard);

module.exports = router;
