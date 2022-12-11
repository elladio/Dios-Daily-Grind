
///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const { urlencoded } = require("express")
const mongoose = require("./connection")
const Coffee = require("./coffee")



mongoose.connection.on('open', () => {

  // define data we want to put in the database
  const coffees =  [
      {name: "Peppermin Attack" , bean: "Robusta", expressoShot: true, flavor: "Peppermint", sugar: "Sugar", iced: false, size: "Medium"},
      {name: "Mighty Mocha" , bean: "Arabica", expressoShot: true, flavor: "none", sugar: "Splenda", iced: false, size: "Large"},
      {name: "Stan Lee" , bean: "Excelsa", expressoShot: true, flavor: "Greatness", sugar: "Raw cane Sugar", iced: true, size: "Medium"},
      {name: "Pumpkin Spice" , bean: "Liberica", expressoShot: false, flavor: "Pumpkin Spice", sugar: "Liquid Cane", iced: false, size: "Large"},
    
    ]
    
    Coffee.deleteMany({}, (err, data) => {
      Coffee.create(coffees, (err, data) =>{

          console.log("database filled"),
          console.log(data);
          console.log("database filled"),
			mongoose.connection.close()
		})
	})
})