import Cookies from 'js-cookie'
import { jwtVerify } from 'jose'

export const setToken = (token) => Cookies.set('auth-token', token)

export const removeToken = () => {
    Cookies.remove('auth-token')
    window.location.href = '/login'
}

export const getToken = () => {
    try {
        const token = Cookies.get('auth-token')
        if (!token) return null

        return token
    } catch (error) {
        return null
    }
}

export const getUserId = async () => {
    try {
        const secret = import.meta.env.VITE_SECRET
        const token = getToken()
        if (!token) return null
        const user = await jwtVerify(token, new TextEncoder().encode(secret));

        return user
    } catch (err) {
        removeToken()
        return null
    }
}