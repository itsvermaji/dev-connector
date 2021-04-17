// Authentication, Login, Password   

const express = require('express');
const router = express.Router();

// @route           GET /api/posts/test
// @description     Tests users route
// @access Public   Public

router.get('/test', (req, res) => {
    res.json({
        msg: 'Users works!'
    });
});

module.exports = router;