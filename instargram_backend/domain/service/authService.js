var User = require("../model/user");

const authService = {
    signUp : async (email, password) =>{
        let result = await User.findOne({"email": email})
        if (!result) {
            const newUser = new User({
                email: email,
                password: password
            })
            result = await newUser.save();
            console.log(result)
            return newUser;
        } else {
            throw new Error("error/email_existed")
        }
    },

    login : async (email,password)=>{
        let result = await User.findOne({"email": email, "password" : password})
        if(result){
            return result;
        }
        throw new Error("error/user_not_found")
    }
};


module.exports = authService;