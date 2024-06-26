const mongoose =require('mongoose')
mongoose.connect('')
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})

const User = mongoose.model('user',UserSchema)

module.exports = {
    User
}