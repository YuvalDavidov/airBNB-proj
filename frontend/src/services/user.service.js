import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { socketService } from './socket.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const USER_KEY = 'userDB'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore,
    addToWishlist,
    removeFromWishlist

}

window.userService = userService


function getUsers() {
    // return storageService.query(USER_KEY)
    return httpService.get(`user`)
}



async function getById(userId) {
    // const user = await storageService.get(USER_KEY, userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    // return storageService.remove(USER_KEY, userId)
    return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    const user = await storageService.get(USER_KEY, _id)
    user.score = score
    await storageService.put(USER_KEY, user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    // const users = await storageService.query(USER_KEY)
    // const user = users.find(user => user.username === userCred.username)
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    userCred.wishlist = []
    if (!userCred.imgUrl) userCred.imgUrl = 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSgdMa3-zfBbsMOTEYwMDhWumoaLYOb4kbOBP9Mmwdt9AwdzYCaL0VS1zKzlKc5DnPoWUSfVA25uggiN0o'
    // const user = await storageService.post(USER_KEY, userCred)
    const user = await httpService.post('auth/signup', userCred)
    socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}

async function addToWishlist(stayId) {
    const user = await getById(getLoggedinUser()?._id)
    if (!user) throw new Error('Not loggedin')
    user.wishlist.push(stayId)
    // const savedUser = await storageService.put(USER_KEY, user)
    const savedUser = await httpService.put(`user/${user._id}`, user)
    saveLocalUser(savedUser)
    return savedUser
}

async function removeFromWishlist(stayId) {
    const user = await getById(getLoggedinUser()._id)
    const updatedWishlist = user.wishlist.filter(id => id !== stayId)
    user.wishlist = updatedWishlist
    const savedUser = await httpService.put(`user/${user._id}`, user)
    // const savedUser = await storageService.put(USER_KEY, user)
    saveLocalUser(savedUser)
    return savedUser
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, wishlist: user.wishlist }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',wishlist: [], isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123',wishlist: [], isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', wishlist: []})
// })()



