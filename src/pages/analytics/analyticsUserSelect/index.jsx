import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import {
  Text,
  Heading,
  Container,
  Input,
  Box,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { formattingFirstName, formattingName } from "utils/formattingTexts";
import { listAllUsers } from "services/users";
import PrincipalSpinner from "components/Spinner";
import {
  BoxAverage,
  BoxInfoNumbers,
} from "pages/analytics/components/boxInformations";
import CartesianChart from "../components/grafics/cartesianChart";
import PieGrafics from "../components/grafics/pieChart";
import BoxObservations from "../components/boxObservations";

function AnalyticsUserSelect() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { user, filtredFeedbacks, groupSelected } = location.state;
  const [matchedUser, setMatchedUser] = useState(null);
  const [userFeedbacks, setUserFeedbacks] = useState([]);
  const [average, setAverage] = useState();
  const initializeData = useRef(false);

  function averageAvaliationsFeedbacks(feedbacks) {
    let ratings = 0;
    let questions = 0;

    feedbacks?.forEach((feedback) => {
      feedback.questions.forEach((question) => {
        ratings += question.rating;
        questions++;
      });
      questions--;
    });

    setAverage(questions > 0 ? (ratings / questions).toFixed(2) : 0);
  }

  async function findParticipants() {
    try {
      const response = await listAllUsers();
      const foundUser = response.find(
        (participant) => user === participant.name
      );
      if (foundUser) {
        setMatchedUser(foundUser);

        const filteredUserFeedbacks = filtredFeedbacks.filter(
          (feedback) => feedback.reviewed === user
        );
        setUserFeedbacks(filteredUserFeedbacks);
        console.log(filteredUserFeedbacks)
        averageAvaliationsFeedbacks(filteredUserFeedbacks);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (!initializeData.current) {
    findParticipants();
    initializeData.current = true;
  }
  

  return (
    <>
      {loading ? (
        <Container
          minHeight="90vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <PrincipalSpinner />
        </Container>
      ) : (
        <>
          <Container
            paddingTop="10px"
            minHeight="70px"
            minWidth="100%"
            display="flex"
            alignItems="center"
          >
            <Container
              margin="0px"
              padding="0px"
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <Box display="flex" alignItems="center">
                <Heading>{formattingName(matchedUser?.name)}</Heading>
                <Tooltip
                  label={`Análises da ${formattingName(
                    matchedUser?.name
                  )} no grupo ${
                    groupSelected?.questionSetName
                  } (as análises das pessoas podem mudar conforme o grupo selecionado).`}
                  aria-label="Tooltip explicando como funciona o filtro de avaliações criadas"
                >
                  <Icon
                    w={3}
                    ml={1}
                    position="relative"
                    bottom="10px"
                    _hover={{ cursor: "pointer" }}
                  />
                </Tooltip>
              </Box>

              <Text
                fontSize="16px"
                textColor="rgba(113, 128, 150, 0.6)"
                position="relative"
                bottom="6px"
              >
                <strong style={{ textTransform: "uppercase" }}>
                  {matchedUser?.userType === "ADMIN"
                    ? "administrador"
                    : "participante"}
                </strong>
              </Text>
            </Container>
            <Box fontSize="18px">
              <Text fontWeight="bold">
                Grupo Selecionado:{" "}
                <Box
                  as="span"
                  textDecoration="underline"
                  textDecorationColor="red"
                  fontWeight="500"
                >
                  {groupSelected?.questionSetName}
                </Box>
              </Text>
            </Box>
            <Container display="flex" alignItems="center" w="fit-content">
              <Text
                fontWeight="bold"
                whiteSpace="nowrap"
                mr="10px"
                fontSize="18px"
              >
                Até o período:
              </Text>
              <Input type="date" variant="flushed" focusBorderColor="#971520" />
            </Container>
          </Container>
          <Container
            padding="0px"
            paddingLeft="50px"
            paddingRight="50px"
            maxHeight="300px"
            minWidth="100%"
            display="flex"
            justifyContent="space-between"
          >
            <>
              <BoxInfoNumbers
                title={
                  "Feedbacks para " + formattingFirstName(matchedUser?.name)
                }
                number={userFeedbacks.length}
                detailText={"Feedbacks"}
              />
              <BoxAverage
                average={average + " de " + groupSelected?.numberOfStars}
                description={`Média das notas de ${formattingFirstName(
                  matchedUser?.name
                )}`}
              />
              <Container
                minHeight="200px"
                maxHeight="200px"
                margin="0px"
                padding="0px"
                maxWidth="35%"
              />
            </>
          </Container>
          <Container
            marginTop="30px"
            minWidth="100%"
            padding="0px"
            alignItems="center"
            display="grid"
            gridTemplateColumns="repeat(2, 2fr)"
          >
            <CartesianChart notes={groupSelected?.numberOfStars} feedbacks={userFeedbacks}/>
            <Container marginRight="60px">
              <Container
                bgColor="#2b3442"
                borderRadius="10px"
                padding="20px"
                mb="30px"
                display="flex"
              >
                <PieGrafics />
                <Heading color="white">Gráfico 1</Heading>
              </Container>
              <Container
                bgColor="#2b3442"
                borderRadius="10px"
                padding="20px"
                display="flex"
              >
                <PieGrafics />
                <Heading color="white">Gráfico 2</Heading>
              </Container>
            </Container>
          </Container>
          <Container
            minWidth="100%"
            height="fit-content"
            padding="0px"
            marginTop="45px"
            marginBottom="20px"
          >
            <Container
              minWidth="100%"
              maxHeight="fit-content"
              padding="0px"
              paddingLeft="15px"
              paddingRight="15px"
              marginBottom="15px"
            >
              <Heading>Comentários para {formattingFirstName(matchedUser?.name)}:</Heading>
            </Container>
            <Container minWidth="100%" minHeight="90%" gap="20px">
              <BoxObservations feedbacks={userFeedbacks} />
            </Container>
          </Container>
        </>
      )}
    </>
  );
}

export default AnalyticsUserSelect;
