const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const userSchema = mongoose.Schema({

        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        pic : {
            type : String,
            default : "https://res.cloudinary.com/socialite9000/image/upload/v1620927439/default_as6fgp.jpg"
        },
        followers : [{type : ObjectId, ref : "User"}],
        following : [{type : ObjectId, ref : "User"}]

})

mongoose.model("User",userSchema)
