const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../modals/user');
// const passport = require('passport')

// router.get('/fakeUser', async (req,res)=>{
//     const user = new User({email: "Keshav@gmail.com", username: "Keshav"});

//    const newUSer =  await User.register(user, 'keshav');
//     console.log(newUser);
//    res.send(newUser);
// });

router.get('/register', async(req,res)=>{
    res.render('auth/register');
})

router.post('/register', async(req,res)=>{

    try{
        const user = new User({email: req.body.email, username:req.body.username});
        const newUser = await User.register(user, req.body.password);
        console.log(newUser);
        req.flash('success', 'Registered Successfully');
        res.redirect('/login')
    }
    catch (e){
        req.flash('error', e.message);
        req.redirect('/register');
    }
});

// GEt the login Form
router.get('/login', async(req,res)=>{
    res.render('auth/login')
});

router.post('/login', 
    passport.authenticate('local',{
        failureRedirect:'/login',
        failureFlash: true
    }),(req,res) =>{
        req.flash('success', `Welcome Back ${req.user.username}!!`);
        
        res.redirect('/products');
    });

    //Logout the user from current user.
router.get('/logout', (req,res)=>{

    req.logOut();
    req.flash('success', 'LogedOut Successfully');
    res.redirect('/login');

});
module.exports = router;