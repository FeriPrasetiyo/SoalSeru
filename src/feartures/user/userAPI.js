import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:3000/index',
});

export const loadUser = () => request.get('users', {params: {page: 1}});

export const addUser = (
  firstname,
  lastname,
  biodata,
  provinsi,
  kota,
  kelurahan,
  kecamatan,
) =>
  request.post('users', {
    firstname,
    lastname,
    biodata,
    provinsi,
    kota,
    kelurahan,
    kecamatan,
  });

export const updateUser = (id, name, phone) =>
  request.put(`users/${id}`, {name, phone});

export const removeUser = id => request.delete(`users/${id}`);

export const resendUser = id => request.delete(`users/${id}`);
