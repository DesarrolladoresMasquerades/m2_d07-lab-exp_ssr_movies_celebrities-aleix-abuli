const Celebrity = require('../models/Celebrity.model');

const router = require('express').Router();

router.route('/create')
.get((req, res) => {
    res.render('celebrities/new-celebrity');
})
.post((req, res) => {
    const {name, occupation, catchPhrase} = req.body;

    Celebrity.create({name, occupation, catchPhrase})
    .then(()=>res.redirect('/celebrities'))
    .catch(()=>res.render('celebrities/new-celebrity'));
});

router.get('/', (req, res) => {
    Celebrity.find()
    .then((celebrities) => res.render('celebrities/celebrities', {celebrities}))
    .catch(error => console.log(error));
})

module.exports = router;