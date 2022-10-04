const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 9056;
const config = require('./config/config');
const dbcontext = require('./services/db.context');

//Routes:
const StoreRouter = require('./routes/store.route');
const UserRouter = require('./routes/user.route');
const ProductRouter = require('./routes/product.route');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routing:
app.use(StoreRouter);
app.use(UserRouter);
app.use(ProductRouter);

// Authentication:
config.authenticate()
.then(() => {
    config.sync({ force: ( process.env.RESET == 'true' ? true : false ) });
    console.log("Connected to Database!");
})
.catch((err) => {
    console.log(err);
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Connected to PORT ${port}`);
});
