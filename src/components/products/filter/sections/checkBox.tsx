import { Checkbox, Collapse } from "antd";
import { useState } from "react";

/*const { Panel } = Collapse;*/

const filterGenre = [
  {
    "_id": 1,
    "name": "Fighting"
  },
  {
    "_id": 2,
    "name": "Shooter"
  },
  {
    "_id": 3,
    "name": "Racing"
  },
  {
    "_id": 4,
    "name": "Strategy"
  },
  {
    "_id": 5,
    "name": "All"
  }
];

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    filterGenre.map((value, index) => (
      <>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          type="checkbox"
          checked={Checked.indexOf(value._id) !== -1}
        />
        <span>{value.name}</span>
      </>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        {renderCheckboxLists()}
      </Collapse>
    </div>
  );
}

export default CheckBox;
