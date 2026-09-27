const jwt = require('jsonwebtoken');
const redis = require('redis');

// setup redis 
const redisClient = redis.createClient(process.env.REDIS_URI);

// higher order function that returns a function
// const handleSignin = (db, bcrypt) => (req, res) => {
const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => Promise.reject('unable to get user'))
      } else {
        Promise.reject('wrong credentials')
      }
    })
    .catch(err => Promise.reject('wrong credentials'))
}

const getAuthTokenId = (req, res) => {
  const { authorization  } = req.headers;
  return redisClient.get(authorization, (error, reply) => {
    if(error || !reply) {
      return res.status(400).json('Unauthorized');
    }
    return res.json({id: reply})
  })
}

const signToken = (email) => {
  const jwtPayload = { email }; // might want to use id instead
  return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' }); // JWT_secret should be environment variable 
}

const setToken = (key, value) => {
  // setting token to key and the id as the value
  return Promise.resolve(redisClient.set(key, value));
}

const createSessions = (user) => {
  // JWT token, return user data 
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => { 
      return { success: 'true', userId: id, token }
    })
    .catch(console.log)
}

const signInAuthentication = (db, bcrypt) => (req, res) =>{
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId(req, res) : 
  handleSignin(db, bcrypt, req, res)
    .then(data => {
      return data.id && data.email ? createSessions(data) : Promise.reject(data) // for debugging should be error message 
    })
    .then(session => res.json(session))
    .catch(err => res.status(400).json(err))
}

module.exports = {
  signInAuthentication: signInAuthentication
}
