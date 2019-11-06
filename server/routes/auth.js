const router = require('express').Router();

router.post('/register', (req, res) => {
    res.send('Registers');
    console.log('response123')
});

module.exports = router;