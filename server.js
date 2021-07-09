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
    console.log(arrayProducts)

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

