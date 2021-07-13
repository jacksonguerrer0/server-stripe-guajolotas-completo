const config = require('./config.js');
const stripe = require('stripe')(config.SECRET_KEY);
const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors())
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


const DOMAIN = config.APP_DOMAIN;

app.post('/create-checkout-session', async (req, res) => {

    let products = req.body.products;

    let arrayProducts = [];

    products.forEach(product => {
        let lineProduct = {
            price_data: {
              currency: 'mxn',
              product_data: {
                name: product.flavor,
                images: [product.image_main],
              },
              unit_amount: product.price*100,
            },
            quantity: product.quantity,
          }

        arrayProducts.push(lineProduct);
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: arrayProducts,
        mode: 'payment',
        success_url: `${DOMAIN}/payment_success`,
        cancel_url: `${DOMAIN}/payment_failed`,
      });
      res.json({ id: session.id });
});

app.listen(4242, () => console.log('Running on port 4242'));

