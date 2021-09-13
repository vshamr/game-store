import renderer from "react-test-renderer";
import Loader from "./index";

it("should render loader component", () => {
  const tree = renderer.create(<Loader />).toJSON();
  expect(tree).toMatchSnapshot();
});
