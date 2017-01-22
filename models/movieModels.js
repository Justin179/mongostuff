// Mongoose provides a schema-based solution to model your application data.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 定義movieSchema
var movieSchema = new Schema({
	title:String,
	year:Number,
	good:Boolean,
	director:String,
	star:[
		{
			starId:{type: Schema.Types.ObjectId, ref:"stars"}
		}
	]
})
// movieSchema註冊到mongoose
mongoose.model('movies', movieSchema)