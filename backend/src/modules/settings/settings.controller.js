const settingsService = require('./settings.service');

const getAll = async (req, res) => {
  try {
    const settings = await settingsService.getAll();
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load settings' });
  }
};

const update = async (req, res) => {
  try {
    await settingsService.update(req.body);
    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
};

module.exports = { getAll, update };
