const mongoose = require('mongoose');
const fs = require('fs');

const Tourschema = new mongoose.Schema(
 
   {
            hotel_name: String,
            hotel_city: String,
            hotel_value_for_money: Number,
            hotel_staff: Number,
            hotel_popular_facilities: Number,
            hotel_location:Number,
            hotel_free_wifi: Number,
            hotel_cleanliness: Number,
            hotel_score:Number,
            hotel_comfort: Number,
            hotel_link: String,
            hotel_address:String,
            hotel_price:Number,
            flight_price:Number,
            total_price:Number,
            hotel_check_in:Date,
            hotel_check_out:Date,
            flight_source:String,
            hotel_popular_facilities: [String],
            user: [
                {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
               
              }]
            
        }
);






Tourschema.post(/^find/, function(docs, next) {
 /*  console.log(`Query took ${Date.now() - this.start} milliseconds!`); */
  next();
});
Tourschema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name'
    })
      next() 
   
    });






const Tour = mongoose.model('Tour', Tourschema);
/* setInterval(doSomething, 60*32*1000); */
  // With a function defined separately
  function doSomething() {
    var currentdate = new Date(); 
    console.log(currentdate);
/*     const mongoose = require('mongoose'); */
/////read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/bla.json`,'utf8'));
////import into data base
const importData = async () => {
try{
await Tour.create(tours);
console.log('data successufully loaded!');
}catch(err){
    console.log(err);
}

}
// delete all data from Db
const deleteData = async () => {
    try{
    await Tour.deleteMany();
    console.log('data successufully deleted!');
    importData()
    }catch(err){
        console.log(err);
    }
    }
  
    deleteData()

}
module.exports = Tour;
