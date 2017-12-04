module.exports = function(sessionValidationService, userManager) {

  'use strict';

  return {

    validateSessionToken: function(accessToken, callback) {

        sessionValidationService.authenticate(accessToken, function(error, response){

            if (error) {
                var errorMessage = {
                  type: "INVALID_SESSION",
                  message: "Informed session is invalid"
                };
                return callback(errorMessage, false);
            } else {

                if (response.type == "INVALID_SESSION") {
                    var errorMessage = {
                        type: "INVALID_SESSION",
                        message: "Informed session is invalid"
                    };
                    return callback(errorMessage, false);
                } else {

                    userManager.findUserByToken(response.data.user_token, function(err, user){
                    if (user === null) {
                        var errorMessage = {
                        type: "INVALID_SESSION",
                        message: "Informed session is invalid"
                        };
                        return callback(errorMessage, false);
                    } else {
                        return callback(false, user);
                    }
                    });
                    
                }

            }

        });
    }

  }

}