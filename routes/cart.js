const express = require('express');
const router = express.Router(); 
const { isloggedIn } = require('../middleware');
const Product = require('../modals/product');
const User = require('../modals/user');


router.get('/user/:userId/cart',isloggedIn,async (req, res) => {
    
     try{
        const user = await User.findById(req.params.userId).populate('cart');
        res.render('cart/showCart', { userCart: user.cart });

     }catch (e){
         console.log(e);
         req.flash('error', 'error while adding to cart');

         res.render('error');
     }
})


router.post('/user/:id/cart',isloggedIn, async(req,res)=>{

   try{
    const product = await Product.findById(req.params.id);
    const user = req.user;
    user.cart.push(product)
    req.flash('success', 'Added  to cart successfully');

    await user.save();

    res.redirect(`/user/${req.user._id}/cart`);
   }catch(e){
    req.flash('error', 'Unable to get to cart');

    res.render('error');   }


    res.send("You hit the Add to cart Route");
});


router.delete('/user/:userid/cart/:id',async(req,res)=>{
    
    const {userid, id} = req.params;
   await User.findByIdAndUpdate(userid,{$pull:{cart:id}});
    
    
    res.redirect(`/user/${req.user._id}/cart`);

})


router.get('/cart/payment',(req,res)=>{
    res.render('payment/payment');
})











module.exports = router;