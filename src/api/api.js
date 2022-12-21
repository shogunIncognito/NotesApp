import axios from 'axios';
import { getToken, getUserId } from '../helpers/auth';

const api = axios.create({
    baseURL: 'https://tasksramon-api.herokuapp.com/',
});

export const getAllNotes = async () => {
    try {
        const token = getToken()
        const { payload: { id } } = await getUserId()

        if (!token || !id) return []

        const response = await api.get(`notes/user/${id}`, {
            headers: {
                'auth-token': token,
            },
        });

        return response.data;
    } catch (error) {
        return []
    }
}

export const createNote = async (note) => {
    const token = getToken()
    if (!token) return null

    const { payload: { id } } = await getUserId()

    try {
        const response = await api.post(`notes`, { ...note, userId: id }, {
            headers: {
                'auth-token': token,
            }
        });

        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const updateNote = async (note) => {
    try {
        const token = getToken()
        if (!token) return null

        const response = await api.patch(`notes/${note.id}`, note, {
            headers: {
                'auth-token': getToken(),
            }
        });

        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const deleteNote = async (id) => {
    try {
        const token = getToken()
        if (!token) return null

        const response = await api.delete(`notes/${id}`, {
            headers: {
                'auth-token': getToken(),
            }
        });

        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const login = async (user) => {
    try {
        const response = await api.post(`auth/login`, user);

        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const register = async (user) => {
    const response = await api.post(`auth/signup`, user);

    return response.data;
}