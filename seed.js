const mongoose = require('mongoose');
const Product = require('./modals/product')
const products = [
    {
        name: "Iphone 10",
        img: "https://images.unsplash.com/photo-1548094891-c4ba474efd16?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGklMjBwaG9uZSUyMDEwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 1000,
        desc: "The iPhone X used a glass and stainless-steel form factor and  design, shrinking the bezels while not having a unlike many Android phones. It was the first iPhone to use an OLED screen. The home button's fingerprint sensor was replaced with a new type of authentication called Face ID, which used sensors to scan the user's face to unlock the device. This face-recognition capability also enabled emojis to be animated following the user's expression (Animoji). With a bezel-less design, iPhone user interaction changed significantly, using gestures to navigate the operating system rather than the home button used in all previous iPhones. At the time of its November 2017 launch, its price tag of US$999 also made it the most expensive iPhone ever, with even higher prices internationally due to additional local sales and import taxes."
    },
    {
        name: "HeadPhones",
        img: "https://images.unsplash.com/photo-1548378329-437e1ef34263?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGhlYWRwaG9uZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 999,
        desc: "Headphones are a pair of small loudspeaker drivers worn on or around the head over a user's ears. They are electroacoustic transducers, which convert an electrical signal to a corresponding sound. Headphones let a single user listen to an audio source privately, in contrast to a loudspeaker, which emits sound into the open air for anyone nearby to hear. Headphones are also known as earspeakers, earphones[1] or, colloquially, cans.[2] Circumaural ('around the ear') and supra-aural ('over the ear') headphones use a band over the top of the head to hold the speakers in place. Another type, known as earbuds or earpieces[1] "
    },
    {
        name: "Bag Pack",
        img: "https://images.unsplash.com/photo-1550253594-356b2f788907?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmFncGFja3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 2000,
        desc: "A backpack—also called knapsack, rucksack, rucksac, pack, sackpack, booksack, bookbag or backsack—is, in its simplest frameless form, a cloth sack carried on one's back and secured with two straps that go over the shoulders, but it can have an external frame, internal frame, and there are bodypacks.Backpacks are commonly used by hikers and students, and are often preferred to handbags for carrying heavy loads or carrying any sort of equipment, because of the limited capacity to carry heavy weights for long periods of time in the hands."
    },
    {
        name: "Laptop",
        img: "https://images.unsplash.com/photo-1533740566848-5f7d3e04e3d7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGxhcHRvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 50000,
        desc: "A laptop, laptop computer, or notebook computer is a small, portable personal computer (PC) with a screen and alphanumeric keyboard. These typically have form factor, typically having the screen mounted on the inside of the upper lid of the clamshell and the keyboard on the inside of the lower lid, although 2-in-1 PCs with a detachable keyboard are often marketed as laptops or as having a Laptops are folded shut for transportation, and thus are suitable for"
    }
]

const  seedDb = async ()=>{
   await Product.insertMany(products)
    console.log("Db enterd in Database");
};

module.exports = seedDb;