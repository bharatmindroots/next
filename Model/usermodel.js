import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String, unique: true},
    password : {type: String},
    role: {type: String, default: 'user'}
}, {timestamps: true})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)