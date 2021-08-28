import axios from "axios";
import { useState } from "react";

export function editGame(id, data) {
  const name = data[0].gameName;
  const img = data[1].imgGame;
  const price = data[2].priceGame;
  const { description } = data[3];
  const genres = data[4].category;
  const { age } = data[5];
  const { XboxOne } = data[6].platform;
  const { Playstation5 } = data[6].platform;
  const { PC } = data[6].platform;
  axios.patch(`http://localhost:3000/NewGameData/${id}`, {
    title: name,
    imgGame: img,
    priceGame: price,
    discription: description,
    genres,
    age,
    platform: {
      XboxOne,
      Playstation5,
      PC,
    },
  });
}

export function deleteGameCard(id) {
  axios.delete(`http://localhost:3000/NewGameData/${  id}`)
}

export function getUserById(id) {
  const [data, setData] = useState([])
  axios.get("http://localhost:3000/NewGameData").then((response) => setData(response.data));
  const gameData = data.filter( data => data.key === id)
  return gameData
}
