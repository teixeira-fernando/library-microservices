const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: { type:String, required:true },
    phone: { type:String, required:true },
    email: { type:String, required:true },
    password: { type:String, required:true },
    salt: String,
    address:[
        { type: Schema.Types.ObjectId, ref: 'address', required: true }
    ]
},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports =  mongoose.model('customer', CustomerSchema);
