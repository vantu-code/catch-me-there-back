const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  // attending: {type: Schema.Types.ObjectId, ref:'Event'},
  // organizing: {type: Schema.Types.ObjectId, ref:'Event'},
  whatsAppNumber: Number,
  photo: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
//{type: String, required: true}