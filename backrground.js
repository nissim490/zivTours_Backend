setInterval(doSomething1, 60*60*1000);
function doSomething() {
    
    var currentdate = new Date(); 




}
  // With a function defined separately
  function doSomething1() {
    var currentdate = new Date(); 
    
    
    const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tours =require('./models/tourModel')

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
const tours = JSON.parse(fs.readFileSync(`./dev-data/data/bla.json`,'utf8'));

////import into data base
const importData = async () => {
try{

await Tours.create(tours);


console.log('data successufully loaded!');


}catch(err){

    console.log(err);

}

}
// delete all data from Db
const deleteData = async () => {
    try{
    
    await Tours.deleteMany();
  
  
    console.log('data successufully deleted!');
    importData()

    }catch(err){
        console.log(err);
    }



    }
  
deleteData()



}