// get packages(3rd party apis)
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');

var sessions = require('client-sessions');
var bcrypt = require('bcryptjs');

// bodyParser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



//INCLUDE ROUTES

// app.get('/',function(req,res,next){
// 	res.send('this is the home')
// })


// SET VIEW ENGINE
app.set('view engine', 'pug');

// INCLUE ALL MODELS INSIDE MODEL FOLDER
// 定義xxxSchema，xxxSchema註冊到mongoose (movies & stars)
fs.readdirSync(__dirname + '/models').forEach(function(filename){
	if(~filename.indexOf('.js'))require(__dirname + '/models/' + filename);
});

// INCLUE ALL ROUTES INSIDE ROUTES FOLDER
fs.readdirSync(__dirname + '/routes').forEach(function(filename){
	filename = filename.slice(0, -3);
	filename = require('./routes/' + filename + '.js');
	app.use('/', filename);
});


app.use(sessions({
	cookieName: 'session',
	secret:'nodeclass',
	duration: 30*60*10000,
	httpOnly: true, // client side js cannot mass around the cookieName
	secure: true, // only use cookies over https
	ephemeral: true // 關browser, cookie 會清掉
}));

app.use(function(req,res,next){
	if(req.session && req.session.user){
		userSchema.findOne({email: req.session.user.email},function(err,user){
			if(user){
				req.user = user;
				delete req.user.password;
				req.session.user = user;
				req.locals.user = user;
			}
			next();
		})
	} else {
		next();
	}
})

// var Cat = mongoose.model('Cat', { name: String });
// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// });

// CONNECT TO THE DATABASE
if('development' == app.get('env')){
	mongoose.connect('mongodb://localhost/mongostuff?socketTimeoutMS=300000');	
}else{
	mongoose.connect('12.58.12:1270')
}

app.listen(3000,function(req,res){
	console.log('listening on port 3000')
})