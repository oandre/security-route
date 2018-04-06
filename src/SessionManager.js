module.exports = function(sessionValidationService) {

  'use strict';

  return {

    validateSessionToken: function(accessToken, callback) {

        return new Promise(
            function(resolve, reject) {
                if (typeof sessionValidationService.authenticate != 'function') {
                    var errorMessage = {
                        type: "MISSING_METHOD",
                        message: "Session Validation Service must have an 'authenticate' method"
                    };
                    reject(errorMessage);
                } else {
                    sessionValidationService.authenticate(accessToken)
                    .then(function(response){
                        resolve(response);
                    })
                    .catch(function(error){
                        var errorMessage = {
                            type: "INVALID_SESSION",
                            message: "Informed session is invalid",
                            stack_trace: error.toString()
                        };
                        reject(errorMessage);
                    });
                }
            }
        );
    }

  }

}