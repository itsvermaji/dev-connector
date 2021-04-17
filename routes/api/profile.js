// To create users profiles, Bio, Location, Experiences, Education, Social Network Links


const express = require('express');
const router = express.Router();

// @route           GET /api/profile/test
// @description     Tests post route
// @access Public   Public

router.get('/test', (req, res) => {
    res.json({
        msg: 'Profile works!'
    });
});

module.exports = router;