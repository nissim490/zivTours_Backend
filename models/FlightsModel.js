const mongoose = require('mongoose');
const fs = require('fs');

const Flightschema = new mongoose.Schema(
  {
departure: {
      code: {type: String},
      name: {
        type: String,
      },
      city:{type: String},
      country: {
          code: {type: String},
          name: {type: String},
      },
    },
destination: {
        code: {type: String},
        name: {type: String},
        city: {type: String},
        country: {
            code: {type: String},
            name: {type: String},
        }
    },

    depart_date:  {type: Date},
    return_date: {type: Date},
    source:  {type: String},
    price: {
      type: Number,
      required: [true, 'A Flights must have a price']
    },
    label:  { type: Number},
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    user: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User',
     
    }]
  
}
);

// QUERY MIDDLEWARE
// Flightschema.pre('find', function(next) {
Flightschema.pre(/^find/, function(next) {
  this.find({ secretFlights: { $ne: true } });

  this.start = Date.now();
  next();
});

Flightschema.pre(/^find/, function(next) {
  this.populate({
      path: 'user',
      select: 'name'
  })
    next() 

  });

const Flights = mongoose.model('Flights', Flightschema);

/* setInterval(doSomething, 60*15*1000); */

  // With a function defined separately
  function doSomething() {
    var currentdate = new Date(); 
    console.log(currentdate);
    
  /*   const mongoose = require('mongoose'); */

const flights = JSON.parse(fs.readFileSync(`${__dirname}/flights.json`,'utf8'));
////import into data base
const importData = async () => {
try{
await Flights.create(flights);
console.log('data successufully loaded!');
}catch(err){
    console.log(err);
}
}
// delete all data from Db
const deleteData = async () => {
    try{
    
    await Flights.deleteMany();
    console.log('data successufully deleted!');
    importData()
    }catch(err){
        console.log(err);
    }

    }
    deleteData()
}
module.exports = Flights;
