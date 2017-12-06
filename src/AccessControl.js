var SessionManager = require('./SessionManager');

module.exports = function(roleManager, sessionValidationService) {

  var isDefautRolelAllowed = function(roleList){
    if(roleList.indexOf(roleManager.getDefaultRole()) === -1) {
      return false;
    }

    return true;
  }

  return {
    isAllowedRoute: function(req, res, next, params){
      
      if (isDefautRolelAllowed(params.role)) {
        return next();
      }

      if (!isDefautRolelAllowed(params.role) && !req.headers.authorization) {
        var errorMessage = {
          type: "MISSING_PARAMETER_ERROR",
          message: "Missing access token"
        };
        res.status(403).json(errorMessage);
        return res.end();
      } else {

        var session = new SessionManager(sessionValidationService);

        session.validateSessionToken(req.headers.authorization)
        .then(function(userData){

          if (params.role.indexOf(userData.role) === -1) {
            var errorMessage = {
              type: "NOT_ALLOWED_ROUTE",
              message: "You don't have access to this route"
            };
            res.status(403).json(errorMessage);
            return res.end();
          } else {
            return next();
          }

        })
        .catch(function(sessionError){
          res.status(403).json(sessionError);
          return res.end();
        });

      }

    }
  }

}