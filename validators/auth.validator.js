const { body, validationResult } = require('express-validator');

const validarResultados = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      mensaje: 'Errores de validación',
      errores: errors.array()
    });
  }
  next();
};

const registro = [
  body('username')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser texto')
    .isLength({ min: 3, max: 64 }).withMessage('El nombre debe tener entre 3 y 64 caracteres')
    .trim(),

  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail()
    .trim(),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('La contraseña debe contener al menos una mayúscula, una minúscula y un número')
    .trim(),

  body('role')
    .optional()
    .isIn(['admin', 'vendedor', 'usuario']).withMessage('Rol no válido (admin, vendedor, usuario)'),

  validarResultados
];

const login = [
  body('username')
    .notEmpty().withMessage('El username es obligatorio')
    .isString().withMessage('El username debe ser texto')
    .trim(),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),

  validarResultados
];

const actualizarPerfil = [
  body('username')
    .optional()
    .isString().withMessage('El nombre debe ser texto')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .trim(),

  body('email')
    .optional()
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail()
    .trim(),

  body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('La contraseña debe contener al menos una mayúscula, una minúscula y un número')
    .trim(),

  validarResultados
];

module.exports = {
  registro,
  login,
  actualizarPerfil
};