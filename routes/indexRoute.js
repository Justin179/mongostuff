// HOME ROUTE
var express = require('express');
// USING EXPRESS ROUTER METHOD
var router = express.Router();

// 取得mongoose的package
var mongoose = require('mongoose');
var movieSchema = mongoose.model('movies',movieSchema);


// USE ROUTER.GET, FIND ALL MOVIES
router.get('/',function(req,res,next){

	console.log('GET /');

	//db.movies.find
	movieSchema.find({},function(err, data){
		if(err){console.log(err)}
		else{
			res.render('index', {movie: data});
		}
	});
});

router.get('/search',function(req,res,next){

	console.log('GET /search');

	var query = req.body.title; // 從body會拿不到
	console.log(query);

	movieSchema.find({title:query},function(err,data){
		console.log(data);
		res.render('index', {movie:data})
	})
});

//SEARCH FOR MOVIE
// router.post('/',function(req,res,next){
// 	var query = req.body.title;
// 	movieSchema.find({title:query},function(err,data){
// 		res.render('index', {movie:data})
// 	})
// });

//ADD NEW MOVIE
router.post('/',function(req,res,next){

	console.log('POST /');

	var movie = new movieSchema({
			title: req.body.title
		})
	console.log(movie)
	movie.save(function(err){
		console.log(err)
	});

})
// EXPORT ROUTER
module.exports = router;