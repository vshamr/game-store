import { useSelector } from "react-redux";

import EditPage from "@/components/editPage/index";
import { getUserById } from "@/api/editGameCard";
import Modal from "@/components/modal";

function ModalEditItem(): JSX.Element {
  const id = useSelector((state) => state.editPage.value);
  const data = getUserById(id);

  const editModal = data.map((game) => (
    <Modal>
      <EditPage key={game.id} game={game} />{" "}
    </Modal>
  ));

  return <div>{editModal}</div>;
}

export default ModalEditItem;
