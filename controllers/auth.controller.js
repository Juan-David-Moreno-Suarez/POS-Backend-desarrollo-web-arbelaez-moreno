const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'username, email y password son requeridos' });
    }

    const existente = await Usuario.findOne({ where: { email } });
    if (existente) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    const usuario = await Usuario.create({ username, email, password, role: 'USER' });

    const token = jwt.sign(
      { sub: usuario.id, username: usuario.username, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.status(201).json({
      message: 'Usuario creado',
      user: { id: usuario.id, username: usuario.username, role: usuario.role },
      token,
      token_type: 'bearer',
    });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'username y password son requeridos' });
    }

    const user = await Usuario.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { sub: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({
      token,
      token_type: 'bearer',
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) { next(err); }
};

exports.me = async (req, res) => {
  // req.user fue inyectado por el middleware authJwt
  res.json(req.user);
};
