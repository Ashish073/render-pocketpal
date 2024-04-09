require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dbConfig = require('./config/dbConfig')


const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoute');
const categoriesRoute = require('./routes/categoriesRoute');
const expenseRoute = require('./routes/expenseRoute');

app.use(express.static(path.join(__dirname, './client/build')));
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoute);
app.use("/api/expenses", expenseRoute);

const port = process.env.PORT || 5000;


app.get('*', () => (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});