import jwt from 'jsonwebtoken';


const adminAuth = async(req,res,next) => {
    try {
        const {token} = req.headers;
        if(!token){
            return res.json({success:false, message: "Not Authorized Login Again"})
        }

        const token_decode = jwt.verify(token,process.env.JWT_SECRET);

        if(token_decode!=process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({success:false, message: "Not Authorized Login Again"})
        }


        next();

        
// In Express.js, next is a function provided by the framework in the context of middleware. It allows you to pass control to the next middleware function in the request-response cycle. If next() is not called, the request will not proceed further to the following middleware or route handler, essentially stopping at that point.


    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

export default adminAuth;