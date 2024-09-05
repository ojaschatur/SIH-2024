const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/", controller.getLogs);
router.post("/", controller.addLogs);

module.exports = router;