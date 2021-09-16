import axios from "axios";
import { Game } from "@/constants/interfaces";

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
    return instance.post(`/api/saveProfile`, { ...values });
  },
};

export const editPageAPI = {
  addGame(game: {}) {
    return instance.post(`games`, { game });
  },
  editGame(game: Game){
    return instance.put(`games`, { game: game } )
  },
  deleteGame(currentGameCard: any) {
    return instance.delete(`games/${currentGameCard.id}`)
  }
}

export const urlUsers = `http://localhost:3000/users`;
export const urlProducts = `http://localhost:3000/games`;
