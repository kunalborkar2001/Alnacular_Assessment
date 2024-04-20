import axios from 'axios';
import { BASE_URL } from '../config.js';

// Function to fetch all users
let getAllContacts = async () => {
    try {
        let response = await axios.get(`${BASE_URL}/contacts`)
        return response
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to get all contacts")
    }
}

// Function to add a new user
let addContact = async (formData) => {
    try {
        let response = await axios.post(`${BASE_URL}/contacts`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return response

    } catch (error) {
        console.log(error);
        throw new Error("Failed to add Contact")
    }
}

let bulkAdd = async (bulkData) => {
    try {
        let response = await axios.post(`${BASE_URL}/contacts/bulk-upload`, bulkData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return response
    } catch (error) {
        console.log(error);
    }
}

// Function to delete a user
let deleteContact = async (id) => {
    try {
        let response = await axios.delete(`${BASE_URL}/contacts/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response

    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete Contact")
    }
}

// Function to update user data
let editContact = async (formData, id) => {
    try {
        let response = await axios.patch(`${BASE_URL}/contacts/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response

    } catch (error) {
        console.log(error);
        throw new Error("Failed to patch Contact")
    }
}

export {
    getAllContacts,
    addContact,
    deleteContact,
    editContact,
    bulkAdd
}