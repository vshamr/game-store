import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

export const usersAPI = {
  getProfile(values: {}) {
    return instance.get(`api/getProfile/users`, { ...values });
  },
  changePassword(userId: string | null, password: any) {
    return instance.post(`api/changePassword/users/${userId}`, { password });
  },
  saveProfile(values: {}) {
    return instance.post(`/api/saveProfile/users`, { ...values });
  },
};

export const editPageAPI = {
  addGame(game: {}) {
    return instance.post(`users`, {game})
  }
}

export const urlUsers = `http://localhost:3000/users`;
export const urlProducts = `http://localhost:3000/games`;
