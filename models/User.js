const { hashSync, compareSync } = require("bcryptjs");
const dbConnection = require("../database/config");
const { userSchema, loginSchema } = require("../validators/user");
require('dotenv').config()

class User {
    constructor(userData) {
        this.userData = userData;
    }

    save() {
        return new Promise((resolve, reject) => {
            const hashedPassword = hashSync(this.userData.password);
            this.userData.password = hashedPassword;

            dbConnection('users')
                .then(async (users) => {
                    const { insertedId } = await users.insertOne(this.userData);
                    resolve({
                        status: true,
                        data: {
                            ...this.userData,
                            _id: insertedId
                        }
                    })
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    isExist() {
        return new Promise((resolve, reject) => {
            dbConnection('users')
                .then(async (users) => {
                    const user = await users.findOne({
                        '$or': [
                            { email: this.userData.email },
                            { username: this.userData.username }
                        ]
                    })

                    if (!user) {
                        return resolve({ isExist: false });
                    }

                    if (user.email === this.userData.email) {
                        return resolve({
                            isExist: true,
                            message: 'email already used'
                        });
                    }

                    if (user.username === this.userData.username) {
                        return resolve({
                            isExist: true,
                            message: 'username already used'
                        });
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    static validate(userData) {
        const result = userSchema.validate(userData);
        if (result.error) {
            return {
                isValid: false,
                message: result.error.message
            }
        } else {
            return {
                isValid: true,
            }
        }
    }

    static login(loginData) {
        return new Promise((resolve, reject) => {
            try {
                const validation = loginSchema.validate(loginData);
                if (validation.error) {
                    return resolve({
                        status: false,
                        code: 400,
                        message: validation.error.message
                    })
                }

                dbConnection('users')
                    .then(async (users) => {
                        const user = await users.findOne({ username: loginData.username });

                        if (!user) {
                            return resolve({
                                status: false,
                                code: 401,
                                message: "Login failed"
                            })
                        }

                        if (compareSync(loginData.password, user.password)) {
                            return resolve({
                                status: true,
                                data: user
                            })
                        } else {
                            return resolve({
                                status: false,
                                code: 401,
                                message: "Login failed"
                            })
                        }
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = User