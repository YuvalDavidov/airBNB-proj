import { userService } from "../services/user.service.js";
import { store } from '../store/store.js'

import { showErrorMsg } from '../services/event-bus.service.js'
import { LOADING_DONE, LOADING_START } from "./system.reducer.js";
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER, SET_IS_MODAL_OPEN, SET_IS_SIGNUP } from "./user.reducer.js";

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
    }
}

export async function addToWishlist(stayId) {
    try {
        const user = await userService.addToWishlist(stayId)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        throw err
    }
}

export async function removeFromWishlist(stayId) {
    try {
        const user = await userService.removeFromWishlist(stayId)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        throw err
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
    } catch (err) {
        throw err
    }
}

export function setIsModalOpen(isModalOpen) {
    store.dispatch({ type: SET_IS_MODAL_OPEN, isModalOpen })
}

export function setIsSignup(isSignup) {
    store.dispatch({ type: SET_IS_SIGNUP, isSignup })
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId);
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
    }
}