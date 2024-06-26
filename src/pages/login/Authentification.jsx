import { useNavigate } from "react-router-dom";
import { Container, Text, Image, Button } from "@chakra-ui/react";
import Inputs from "./components/Inputs";
import BackgroundImage from "../../assets/backgroundlogo.png";
import Banner from "../../assets/bannerlogo.png";
import { useState } from "react";

export default function Autentificacao() {
  const navigate = useNavigate();
  const [valueUser, setValueUser] = useState("");

  const modValueUser = (event) => {
    const newValueUser = event.target.value;
    setValueUser(newValueUser);
  };

  const normalizeName = (str) => {
    const nameWithoutDiacritics = str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const formattedName = nameWithoutDiacritics
      .trim()
      .toLowerCase()
      .replace(/ /g, "-");
    return formattedName;
  };

  const handleClick = () => {
    navigate("/home");
    const formattedName = normalizeName(valueUser);

    localStorage.setItem("user", formattedName);
    localStorage.setItem("isAdmin", formattedName === "admin");
  };

  return (
    <div
      className="body"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        bg="#ffffff"
        minW="320px"
        minH="338px"
        maxW="440px"
        padding="44px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Container
          display="flex"
          justifyContent="space-between"
          padding="0px"
          paddingBottom="40px"
          alignItems="center"
        >
          <Image src={Banner} maxH="36px" />
          <Text fontSize="1.2rem">Entrar em AC Feedbacks</Text>
        </Container>
        <Container padding="0px">
          <Inputs
            title="Email"
            placeholder="nome.sobrenome@acdigital.com.br"
            value={valueUser}
            onChange={modValueUser}
          />
          <Inputs type="password" title="Senha" placeholder="Senha" />
          {valueUser === "" ? (
            <Button isDisabled marginBottom="20px" bg="transparent">
              Entrar
            </Button>
          ) : (
            <Button
              onClick={handleClick}
              marginBottom="20px"
              bg="transparent"
              _hover={{ bg: "#2758c0", color: "#ffffff" }}
            >
              Entrar
            </Button>
          )}
        </Container>
        <Container padding="0px">
          <Text>#euACredito</Text>
        </Container>
      </Container>
    </div>
  );
}
