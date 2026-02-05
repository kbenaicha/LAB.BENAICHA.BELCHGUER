const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)

    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }

    // Save to DB
    // TODO check if user already exists
    db.hmset(user.username, userObj, (err, res) => {
      if (err) return callback(err, null)
      callback(null, res) // Return callback
    })
  },

  get: (username, callback) => {
    // Check parameters
    if (!username) {
      return callback(new Error("Wrong user parameters"), null)
    }

    // Read user from DB (Redis hash)
    db.hgetall(username, (err, res) => {
      if (err) return callback(err, null)

      // If user doesn't exist, Redis returns null
      if (!res) {
        return callback(new Error("User not found"), null)
      }

      // Rebuild full user object (include username)
      const userObj = {
        username: username,
        firstname: res.firstname,
        lastname: res.lastname
      }

      callback(null, userObj)
    })
  }
}
