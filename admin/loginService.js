exports.login = function(password) {
    return password != undefined && password === process.env.MOMENTUM_ADMIN_PASSWORD
}