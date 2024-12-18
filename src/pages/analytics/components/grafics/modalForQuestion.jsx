import { CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Text,
  Stack,
  Tag,
  ModalOverlay,
  Divider,
  Flex,
  Container,
  useColorMode,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { formattingFirstName } from "utils/formattingTexts";

export default function ModalForQuestion({
  question,
  isOpen,
  handleClose,
  feedbacks,
}) {
  const { colorMode } = useColorMode();
  const [listOrder, setListOrder] = useState();
  const [questionFiltred, setQuestionFiltred] = useState();

  useEffect(() => {
    if (isOpen) {
      let questionPosition = -1;
      let allQuestionsWithSameName = [];
      let filteredQuestions = [];
      let generalInfo = [];

      feedbacks.forEach((feedback) => {
        feedback.questions.forEach((q, questionIndex) => {
          if (q.questionName === question?.questionName) {
            allQuestionsWithSameName.push(q);
          }
          if (
            q.questionName === question?.questionName &&
            q.questionType === "RATING"
          ) {
            if (questionPosition === -1) {
              questionPosition = questionIndex + 1;
            }
            filteredQuestions.push(q);
          }
        });

        if (
          feedback.questions.some(
            (q) => q.questionName === question?.questionName
          )
        ) {
          generalInfo.push({
            reviewed: feedback.reviewed,
            reviewer: feedback.reviewer,
            questionSetName: feedback.questionSetName,
            date: feedback.date,
            id: feedback.questionSetId,
            questions: allQuestionsWithSameName,
          });
        }
      });
      setListOrder(questionPosition);
      setQuestionFiltred(generalInfo);
    }
  }, [isOpen, feedbacks, question]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent minW="600px" minH="500px">
        <ModalHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={4}
          paddingBottom="5px"
        >
          <Heading size="lg" color={colorMode === "dark" ? "white" : "black"}>
            Informações sobre a {listOrder}ª Questão
          </Heading>
          <IconButton
            onClick={handleClose}
            bg="transparent"
            _hover={{}}
            _active={{}}
            icon={<CloseIcon />}
            aria-label="Fechar"
            position="absolute"
            top={4}
            right={4}
          />
        </ModalHeader>
        <Divider borderColor="" opacity="40%" />
        <ModalBody p={6}>
          <Box mb={6}>
            <Heading
              size="md"
              mb={2}
              color={colorMode === "dark" ? "gray.100" : "gray.900"}
            >
              Título da Pergunta:
            </Heading>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={colorMode === "dark" ? "gray.100" : "gray.900"}
              mb={4}
            >
              {question?.questionName}
            </Text>
            <Flex justify="space-between" align="center">
              <Box>
                <Text
                  fontSize="lg"
                  color={colorMode === "dark" ? "gray.200" : "gray.800"}
                >
                  <strong>Média de Avaliação:</strong>
                </Text>
                <Text
                  fontSize="xl"
                  fontWeight="semibold"
                  color={colorMode === "dark" ? "gray.200" : "gray.800"}
                >
                  {question?.averageRating}
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize="lg"
                  color={colorMode === "dark" ? "gray.200" : "gray.800"}
                >
                  <strong>Grupo:</strong>
                </Text>
                <Tag colorScheme="teal" size="lg" fontWeight="bold">
                  {questionFiltred && questionFiltred[0]?.questionSetName}
                </Tag>
              </Box>
            </Flex>
          </Box>
          <Divider mb={6} borderColor="" opacity="40%" />
          <Container
            className="scrollbar"
            padding="0px"
            maxW="100%"
            maxH="350px"
            overflow="hidden"
            overflowY="auto"
            bgColor={colorMode === "dark" ? "#14181e60" : "transparent"}
            border={colorMode === "dark" ? "none" : "1px solid black"}
            borderRadius="5px"
          >
            <Heading
              size="md"
              color={colorMode === "dark" ? "white" : "black"}
              position="sticky"
              top={0}
              zIndex={1}
              bgColor={colorMode === "dark" ? "#232b38" : "white"}
              padding="8px"
              paddingBottom="4px"
            >
              Perguntas Encontradas:
            </Heading>
            <Box
              position="sticky"
              top="34px"
              height="15px"
              bgGradient={
                colorMode === "dark"
                  ? "linear(to-b, #232b38, transparent)"
                  : "linear(to-b, white, transparent)"
              }
              zIndex={0}
            />
            <Stack spacing={4}>
              {questionFiltred?.map((feedback, index) => (
                <Box
                  key={`${feedback.id}-${index}`}
                  p={4}
                  margin="10px"
                  marginTop="0px"
                  borderWidth="1px"
                  borderRadius="lg"
                  bg="gray.200"
                  boxShadow="sm"
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Box
                      display="flex"
                      width="180px"
                      justifyContent="space-between"
                    >
                      <Text fontSize="lg" fontWeight="semibold" color="black">
                        {feedback.questions[index]?.questionName}
                      </Text>
                      <Tag
                        bg={colorMode === "dark" ? "black" : "#9ae6b4"}
                        color={colorMode === "dark" ? "#9ae6b4" : "black"}
                        fontWeight="bold"
                      >
                        Nota: {feedback.questions[index]?.rating}
                      </Tag>
                    </Box>
                    <Text color="gray.900">
                      <strong>
                        De {formattingFirstName(feedback.reviewer)} para{" "}
                        {formattingFirstName(feedback.reviewed)}
                      </strong>
                    </Text>

                    <IconButton
                      onClick={handleClose}
                      bg="transparent"
                      _hover={{}}
                      _active={{}}
                      icon={<ExternalLinkIcon color="blue" fontSize={20} />}
                      aria-label="Abrir Todo o Feedback"
                    />
                  </Stack>
                  <Box display="flex" justifyContent="space-between">
                    <Text mt={2} color="gray.800">
                      Justificativa:{" "}
                      {feedback.questions[index]?.justification === ""
                        ? "Nenhuma Justificativa"
                        : feedback.questions[index]?.justification}
                    </Text>
                    <Text mt={2} color="gray.800">
                      {format(parseISO(feedback.date), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
