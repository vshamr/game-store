import { useEffect, useState } from "react";
import axios from "axios";

enum ParamsGenres {
  ALL = "All",
  RACING = "Racing",
  FIGHTING = "Fighting",
  SHOOTER = "Shooter",
  STRATEGY = "Strategy",
}

enum ParamsAges {
  ALL = "all",
  SIX = "6+",
  TWELVE = "12+",
  SIXTEEN = "16+",
  EIGHTEEN = "18+",
}

enum ParamsCategory {
  ALL = "all",
  PC = "pc",
  XBOX = "xbox",
  PLAYSTATION = "playstation",
}

const Filter: React.FC = ({ button, filterBtn }) => {
  const [filter, setFilter] = useState<ParamsGenres>(ParamsGenres.ALL);
  const [ages, setAges] = useState<ParamsAges>(ParamsAges.ALL);
  const [category, setCategory] = useState<ParamsCategory>(ParamsCategory.ALL);
  const [searchingText, setSearchingText] = useState("");
  const [games, setGames] = useState([]);

  useEffect(() => {
    (async () => {
      let location = "http://localhost:3000/games?";

      if (filter !== ParamsGenres.ALL) {
        location += `genre_like=${filter}`;
      } else if (ages !== ParamsAges.ALL) {
        location = location === "http://localhost:3000/games?" ? `age_like=${ages}` : `&&age_like=${ages}`;
      } else if (category !== ParamsCategory.ALL) {
        location =
          location === "http://localhost:3000/games?" ? `category_like=${category}` : `&&category_like=${category}`;
      } else if (searchingText) {
        location =
          location === "http://localhost:3000/games?" ? `title_like=${searchingText}` : `&&title_like=${searchingText}`;
      }

      const newGames = await axios.get(location);
      setGames(newGames.data);
    })();
  }, [filter, ages, searchingText]);

  return (
    <div>
      {
        button.map((cat, i) => {
          return <button type="button" onChange={() => filterBtn(cat)}>{cat}</button>;
        })
      }
    </div>
  );
};

export default Filter;
