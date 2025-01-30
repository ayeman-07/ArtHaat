import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true,unique:true},
    password: {type:String, required:true},
    cartData: {type:Object, default:{}},

}, {minimize:false})


// Here minimize:false is used because by default, mongoose will remove empty objects from the cartData object. But here we want to keep the empty objects as well which is the cartData even when it is empty we want to keep . So, we set minimize to false.



const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel