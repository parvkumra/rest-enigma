import { User } from "../Models/UserModel";
import bcryptjs from "bcryptjs";


export const signup=async(req,res)=>{
 const {fullname,email,password,contact,admin}=req.body;
  
 const exist_user=await User.findOne({email});
 if(exist_user){
    return res.status(500).json({
        success:false,
        msg:"user already exists"
    })
 }
 const hashed_password=await bcryptjs.hash(password,10);
 const new_user=await User.create({
    fullname,
    email,
    password:hashed_password,
    contact,
    admin
})
new_user.lastLogin=new Date();
await new_user.save();
//verifymail
//generate token
const user_created=await User.findOne({email}).select("-password");

return res.status(201).json({
   msg:"user created successfully",
   user_created
})


};

export const signin=async(req,res)=>{
 const {email,password}=req.body;
 const userexist=await User.findOne({email});
 if( !userexist){
    return res.status(500).json({
       success:false,
       msg:"user does not exists"
    })
 }
 const comp=await bcryptjs.compare(password,userexist.password);
 if(!comp){
    return res.status(500).json({
        success:false,
        msg:"invalid password"
    })
 }
 userexist.lastLogin=new Date();
 userexist.save();
 //generate token
 return res.status(201).json({
    success:true,
    msg:"logged in successfully"
 })
}

export const logout = async (req, res) => {
    try {
        return res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged out successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};