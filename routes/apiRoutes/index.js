const router = require('express').Router();
const notesRoutes = require('./noteAppRoutes');

router.use(notesRoutes);

module.exports = router;