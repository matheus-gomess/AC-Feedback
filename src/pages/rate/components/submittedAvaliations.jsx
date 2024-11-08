import { useState } from "react";
import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Container, Heading, Button, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { ViewIcon, CalendarIcon } from "@chakra-ui/icons";
import { formattingName } from "utils/formattingTexts";
import { useLocation } from "react-router-dom";
import SeeMoreAvaliation from "./seeMoreAvaliation";

export default function SubmittedAvaliation({ avaliations, questionSets }) {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvaliation, setSelectedAvaliation] = useState(null);
  const [questionSetSelected, setQuestionSetSelected] = useState();
  const bgColor = useColorModeValue("#ffffff", "#1a202c");
  const textColor = useColorModeValue("#1a202c", "#ffffff");

  const checkIfIsHomeScreen = () => {
    return location.pathname === "/home";
  };

  const getLastRating = () => {
    return avaliations[0];
  };

  //Fazendo a média das notas
  const getAverageRating = (numbersArray) => {
    const average =
      numbersArray?.reduce((acc, val) => acc + val, 0) / numbersArray?.length;
    return parseFloat(average.toFixed(1));
  };

  //Filtrando apenas questões com rating
  const filterValidRatings = (questions) => {
    return questions?.filter((question) => typeof question.rating === "number")
      .map((question) => parseFloat(question.rating));
  };

  //Controlando a abertura e fechura do modal
  const handleOpenModal = (avaliation, questionSetSelected) => {
    setIsModalOpen(true);
    setSelectedAvaliation(avaliation);
    setQuestionSetSelected(questionSetSelected)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderAvaliation = (avaliation) => {
    const questionSetSelected = questionSets?.questions?.find(
      (group) => group.id === avaliation.questionSetId
    );
    const questions = avaliation?.questions;
    const filteredValidRatings = filterValidRatings(questions);
    const averageRating = getAverageRating(filteredValidRatings);

    const filteredQuestionsOBSERVATION = avaliation?.questions.filter(
      (question) => question.questionType === "OBSERVATION"
    );

    return (
      avaliation && (
        <Container
          key={avaliation.id}
          as="div"
          bg={bgColor}
          w="95%"
          maxH="200px"
          border="2px solid"
          borderColor="#700e17"
          padding="10px"
          borderRadius="12px"
          marginBottom="15px"
        >
          <Container
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding="0px"
            marginBottom="5px"
            borderBottom="2px solid"
            borderColor={textColor}
            overflow="hidden"
            color={textColor}
          >
            <Heading>{formattingName(avaliation?.reviewer)}:</Heading>
            <Container
              display="flex"
              width="auto"
              alignItems="center"
              padding="0px"
              margin="0px"
            >
              <CalendarIcon color={textColor} />
              <Text paddingInline="8px" color={textColor}>
                {avaliation && format(parseISO(avaliation?.date), "dd/MM/yyyy, HH:mm", {
                  locale: ptBR,
                })}
              </Text>
              <Tooltip
                label="Ver avaliação completa"
                aria-label="Tooltip para botão de visualizar"
              >
                <Button
                  bg="#700e17"
                  _hover={{}}
                  _active={{ bgColor: "#5a0c12" }}
                  color="#ffffff"
                  padding="0px"
                  size="sm"
                  margin="5px"
                  marginLeft="10px"
                  onClick={() => handleOpenModal(avaliation, questionSetSelected)}
                >
                  <ViewIcon />
                </Button>
              </Tooltip>
            </Container>
          </Container>
          <Container padding="0px">
            <Text
              color={textColor}
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 3,
              }}
              marginBottom="5px"
            >
              <strong>Observação:</strong> {filteredQuestionsOBSERVATION && filteredQuestionsOBSERVATION[0]?.observation}
            </Text>
            <Text color={textColor} marginBottom="5px">
              <strong>Média dos Ratings:</strong> {averageRating}
            </Text>
            <Text color={textColor}>
              <strong>Grupo da avaliação:</strong> {avaliation.questionSetName}
            </Text>
          </Container>
        </Container>
      )
    );
  };

  return (
    <>
      {avaliations && checkIfIsHomeScreen()
        ? renderAvaliation(getLastRating())
        : avaliations.map((avaliation) => renderAvaliation(avaliation))
      }
      {selectedAvaliation && (
        <SeeMoreAvaliation
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          avaliation={selectedAvaliation}
          getAverageRating={getAverageRating}
          filterValidRatings={filterValidRatings}
          questionSetSelected={questionSetSelected}
        />
      )}
    </>
  );
}
