import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Spinner, Text, useColorMode } from "@chakra-ui/react";
import AlternanceTheme from "components/AlternanceTheme";
import Inputs from "pages/login/components/Inputs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "services/users";
import { APIformattingName, formattingName } from "utils/formattingTexts";

export default function Register() {
  const nav = useNavigate();
  const { colorMode } = useColorMode();
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [valueName, setValueName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const user = {
    email: valueEmail,
    password: valuePassword,
    name: APIformattingName(valueName)
  };

  const handleRegisterUser = async () => {
    setLoading(true);
    try {
      await registerUser({ user: user });
      nav("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      toast.success("Usuário " + formattingName(user.name) + " criado com sucesso!")
    }
  };

  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="100vw"
      h="90vh"
    >
      <Container
        bg={colorMode === "dark" ? "white" : "#1a202c"}
        maxH="500px"
        maxW="500px"
        padding="50px"
        borderRadius="10px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box
          position="absolute"
          color={colorMode === "dark" ? "#1a202c" : "white"}
          textDecoration="underline"
          _hover={{ cursor: "pointer", color: "#971520" }}
          onClick={() => nav("/")}
          transition="color 0.2s ease-in-out"
          top="230px"
          left="735px"
        >
          <ArrowBackIcon /><strong>Voltar</strong>
        </Box>
        <Container display="flex" flexDir="column" textAlign="center">
          <Text color={colorMode === "dark" ? "#1a202c" : "white"} fontWeight="bold" fontSize="2rem">
            Registrar
          </Text>
          <Text color={colorMode === "dark" ? "#1a202c" : "white"}>
            Insira os dados da sua conta para realizar o cadastro
          </Text>
        </Container>
        <Container
          padding="0px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="10px"
        >
          <Inputs
            title="Nome"
            placeholder="Nome do colaborador"
            type="text"
            value={valueName}
            onChange={(event) => {
              setValueName(event.target.value);
            }}
          />
          <Inputs
            title="Email"
            type="email"
            placeholder="nome.sobrenome@acdigital.com.br"
            value={valueEmail}
            onChange={(event) => {
              setValueEmail(event.target.value);
            }}
          />
          <Inputs
            type="password"
            title="Senha"
            placeholder="Senha"
            value={valuePassword}
            onChange={(event) => {
              setValuePassword(event.target.value);
            }}
          />

          <Container
            padding="0px"
            marginBottom="20px"
            display="flex"
            flexDirection="column"
            w="100%"
            alignItems="center"
          >
            <Button
              isDisabled={!(valueEmail && valuePassword && valueName)}
              width="100%"
              onClick={handleRegisterUser}
              bg="#971520"
              color="white"
              _hover={{ bg: "#750d16", color: "#ffffff" }}
              isLoading={isLoading}
            >
              {isLoading ? (
                <Spinner marginLeft="20px" color="white" size="sm" />
              ) : (
                "Registrar"
              )}
            </Button>
          </Container>
        </Container>
      </Container>
      <AlternanceTheme />
    </Container>
  );
}
