import { FaWindows, FaXbox, FaPlaystation } from "react-icons/fa";
import { SiNintendo, SiSega, SiUbisoft, SiXbox } from "react-icons/all";
import GAME1_VALHALA from "../assets/images/GAME1_VALHALA.jpg";
import GAME3_WATCHDOGS from "../assets/images/GAME3_WATCHDOGS.jpg";
import GAME2_SPIDERMAN from "../assets/images/GAME2_SPIDERMAN.jpg";

export const CATEGORIES_DATA = [
  {
    id: "1",
    category: "pc",
    title: "PC",
    icon: FaWindows(),
  },
  {
    id: "2",
    category: "xbox",
    title: "Xbox",
    icon: FaXbox(),
  },
  {
    id: "3",
    category: "playstation",
    title: "Playstation",
    icon: FaPlaystation(),
  },
];

export const GAME_CARDS_DATA = [
  {
    img: GAME2_SPIDERMAN,
    title: "Marvel’s Spider-Man",
    price: "20 BYN",
    description:
      "Marvel's Spider-Man: Miles Morales is an action-adventure computer game developed by Insomniac Games ",
    genre: ["Fighting", "Shooter"],
    age: ["all", "6+"],
    category: ["playstation", "xbox"],
    rating: "5",
  },
  {
    img: GAME1_VALHALA,
    title: "Assassin's Creed® Valhalla",
    price: "60 BYN",
    description:
      "Assassin's Creed Valhalla is a 2020 action role-playing video game developed by Ubisoft Montreal and published by Ubisoft",
    genre: ["Racing", "Fighting"],
    age: ["all", "12+"],
    category: ["xbox"],
    rating: "2",
  },
  {
    img: GAME3_WATCHDOGS,
    title: "Watch Dogs: Legion",
    price: "90 BYN",
    description:
      "Watch Dogs: Legion is an Action-adventure computer game developed by Ubisoft Toronto and published by Ubisoft.",
    genre: ["Shooter", "Strategy"],
    age: ["all", "6+", "18+"],
    category: ["pc"],
    rating: "3",
  },
];

export const FOOTER_DATA = [
  {
    href: "https://www.xbox.com/en-US/games",
    img: SiXbox(),
  },
  {
    href: "https://www.ubisoft.com/ru-ru/",
    img: SiUbisoft(),
  },
  {
    href: "https://www.nintendo.ru/",
    img: SiNintendo(),
  },
  {
    href: "https://www.sega.com/",
    img: SiSega(),
  },
];
