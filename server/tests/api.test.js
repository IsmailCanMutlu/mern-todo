import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app.js'
const api = supertest(app)
import { user } from '../models/userSchema'
import { initialUsers } from './testHelper.js'




describe('GET calls', () => {
    
    test('GET call', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    //GET user by id
    test('GET one', async () => {
        
        const users = await user.find({})
       
        const firstUser = users[0].toJSON()
        //get the result expecting success and JSON data
        const resuser = await
            api.get(`/api/users/${firstUser.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        //check if the user has the same id and the route works as expected
        expect(resuser.body.id).toEqual(firstuser.id)
    })
    test('check all users have ids', async () => {
        
        const users = await api.get('/api/users')
        //check that every user in our DB has the id property
        for(const user of users.body){
            expect(user.id).toBeDefined()
        }
    })
})


//POST
test('POST call', async () => {
    //build a new user
    const newuser = {
        description:"sent from Jest!",
        likes: 10
    }
    // send the user object to the DB through the API
    //expect a successful result
    await api
        .post('/api/users')
        .send(newuser)
        .expect(201)
    //get all the users in our DB
    const users = await user.find({})
    
    expect(users[users.length-1].description).toBe("sent from Jest!")
})


test('DELETE user', async () => {
    //get users and parse the one you want to delete to JSON
    const usersAtStart = await user.find({})
    const userToDelete = usersAtStart[0].toJSON()
    //delete the user by id
    await api
        .delete(`/api/users/${userToDelete.id}`)
        .expect(204)

    //get all users from the database again
    const usersNow = await user.find({})

    //check if the number of current users is one less than before
    expect(usersNow).toHaveLength(usersAtStart.length-1)
    
    const usersDescriptions = usersNow.map(i => i.toJSON().description)

    //expect the description from the deleted user to not be there
    expect(usersDescriptions).not.toContain(userToDelete.description)
})

//close the connection to the database
afterAll(() => mongoose.connection.close())