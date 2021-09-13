import { addGameAC, editReducer } from "./edit-reducer";

it("new item should be added", () => {
  const action = addGameAC({
    id: "3",
    category: ["All", "pc"],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXotC2b_aFY7mgoeghnnu60bmOB8fmOMTRtitEkQzJwE1kdOJsgzv-Hy6Wqktn7SAJwJA&usqp=CAU",
    title: "Grand Theft Auto V",
    price: "15",
    descr: "Microsoft no longer supports creating Games for Windows-LIVE accounts within Grand Theft Auto IV.",
    date: "Mo, 13 Apr 2015 21:00:00",
    genre: ["All", "Shooter"],
    age: ["All", "16"],
    rating: "2",
  });
  const state = {
    products: [],
    currentGameCard: null,
  };
  const newState = editReducer(state, action);
  expect(newState.products.length).toBe(1);
});
