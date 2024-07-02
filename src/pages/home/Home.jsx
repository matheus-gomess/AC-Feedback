import React from "react";
import { Container, Heading, Button, Text } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import {
  formatUserFeedbacks,
  formatUserFeedbacksCreated,
} from "../../utils/format-avaliations";
import SubmittedAvaliation from "../rate/components/printingAvaliations";
import { useNavigate } from "react-router-dom";
import { createUser } from "services/users";
import { toast } from "react-toastify";

export default function Home() {
  const user = localStorage.getItem("user");
  const verifyAdm = localStorage.getItem("isAdmin") === "true";
  const avaliations = JSON.parse(localStorage.getItem("avaliations") || "[]");
  const userAvaliations = formatUserFeedbacks(avaliations, user);
  const userAvaliationsCreated = formatUserFeedbacksCreated(avaliations, user);

  const nav = useNavigate();

  const saveUser = async () => {
    const user = {
      email: "teste123@example.com",
      name: "Teste User",
      userType: "PARTICIPANT",
    };

    try {
      const response = await createUser({ user: user });
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      style={{
        height: "inherit",
        color: "white",
        backgroundColor: "1c222b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onClick={saveUser}>Test User</Button>
      {verifyAdm ? (
        <Container width="300px" textAlign="center">
          <Text color="#838c90">
            <strong>
              Você está em uma conta administradora, nela, é possível fazer
              alterações nos formulários e visualizar todas as avaliações
              armazenadas
            </strong>
          </Text>
        </Container>
      ) : (
        <>
          {userAvaliationsCreated && userAvaliationsCreated.length > 0 ? (
            <Container
              bg="#1c222b"
              maxH="300px"
              borderRadius="20px"
              padding="0px"
              pos="relative"
              bottom="50"
            >
              <Container
                bgColor="#700e17"
                padding="5px"
                minW="100%"
                borderTopRadius="10px"
                borderBottomRadius="4px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading color="white">Últimas avaliações criadas:</Heading>
              </Container>
              <Container padding="8px">
                <Container
                  className="scrollbar"
                  padding="10px"
                  paddingTop="15px"
                  maxW="100%"
                  maxH="306px"
                  overflow="hidden"
                  overflowY="auto"
                >
                  <SubmittedAvaliation avaliations={userAvaliationsCreated} />
                  <Button
                    marginLeft="14px"
                    bgColor="#700e17"
                    color="white"
                    _active={{ bgColor: "#520a11" }}
                    _hover={{}}
                    onClick={() => {
                      nav("/home/feedbacks");
                    }}
                  >
                    Ver mais
                  </Button>
                </Container>
              </Container>
            </Container>
          ) : (
            <Container>
              <Heading color="grey">Nenhuma avaliação criada</Heading>
            </Container>
          )}

          {userAvaliations && userAvaliations.length > 0 ? (
            <Container
              bg="#1c222b"
              maxH="300px"
              borderRadius="20px"
              padding="0px"
              pos="relative"
              bottom="50"
            >
              <Container
                bgColor="#700e17"
                padding="5px"
                minW="100%"
                borderTopRadius="10px"
                borderBottomRadius="4px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading color="white">Últimas avaliações recebidas:</Heading>
              </Container>
              <Container padding="8px">
                <Container
                  className="scrollbar"
                  padding="10px"
                  paddingTop="15px"
                  maxW="100%"
                  maxH="306px"
                  overflow="hidden"
                  overflowY="auto"
                >
                  <SubmittedAvaliation avaliations={userAvaliations} />
                  <Button
                    marginLeft="14px"
                    bgColor="#700e17"
                    color="white"
                    _hover={{}}
                    _active={{ bgColor: "#520a11" }}
                    onClick={() => {
                      nav("/home/feedbacks");
                    }}
                  >
                    Ver mais
                  </Button>
                </Container>
              </Container>
            </Container>
          ) : (
            <Container>
              <Heading color="grey">
                Nenhuma avaliação recebida por enquanto
              </Heading>
            </Container>
          )}
        </>
      )}
    </div>
  );
}
