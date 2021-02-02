const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Flights =require('./../../models/FlightsModel')

///dotenv.config({path:"./config.env"});
const DB="mongodb+srv://manu:academind123@cluster0.rjxj4.mongodb.net/Web?retryWrites=true&w=majority"
 DB.replace(
    '<PASSWORD>',
    process.env.DB_PASSWORD
  );


mongoose
.connect(DB,{


}).then(() =>  console.log("DB connections sucessful!")


);


/////read json file
const tours = JSON.parse(fs.readFileSync(`../../models/flights.json`,'utf8'));
const ziv = JSON.parse(fs.readFileSync(`../../models/ziv.json`,'utf8'));


////import into data base
const importData = async () => {
try{

await Flights.create(tours);


console.log('data successufully loaded!');
await Flights.create(ziv);
console.log('data successufully loaded!');

}catch(err){

    console.log(err);

}
process.exit();
}
// delete all data from Db
const deleteData = async () => {
    try{
    
    await Flights.deleteMany();
  
  
    console.log('data successufully deleted!');

    }catch(err){
        console.log(err);
    }


    process.exit();
    }
    if (process.argv[2]=== '--import')
    {
        importData()
       // process.exit();


    }
    
    else if (process.argv[2]=== '--delete'){
        deleteData();
       // 

    }



    
    console.log(process.argv)