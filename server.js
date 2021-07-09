const stripe = require('stripe')('sk_test_51JBNpCINIjbITmoITPhLMJNRsys6qNeSWbnROJeFwDfIhQJTVO6I8HT0w9xVKBo26fWkrQeWrD2PdzztI4an4arN00S7cHcR1q');
const express = require('express');
const app = express();
app.use(express.static('.'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
   next();
});
const DOMAIN = "http://localhost:3000";
app.post('/create-checkout-session', async (req, res) => {
	//Aquí vendrá todo el código que copiaremos después.
});
app.listen(4242, () => console.log('Running on port 4242'));