import { FaWindows, FaXbox, FaPlaystation } from "react-icons/fa";
import { SiNintendo, SiSega, SiUbisoft, SiXbox } from "react-icons/all";

export const FooterData = [
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

export const ProductsData = [
  {
    title: "Playstation",
    path: "/products/Playstation",
  },
  {
    title: "Xbox",
    path: "/products/Xbox",
  },
  {
    title: "PC",
    path: "/products/PC",
  },
];

export const CategoriesData = [
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
