const express = require('express');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	let promise = fetch("https://dog.ceo/api/breeds/image/random").then(link => 
	res.send(`<h1> Yes, yes he is. </h1> 
	<p>Here's a picture of a doggo</p>
	<img src=${link} alt="A random doggo"/>
	`);
	)
});

app.get("/test", (req, res) => {

	res.send('This is the test page');
});


app.get('/demo', (req, res) => {
	res.set('X-full-stack', '4life');
	res.status(418);
	res.send('I prefer coffee');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));