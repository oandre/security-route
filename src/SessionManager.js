module.exports = function(sessionValidationService) {

  'use strict';

  return {

    validateSessionToken: function(accessToken, callback) {

        return new Promise(
            function(resolve, reject) {
                if (typeof sessionValidationService.authenticate == 'function') {
                    var errorMessage = {
                        type: "MISSING_METHOD",
                        message: "Session Validation Service must have an 'authenticate' method"
                    };
                    reject(errorMessage);
                } else {
                    sessionValidationService.authenticate(accessToken, function(error, response){
                        
                        if (error || response.type == "INVALID_SESSION") {
                            var errorMessage = {
                                type: "INVALID_SESSION",
                                message: "Informed session is invalid"
                            };
                            reject(errorMessage);
                        } else {
                            resolve(response);
                        }
                    });
                }
            }
        );
    }

  }

}