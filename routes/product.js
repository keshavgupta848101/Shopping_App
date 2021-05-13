const express = require('express');
const router = express.Router();
const Product = require('../modals/product');
const Review = require('../modals/review') 
const {isloggedIn} = require('../middleware');


// Dispaly all the product
router.get('/products', async(req,res)=>{
  try{
    const products = await Product.find({})
    res.render('products/index',{products}); 
  }catch(e){
      console.log("some err occurr");
      req.flash('error', 'Can not find Products');
      res.render('err');
  }
})

// get the form to add new product
router.get('/products/new',isloggedIn,(req,res)=>{

   
    
    res.render('products/new')
})


//Create New Products 

router.post('/products',isloggedIn, async(req,res)=>{
    try{


        await Product.create(req.body.product);
        req.flash('success', 'Product Created Successfully');
        res.redirect('/products');
    }catch(e){
        console.log(e.message);
      res.flash('error', 'Can not create Products');
      res.render('err');
    }
    
});


//Show particular Product
router.get('/products/:id', async(req,res)=>{
   try{
    const product = await Product.findById(req.params.id).populate('reviews');
    // console.log(product);
    res.render('products/show',{product})
   }catch(e){
    console.log(e.message);
    req.flash('error', 'Can not Show particular Products');
    res.render('err');
   }
})


//Get the edit form
router.get('/products/:id/edit',isloggedIn, async(req,res)=>{
    const product = await Product.findById(req.params.id);

    res.render('products/edit',{product})

});

//Update the particular products
router.patch('/products/:id',isloggedIn, async(req,res)=>{

    await Product.findByIdAndUpdate(req.params.id, req.body.product)

    req.flash('success', 'Product Information Update Successfully');
    res.redirect(`/products/${req.params.id}`);

}) 

//Delete the particular products
router.delete('/products/:id',isloggedIn, async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id);

    res.redirect('/products')
})

// creating a new comments

router.post('/products/:id/review',isloggedIn, async(req,res)=>{
    const product = await Product.findById(req.params.id);
    const review = new Review({
        user: req.user.username,
        ...req.body
    });
   
    product.reviews.push(review);

   
    await review.save();
    await product.save();
   
    // console.log(review);

    res.redirect(`/products/${req.params.id}`);
})


module.exports = router;