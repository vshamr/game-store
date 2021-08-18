import React from "react";

const ExsButton = ({ button, filter }) => {
  return (
    <div>
      {
        button.map((cat, i) => {
          return <button type="button" onChange={() => filter(cat)}>{cat}</button>
        })
      }
    </div>
  );
};

export default ExsButton;
