var bodyParser = require('body-parser');
//mongodb://<dbuser>:<dbpassword>@ds121248.mlab.com:21248/mydatabase
var mongoose = require('mongoose');

//connecting to the database
mongoose.connect('mongodb://heman96:0991aug15@ds121248.mlab.com:21248/mydatabase');

//create a blueprint for data(object) to b stored in mongodb(in the form of documents)
var todoSchema = new mongoose.Schema({
	item: String
});

//create a model(model name,Schema)
//model-->collection!??------------>more
var Todo = mongoose.model('todo',todoSchema);

/*var itemOne = Todo({item: 'buy flowers'}).save(function(err){
	if(err) throw err;
	else{
		console.log('item saved');
	}
});*/

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//var data = [{item: 'get milk'},{item: 'walk dog'},{item: 'kick some coding ass'}];

module.exports = function(app){

	app.get('/todo',function(req,res){
		//get data from mongodb and pass it to mongoDB
		//either find all items of a specific item.
		//{}-->find all items,callback function
		Todo.find({},function(err,data){
			if(err) throw err;
			res.render('todo',{todos: data});
		})
	});

	app.post('/todo',urlencodedParser,function(req,res){
		//get data from the view and push it to mongoDB
		var newTodo = Todo(req.body).save(function(err,data){
			if(err) throw err;
			res.json(data);
		});
	});

	app.delete('/todo/:item',function(req,res){
		//delete the requested item from mongoDB
		Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
			if(err) throw err;
			res.json(data);
		});
	});

};