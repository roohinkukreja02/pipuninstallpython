const express = require('express');
const app = express();
const path = require('path')
const mongoose = require("mongoose");
const Alumni = require("../models/models_alumni");
const cities = require("./allcities");
const {firstname,lastname} = require("./names");
const {deps,domains} = require('./departments')

mongoose.connect('mongodb://localhost:27017/codeissance')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const temp = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async()=>{
    await Alumni.deleteMany({});
    for(let i = 0; i < 300; i++)
    {
        const random1000 = Math.floor(Math.random() * 125000);
        // const price = Math.floor(Math.random() * 10000);
        const c = new Alumni({
            city: `${cities[random1000].name}, ${cities[random1000].country}`,
            first_name: `${temp(firstname)}`,
            last_name: `${temp(lastname)}`,
            email: `${Math.floor(Math.random() * 1000)}${Math.floor(Math.random() * 1000)}@xxx`,
            department: `${deps[Math.floor(Math.random() * 5)]}`,
            grad_year: `${[Math.floor(Math.random() * 1990 + Math.floor(Math.random()*33))]}`,
            domain:`${domains[Math.floor(Math.random() * 17)]}`,
            // images: [
            //     {
            //       url: 'https://res.cloudinary.com/da22oy8nw/image/upload/v1726842736/YelpCamp/rzpmjo86d1gtkgxgzdot.jpg',
            //       filename: 'YelpCamp/rzpmjo86d1gtkgxgzdot',
            //     },
            //     {
            //       url: 'https://res.cloudinary.com/da22oy8nw/image/upload/v1726842737/YelpCamp/nttlvfb9oqf8oo3zjo6e.jpg',
            //       filename: 'YelpCamp/nttlvfb9oqf8oo3zjo6e',
            //     },
            //     {
            //       url: 'https://res.cloudinary.com/da22oy8nw/image/upload/v1726842737/YelpCamp/huwjik5pb9rwlzwyubj0.jpg',
            //       filename: 'YelpCamp/huwjik5pb9rwlzwyubj0',
            //     }],
                geometry: {
                    type: 'Point',
                    coordinates: [cities[random1000].lng, cities[random1000].lat]
                },
            // price: price,
            // description: "A campground is a designated outdoor area that provides facilities for people to set up temporary lodging, typically in tents, recreational vehicles (RVs), or cabins. These spaces are often located in natural settings, such as forests, mountains, or near bodies of water."
        })
        await c.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})