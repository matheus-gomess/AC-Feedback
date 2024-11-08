import { Container, Heading, Progress, Text, useColorMode } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ObservationsPage from "./components/observationsPage";
import QuestionsPage from "./components/questionsPage";
import ButtonRate from "./components/buttonRate";
import { getActivatedGroup } from "services/questionsSet";
import { postFeedback } from "services/feedbacks";
import PrincipalSpinner from "components/Spinner";
import { APIformattingName } from "utils/formattingTexts";
import { getUser } from "storage/get-user";

export default function RateParticipantScreen() {
  const user = getUser();
  const {colorMode} = useColorMode();
  const {participant} = useParams();
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [justification, setJustification] = useState("");
  const [questions, setQuestions] = useState([]);
  const [numberOfStars, setNumberOfStars] = useState();
  const [activatedGroup, setActivatedGroup] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const group = await getActivatedGroup();
        const sortedQuestions = group.questions.sort((a, b) => {
          if (a.questionType === "OBSERVATION") return 1;
          if (b.questionType === "OBSERVATION") return -1;
          return 0;
        });
        setNumberOfStars(group.numberOfStars);
        setActivatedGroup({ ...group, questions: sortedQuestions });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAvaliation = (rating) => {
    const newQuestion = {
      questionName: activatedGroup.questions[currentQuestion].questionName,
      rating: rating,
      questionType: "RATING",
      questionDescription: activatedGroup.questions[currentQuestion].questionDescription,
      justification: justification,
    };

    setQuestions((prev) => {
      const copyQuestionArray = [...prev];
      copyQuestionArray[currentQuestion] = newQuestion;
      return copyQuestionArray;
    });
  };

  const avaliation = {
    reviewer: user.name,
    reviewed: APIformattingName(participant),
    questions: questions,
  };

  const saveAvaliation = (finalAvaliation) => {
    postFeedback(finalAvaliation)
    setQuestions([]);
  };

  //Funções controlando a passagem de questões
  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    handleAvaliation(rating);
    setRating(null);
    setJustification("");
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
    setRating(questions[currentQuestion - 1]?.rating || 0);
    setJustification(questions[currentQuestion - 1]?.justification || "");
  };

  return (
    <div
      style={{
        height: "90vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        as="main"
        minH="85vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        minWidth="100%"
      >
        {loading ?
          <PrincipalSpinner />
          :
          <Container
            border="1px solid"
            borderColor="#700e17"
            borderRadius="8px"
            h="525px"
            maxH="550px"
            width="700px"
            padding="0px"
            pt="30px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Text position="absolute">Grupo de questões:{" "}{activatedGroup.questionSetName}</Text>
            <Container
              textAlign="center"
              display="flex"
              flexDir="column"
              flexGrow={1}
            >
              <Container
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDir="column"
                flexGrow={1}
                gap="6"
                pos="relative"
                top="30px"
              >
                <Container>
                  {questions[currentQuestion] && (
                    <span style={{ color: "#42474f" }}>
                      Essa foi a sua pontução anterior:{" "}
                      {questions[currentQuestion].rating}
                    </span>
                  )}
                  <Heading>{activatedGroup?.questions[currentQuestion].questionName}</Heading>
                  <Text>{activatedGroup?.questions[currentQuestion].questionDescription}</Text>
                </Container>
                <Container>
                  {activatedGroup?.questions[currentQuestion].questionType === "RATING" ? (
                    <QuestionsPage
                      participant={participant}
                      hover={hover}
                      setHover={setHover}
                      rating={rating}
                      setRating={setRating}
                      justification={justification}
                      setJustification={setJustification}
                      numberOfStars={numberOfStars}
                    />
                  ) : (
                    <ObservationsPage
                      currentQuestion={currentQuestion}
                      avaliation={avaliation}
                      questions={questions}
                      saveAvaliation={saveAvaliation}
                    />
                  )}
                </Container>
              </Container>
            </Container>
            <Container
              minWidth="100%"
              padding="15px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <ButtonRate
                currentQuestion={currentQuestion}
                handleNextQuestion={handleNextQuestion}
                handlePreviousQuestion={handlePreviousQuestion}
                rating={rating}
              />
              <Text fontSize="15px" as="span">
                {participant}
              </Text>
            </Container>
          </Container>
        }
      </Container>
      {!loading &&
        <Container
          as="footer"
          minWidth="100%"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Container>
            <Progress
              value={currentQuestion}
              max={activatedGroup?.questions.length - 1}
              borderRadius="20px"
              colorScheme="red"
              size="xs"
              bgColor={colorMode === "dark" ? "#ffffff" : "#1a202c"}
            />
          </Container>
        </Container>
      }
    </div>
  );
}
