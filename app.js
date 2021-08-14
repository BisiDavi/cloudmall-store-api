const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded())
app.use(express.json())

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log('mongoose, connected');
}).catch((error) => {
    console.error('error', error);
})

app.get('/', (req,res) => {
    res.send("Welcome to Cloudmall Store API");
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})