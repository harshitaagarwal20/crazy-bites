import db from '../models/index.js';
const { Role, Permission } = db;

export const checkPermission = (action, resource) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      const role = await Role.findOne({
        where: { roleUId: user.roleId },
        include: {
          model: Permission,
          as: 'permissions',
          attributes: ['action', 'resource'],
          through: { attributes: [] },
        },
      });

      if (!role || !role.permissions ) {
        return res.status(403).json({ message: 'Access Denied: No permissions found' });
      }

      const hasPermission = role.permissions.some(
        (p) =>
          p.action.trim().toLowerCase() === action.toLowerCase() &&
          p.resource.trim().toLowerCase() === resource.toLowerCase()
      );

      if (!hasPermission) {
        return res.status(403).json({ message: 'Access Denied: Permission not allowed' });
      }

      next();
    } catch (err) {
      console.error('Permission Middleware Error:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
