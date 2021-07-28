import axios from "axios";

export const urlUsers = `http://localhost:3000/users`;

export const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

export const URL = {
  search(searchTerm) {
    return instance.get(`search/${searchTerm}`);
  },
};
