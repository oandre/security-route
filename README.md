# Security Route #

This microu module should be used if you need a micro access blocking to your routes. To use this service you will need to have some code to:
* Use express in your project
* Create your session validation service
* Setup your project roles
* Create a simple way to retreive your users

### Basic usage ###

```javascript

var Router = require('security-route').Router;

module.exports = function(){

    /* 
    * app -> Express App
    * roleList -> array
    * sessionValidationService -> object
    * userManager -> object
    */

    Router = Router(app, roleList, sessionValidationService, userManager);

    Router.addRoute({
        verb: 'get',
        path: '/login',
        action: Controller.controllerAction,
        role: ['ROLE_ADMIN', 'ROLE_USER']
    });

//...

}
```

### Role List example ###

```javascript
module.exports = {
  default_role: "ANONYMOUS",
  roles: [
    'ANONYMOUS',
    'ROLE_USER',
    'ROLE_HR',
    'ROLE_CONSULTANT',
    'ROLE_ADMIN'
  ]
}
```