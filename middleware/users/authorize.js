const authorize =
  (roles = ["admin", "user"]) =>
  (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }

    return next("Unauthorize user.");
  };

module.exports = authorize;