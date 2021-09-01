import axios from "axios";
import { useState } from "react";

export function editGame(id: string | number, data: any): void {
  const gameTitle = data[0].title;
  const gameImg = data[1].img;
  const gamePrice = data[2].price;
  const gameDescr = data[3].descr;
  const gameGenres = data[4].genre;
  const gameCategory = data[4].category;
  const gameAge = data[5].age;
  axios.patch(`http://localhost:3000/product/${id}`, {
    title: gameTitle,
    img: gameImg,
    price: gamePrice,
    descr: gameDescr,
    genre: gameGenres,
    category: gameCategory,
    age: gameAge,
  });
}

export function deleteGameCard(id: string | number): void {
  axios.delete(`http://localhost:3000/product/{id}`);
}

export function getUserById(id: string | number) {
  const [data, setData] = useState([]);
  axios.get("http://localhost:3000/product").then((response) => setData(response.data));
  const gameData = data.filter((data) => data.key === id);
  return gameData;
}
