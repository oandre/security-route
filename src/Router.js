var AccessControl = require('./AccessControl');
var RoleManager = require('./RoleManager');

module.exports = function(router, roleList, sessionValidationService){

    var roleManager = new RoleManager(roleList);

    return {

        addRoute: function(params) {

            if (params.extra) {

                return router[params.verb](params.path, params.extra, [
                function(req, res, next) {
                    var accessControl = new AccessControl(roleManager, sessionValidationService);
                    accessControl.isAllowedRoute(req, res, next, params);
                },
                params.action
                ]);

            } else {

                return router[params.verb](params.path, [
                function(req, res, next) {
                    var accessControl = new AccessControl(roleManager, sessionValidationService);
                    accessControl.isAllowedRoute(req, res, next, params);
                },
                params.action
                ]);

            }

        },
        
        getRouter: function() {
            return router;
        }

    }

}