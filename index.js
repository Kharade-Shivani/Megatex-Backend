const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Shivaniamu')
});

//Routes Imports

const bannerRoutes = require("./Routers/BannerRoutes");
const adminRoutes = require("./Routers/AdminRoutes");
const categoryRoutes = require("./Routers/CategoryRoutes");
const subCategoryRoutes = require("./Routers/SubCategoryRoutes");
const productRoutes = require("./Routers/ProductRoutes");
const FIBCRoutes = require("./Routers/FIBCRoutes");
const TarpaulinRoutes = require("./Routers/TarpaulinRoute")
// Middleware

app.use("/", bannerRoutes);
app.use("/", adminRoutes);
app.use("/", categoryRoutes);
app.use("/", subCategoryRoutes);
app.use("/", productRoutes);
app.use("/", FIBCRoutes);
app.use("/", TarpaulinRoutes)


app.listen(process.env.Port, () => {
    console.log(`listening on ${process.env.Port}`);
    console.log(`listening on db ${process.env.MONGO_URI}`);
})