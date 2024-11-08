import { useState } from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import AlertExitPage from "./AlertExitPage";

export default function ButtonPages({ title, navigate, isActualRoute }) {
  const nav = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { colorMode } = useColorMode();


  const navNewPage = () => {
    if (matchPath("/rate-participant/:participant", location.pathname)) {
      setIsModalOpen(true);
    } else {
      nav(navigate);
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    nav(navigate);
  }

  return (
    <>
      <Button
        bg="transparent"
        onClick={navNewPage}
        _hover={{}}
        _active={{ bg: "rgba(0, 0, 0, 0.2)" }}
        css={{
          color: isActualRoute ? "#700e17" : colorMode === "dark" ? "white" : "#1a202c",
          textTransform: "uppercase",
          padding: "0px",
          fontSize: "14pt",
          fontWeight: "700",
          "&:hover::after": {
            width: isActualRoute ? "0%" : "110%",
          },
          "&::after": {
            content: '" "',
            width: "0%",
            height: "4px",
            backgroundColor: "#700e17",
            position: "absolute",
            bottom: "4px",
            left: "0px",
            transition: "0.3s ease-in-out",
          },
        }}
      >
        {title}
      </Button>
      {isModalOpen && (
        <AlertExitPage
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onClickConfirm={handleModalConfirm}
          onClickClose={handleModalClose}
        />
      )}
    </>
  );
}
