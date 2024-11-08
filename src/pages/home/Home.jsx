import React, { useCallback, useEffect, useState } from "react";
import { Container, Heading, Button, Text } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import SubmittedAvaliation from "../rate/components/submittedAvaliations";
import { useNavigate } from "react-router-dom";
import { getAddedFeedbacks, getReceivedFeedbacks } from "services/feedbacks";
import PrincipalSpinner from "components/Spinner";
import { printQuestionSet } from "services/questionsSet";
import { getUser } from "storage/get-user";

export default function Home() {
  const nav = useNavigate();
  const user = getUser();
  const verifyAdm = user?.role === "ADMIN";
  const [loading, setLoading] = useState(true);
  const [questionSets, setQuestionSets] = useState([]);
  const [avaliationsAdded, setAvaliationsAdded] = useState();
  const [avaliationsReceived, setAvaliationsReceived] = useState();

  const fetchFeedbacks = useCallback(async () => {
    try {
      const groups = await printQuestionSet();
      const responseAdded = await getAddedFeedbacks(user.name);
      const responseReceived = await getReceivedFeedbacks(user.name);
      setQuestionSets(groups);
      setAvaliationsAdded(responseAdded.addedFeedbacks);
      setAvaliationsReceived(responseReceived.receivedFeedbacks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user.name]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return (
    <div
      style={{
        height: "inherit",
        color: "white",
        display: "flex",
        minHeight: "90vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
          {loading ? (
            <Container
              minHeight="320px"
              maxH="300px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              bottom="50"
            >
              <PrincipalSpinner />
            </Container>
          ) : avaliationsAdded && avaliationsAdded.length > 0 ? (
            <Container
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
                <Heading color="white">Última avaliação criada:</Heading>
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
                  <SubmittedAvaliation
                    avaliations={avaliationsAdded}
                    questionSets={questionSets}
                  />
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

          {loading ? (
            <Container
              minHeight="320px"
              maxH="300px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              bottom="50"
            >
              <PrincipalSpinner />
            </Container>
          ) : avaliationsReceived && avaliationsReceived.length > 0 ? (
            <Container
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
                <Heading color="white">Última avaliação recebida:</Heading>
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
                  <SubmittedAvaliation
                    avaliations={avaliationsReceived}
                    questionSets={questionSets}
                  />
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
