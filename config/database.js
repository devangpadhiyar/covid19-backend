const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Database connection successful');
}).catch((err)=>{
    console.log('Databse connection failed', err);
    process.exit();
});
