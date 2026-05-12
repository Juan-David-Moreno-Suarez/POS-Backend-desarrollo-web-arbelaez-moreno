module.exports = (requiredRole) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'No autenticado' });
    }

    const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

    if (!requiredRoles.includes(req.user.role)) {
        return res.status(403).json({
            error: `Acceso prohibido. Se requiere uno de los siguientes roles: ${requiredRoles.join(', ')}.`
        });
    }
    next();
};