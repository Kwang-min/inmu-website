const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secretKey = require('../config/secretKey')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    }
})

userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)

                user.password = hash;
                next()

            })
        })

    } else {
        next()
    }

})

userSchema.methods.comparePassword = function (plainPassword, cb) {

    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);

        cb(null, isMatch)

    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign({"_id":user._id.toHexString()}, secretKey, {expiresIn: '1h'})

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    
    jwt.verify(token, secretKey, function (err, decoded) {
        if(decoded) {
            user.findOne({ "_id": decoded._id, "token": token }, function (err, user) {
                if (err) return cb(err)
                cb(null, user)
            })
        } else {
            cb(null)
        }
        
    })

}

const User = mongoose.model('User', userSchema)

module.exports = { User }