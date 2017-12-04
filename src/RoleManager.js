module.exports = function(roleList) {

    const roles = {
        default_role: roleList.defaultRole,
        roles: roleList.roles
    };

    return {
        
        setDefaultRole: function(defaultRole) {

            if (typeof defaultRole == "String") {
                roles.default_role = defaultRole;
            } else {
                console.log("Problem to set default role. It must be a string");
            }

        },

        setRoles: function(roleList) {

            if (Array.isArray(roleList)) {
                roles.roles = roleList;
            } else {
                console.log("Problem to set default role. It must be a string");
            }

        },

        getDefaultRole: function() {
            return roles.default_role;
        },

        getRoles: function() {
            return roles;
        }

    }

}