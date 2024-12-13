import { httpService } from "./http.service.js"

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials
}

async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        console.log('user FETCH:', user)
        if (user) {
            return _setLoggedinUser(user)
        } else {
            throw new Error('Invalid login')
        }
    } catch (err) {
        console.error('Login error:', err)
        throw err
    }
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    try {
        const response = await httpService.post(BASE_URL + 'signup', user)

        if (response) {
            return _setLoggedinUser(response)
        } else {
            throw new Error('Invalid signup')
        }
    } catch (err) {
        console.error('Signup error:', err)
        throw err
    }
}

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.error('Logout error:', err)
        throw err
    }
}

async function updateScore(diff) {
    const user = getLoggedinUser()
    if (user.score + diff < 0) {
        throw new Error('No credit')
    }
    try {
        await httpService.put('/api/user', { diff })
        user.score += diff
        _setLoggedinUser(user)
        return user.score
    } catch (err) {
        console.error('Error updating score:', err)
        throw err
    }
}


async function getById(userId) {
    try {
        const res = await axios.get(`/api/user/${userId}`)
        return res.data
    } catch (err) {
        console.error('Error fetching user by ID:', err)
        throw err
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})


