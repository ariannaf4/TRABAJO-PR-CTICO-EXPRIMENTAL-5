const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function() {
      return this.provider === 'local';
    }
  },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  googleId: {
    type: String,
    sparse: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  }
}, {
  timestamps: true
});

// Encriptar contraseña antes de guardar - DESHABILITADO PARA TEXTO PLANO
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password') || !this.password) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// Comparar contraseña - VERSIÓN TEXTO PLANO
userSchema.methods.matchPassword = async function(enteredPassword) {
  return this.password === enteredPassword;
};

module.exports = mongoose.model('User', userSchema);
