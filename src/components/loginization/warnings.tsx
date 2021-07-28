import { useEffect } from "react";

type WarningsPropsType = {
  warning: string;
  setWarning: Function;
};

const Warnings = ({ warning, setWarning }: WarningsPropsType) => {
  useEffect(() => {
    setTimeout(() => {
      setWarning("");
    }, 1000);
  }, [warning]);

  return <>{warning && <div className="modal-warning">{warning}</div>}</>;
};

export default Warnings;
