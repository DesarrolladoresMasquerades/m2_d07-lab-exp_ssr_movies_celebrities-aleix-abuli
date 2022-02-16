const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

const router = require('express').Router();

router.route('/create')
.get((req, res) => {
    Celebrity.find()
    .then((celebList) => {
        res.render('movies/new-movie', {celebList});
    })
    .catch(error => console.log(error));
})
.post((req, res) => {
    const {title, genre, plot, cast} = req.body;

    Movie.create({title, genre, plot, cast})
    .then(()=>res.redirect('/movies'))
    .catch(error => console.log(error));
});

router.get('/', (req, res) => {
    Movie.find()
    .then((movies)=> res.render('movies/movies', {movies}))
    .catch(error => console.log(error));
});

router.get('/:id', (req, res) => {
    Movie.findById(req.params.id)
    .populate('cast')
    .then((movie) => res.render('movies/movie-details', movie))
    .catch(error => console.log(error));
});

router.post('/:id/delete', (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/movies'))
    .catch(error => console.log(error));
});

module.exports = router;