import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/notes',
});

export const getAllNotes = async () => {
    const response = await api.get(`/`);
    return response.data;
}

export const createNote = async (note) => {
    const response = await api.post(`/`, note);
    return response.data;
}

export const updateNote = async (note) => {    
    const response = await api.patch(`/${note.id}`, note);
    return response.data;
}

export const deleteNote = async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
}