import { useSelector } from "react-redux";

import EditPage from "@/components/editPage/index";
import { getUserById } from "@/api/editGameCard";

function ModalEditItem(): JSX.Element {
  const id = useSelector((state) => state.editPage.value);
  const data = getUserById(id);

  const editModal = data.map((data) => <EditPage key={data.key} data={data} />);

  return <div className="wrapper-modal-window">{editModal}</div>;
}

export default ModalEditItem;
