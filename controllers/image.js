const Clarifai = require('clarifai');


//Your Api Key Here
const app = new Clarifai.App({
 apiKey: 'b09578235e234e66ba0a6d8e9961258c'
});


const handleApiCall = (req,res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json("unable to connect to API"))
}

const handleImage = (req,res,db) => {
	const { id } = req.body;
	db('users')
	.where('id', '=', id)
  	.increment('entries' , 1)
  	.returning('entries')
  	.then(entries => {
  		res.json(entries[0]);
  	})
  	.catch(err => res.status(400).json("error incrementing entries"))
}

module.exports = {
	handleImage,
	handleApiCall
}