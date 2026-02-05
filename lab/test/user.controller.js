const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    // it('avoid creating an existing user', (done)=> {
    //   // TODO create this test
    //   // Warning: the user already exists
    //   done()
    // })
  })

  // TODO Create test for the get method
  describe('Get', () => {

    it('get a user by username', (done) => {
      // 1) First, create a user (this test must be independent)
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }

      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')

        // 2) Then, try to get the same user
        userController.get('sergkudinov', (err2, result2) => {
          expect(err2).to.be.equal(null)
          expect(result2).to.not.be.equal(null)

          // If Redis stores JSON, result2 is a string => parse it
          const parsed = (typeof result2 === 'string') ? JSON.parse(result2) : result2
          expect(parsed).to.deep.equal(user)

          done()
        })
      })
    })

    it('cannot get a user when it does not exist', (done) => {
      userController.get('unknown_user', (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

  })
})
