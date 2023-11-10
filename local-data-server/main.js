const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
	res.send('OK');
});

// /sys/class/power_supply/bd71827_bat/capacity
app.get('/battery', (req, res) => {
	try {
		const data = fs.readFileSync('/sys/class/power_supply/bd71827_bat/capacity', 'utf8');
		res.send(data);
	} catch (e) {
		console.log('Error:', e.stack);
		res.send(`Error\n${e.stack}`);
	}
});

const backlightMin = 0;
const backlightMax = 2047;

// /sys/class/backlight/bl/brightness
app.get('/backlight', (req, res) => {
	try {
		const data = fs.readFileSync('/sys/class/backlight/bl/brightness', 'utf8');
		const value = parseInt(data);
		const percent = Math.round((value - backlightMin) / (backlightMax - backlightMin) * 100);
		res.status(200).send(percent.toString());
	} catch (e) {
		console.log('Error:', e.stack);
		res.send(`Error\n${e.stack}`);
	}
});

app.get('/backlight/:value', (req, res) => {
	try {
		const value = req.params.value;
		const percent = parseInt(value);
		const actualValue = Math.round((backlightMax - backlightMin) * percent / 100 + backlightMin);
		fs.writeFileSync('/sys/class/backlight/bl/brightness', actualValue.toString(), 'utf8');
		res.status(200).send(percent.toString());
	} catch (e) {
		console.log('Error:', e.stack);
		res.send(`Error\n${e.stack}`);
	}
});


app.listen(3000, () => {
	console.log("App is listening on port 3000");
})