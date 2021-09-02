import axios from "axios";

export const urlUsers = `http://localhost:3000/users`;
export const urlProducts = `http://localhost:3000/games`;
export const productAPI = `http://localhost:3000/product`;

export const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

export const usersAPI = {
  search(searchTerm) {
    return instance.get(`search/${searchTerm}`);
  },
  getProfile(values) {
    return instance.get(`api/getProfile/users`, { ...values });
  },
  changePassword(userId, password) {
    return instance.post(`api/changePassword/users/${userId}`, { password });
  },
  saveProfile(values) {
    return instance.post(`/api/saveProfile/users`, { ...values });
  },
};
