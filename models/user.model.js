const mongoose = require('mongoose');
const { isEmail } = require('validator');


//define Schema
const UserSchema = new mongoose.Schema(
    {
        email:{ 
            type: String, 
            required: true, 
            unique: true,
            validate: isEmail
        },
        password:{ 
            type: String, 
            required: true,
            minlength: 6
        },
    },
)
// fire a func runs after doc saved to db
UserSchema.post('save', function(doc, next){
    console.log('new user was created & saved!', doc);
    next()
});


//accessing model
const model = mongoose.model('User', UserSchema)

module.exports = model