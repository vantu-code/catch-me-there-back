const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  attending: [],
  organizing: [],
  whatsAppNumber: Number,
  photo: String,
  about: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
//{type: String, required: true}
// {type: Schema.Types.ObjectId, ref:'Event'}
// [{type: Schema.Types.ObjectId, ref:'Event'}]