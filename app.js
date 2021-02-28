const express = require('express');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.use(express.static('assets'))

app.get("/test", (req, res) => {

	res.send('This is the test page');
});


app.get('/demo', (req, res) => {
	res.set('X-full-stack', '4life');
	res.status(418);
	res.send('I prefer coffee');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));