import configureMockStore from 'redux-mock-store'
import { userService } from '../services/user.service'
import { login } from '../store/user.actions'
import thunk from 'redux-thunk'

jest.mock('../services/user.service.js')

describe('login tests', () => {
    let mockStore, store


    const authUser = { username: 'Yaniv', password: 'Yaniv' }
    const mockUser = { username: 'Yaniv', fullname: 'Yaniv' }

    beforeEach(() => {
        const middlewares = [thunk];

        userService.login.mockReset()
        mockStore = configureMockStore(middlewares)
        store = mockStore({})
    })

    test('creates SET_USER when login success', async () => {

        userService.login.mockResolvedValue(mockUser)
        store.dispatch({ type: 'SET_USER', authUser })

        console.log('store after dispatch', store.getState())
        const action = store.getActions()[0]
        expect(action.type).toBe('SET_USER')
    })

})
