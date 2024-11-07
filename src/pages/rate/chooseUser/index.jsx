import { Button } from "@chakra-ui/react";
import { useState } from "react";
import RatingModal from "./components/rating-modal";
import { useNavigate } from "react-router-dom";

export default function RateChooseUser() {
  const nav = useNavigate();
  const [openRatingModal, setOpenRatingModal] = useState(false);

  const handleChangeRoute = (param) => {
    nav(`/rate-participant/${param}`);
  }

  //Função controlando a fechura do modal de escolha de participante
  const handleClose = () => {
    setOpenRatingModal(false);
  }

  return (
    <>
      <div style={{
        height: "inherit",
        display: "flex",
        minHeight: "90vh",
        justifyContent: "center",
        alignItems: "center",
      }}>

        <RatingModal handleClose={handleClose} isOpen={openRatingModal} handleClick={handleChangeRoute} />
        <h1>
          <Button variant="outline" borderColor="#700e17" onClick={() => setOpenRatingModal(true)}>Iniciar avaliação</Button>
        </h1>
      </div>
    </>
  );
};