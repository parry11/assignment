import axios from "axios";
import { API_BASE_URL } from "../config/Common";

/**
 * Get contact list data from Db
 * @returns response
 */
export const getAllContactsQuery = () => {
  return axios
    .get(`${API_BASE_URL}/getAllContacts`)
    .then((response) => response)
    .catch((error) => error);
};

/**
 * Add contact detail
 * @returns response
 */
export const createContactQuery = (params) => {
  return axios
    .post(`${API_BASE_URL}/createContact`, params)
    .then((response) => response)
    .catch((error) => error);
};

/**
 * Delete contact
 * @returns response
 */
export const deleteContactQuery = (id) => {
  return axios
    .delete(`${API_BASE_URL}/deleteContact/${id}`)
    .then((response) => response)
    .catch((error) => error);
};

/**
 * Update contact
 * @returns response
 */
export const updateContactQuery = (id, params) => {
  return axios
    .post(`${API_BASE_URL}/updateContact/${id}`, params)
    .then((response) => response)
    .catch((error) => error);
};

/**
 * Get contact detail from Db
 * @returns response
 */
export const getContactDetailQuery = (id) => {
  return axios
    .get(`${API_BASE_URL}/getContactDetail/${id}`)
    .then((response) => response)
    .catch((error) => error);
};
