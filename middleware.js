
const isloggedIn = (req,res,next)=>{

    if(!req.isAuthenticated()){
        req.flash('error', 'Please login First');
        return res.redirect('/login');
    } 
    next();
}

module.exports={isloggedIn}