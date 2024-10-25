import { useState } from "react";
import {
  Container,
  Heading,
  Text,
  Button,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formattingName } from "utils/formattingTexts";

export default function BoxObservations({ feedbacks }) {
  const { colorMode } = useColorMode();
  const [showAll, setShowAll] = useState(false);

  const visibleFeedbacks = showAll ? feedbacks : feedbacks.slice(0, 3);

  return (
    <>
      {visibleFeedbacks.length > 0
        ? visibleFeedbacks?.map((feedback, index) => (
            <Container
              key={index}
              minWidth="100%"
              height="180px"
              borderBottom="3px solid"
              borderColor="#808080"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              color="white"
              marginBottom="50px"
              position="relative"
            >
              <Heading
                as="h2"
                fontSize="35px"
                textAlign="center"
                fontStyle="italic"
                color={colorMode === "dark" ? "white" : "black"}
              >
                "
                {feedback.questions[feedback.questions.length - 1]?.observation}
                "
              </Heading>
              <Text color="#808080" fontSize="18px" marginTop="10px">
                - {formattingName(feedback.reviewer)}
              </Text>

              <Box position="absolute" bottom="10px" right="20px">
                <Text color="#808080">
                  {format(parseISO(feedback?.date), "dd/MM/yyyy, HH:mm", {
                    locale: ptBR,
                  })}
                </Text>
              </Box>
            </Container>
          ))
        : <Box display="flex" justifyContent="center"><Heading color="#808080">Nenhum comentário</Heading></Box>}

      {showAll
        ? null
        : feedbacks.length > 3 && (
            <Box display="flex" justifyContent="center">
              <Button
                marginLeft="40px"
                width="400px"
                onClick={() => setShowAll(!showAll)}
                bgColor={colorMode === "dark" ? "#2b3442" : "transparent"}
                _hover={
                  colorMode === "dark"
                    ? { bgColor: "#455369" }
                    : { bgColor: "#d6d6d6" }
                }
                border="1px solid"
                borderColor={colorMode === "dark" ? "transparent" : "black"}
              >
                Ver mais
              </Button>
            </Box>
          )}
    </>
  );
}
