"use strict"
const bcrypt = require("bcrypt")


module.exports = (sequelize, DataTypes) => {
    //user object
    const user = sequelize.define("user", {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: "invalid email address"
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1,99],
                    msg: "name bust be between 1-99 characters"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: { 
                len: {
                    args: [8, 99],
                    msg: "password is wrong length"
                }
                
            }
        }
    }, {
        hooks: {
            beforeCreate: function(createdUser, options) {
                if (createdUser && createdUser.password) {
                    let hash = bcrypt.hashSync(createdUser.password, 12)
                    createdUser.password = hash 
                }
            }
            // lol
        }
    })
    user.associate = function(models) {
        //any user associations
    }  
    //validate password def to validate password at user login
    user.prototype.validPassword = function(passwordTyped) {
        return bcrypt.compareSync(passwordTyped, this.password)
    }
    // remove password before any serialization of user object 
    user.prototype.toJSON = function() {
        let userData = this.get()
        delete userData.password
        return userData
    }

    return user;
}