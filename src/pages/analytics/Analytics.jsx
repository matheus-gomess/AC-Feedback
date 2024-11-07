import {
  Container,
  Heading,
  Text,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { printQuestionSet } from "services/questionsSet";
import { getAddedFeedbacks } from "services/feedbacks";
import PrincipalSpinner from "components/Spinner";
import {
  BoxAverage,
  BoxInfoLists,
  BoxInfoNumbers,
} from "./components/boxInformations";
import CartesianChart from "./components/grafics/cartesianChart";
import BoxObservations from "./components/boxObservations";
import AverageUsers from "./components/grafics/averageUsers";
import AverageQuestions from "./components/grafics/averageQuestions";

export default function Analytics() {
  const [groupSelected, setGroupSelected] = useState(null);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [filtredFeedbacks, setFiltredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [average, setAverage] = useState();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await printQuestionSet();
        setGroups(response.questions);
        const activatedGroup = response.questions.find(
          (group) => group.activatedSet === true
        );
        setGroupSelected(activatedGroup);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await getAddedFeedbacks();
        setAllFeedbacks(response.addedFeedbacks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    if (groupSelected && allFeedbacks.length >= 0) {
      const filtring = allFeedbacks.filter(
        (feedback) => groupSelected.questionSetName === feedback.questionSetName
      );
      setFiltredFeedbacks(filtring);

      function listUsersReviewed() {
        const usersReviewed = filtring
          .map((feedback) => feedback.reviewed)
          .flat();
        const uniqueUsers = [...new Set(usersReviewed)];
        setUsers(uniqueUsers);
      }

      function averageAvaliationsFeedbacks() {
        let ratings = 0;
        let questions = 0;

        filtring.forEach((feedback) => {
          feedback.questions.forEach((question) => {
            ratings += question.rating;
            questions++;
          });
          questions--;
        });

        setAverage(questions > 0 ? (ratings / questions).toFixed(2) : 0);
      }
      listUsersReviewed();
      averageAvaliationsFeedbacks();
      setLoading(false);
    }
  }, [groupSelected, allFeedbacks]);

  const newGroupFiltred = async (selectedGroupId) => {
    try {
      const response = await printQuestionSet();
      const filtringFeedbacks = response.questions.find(
        (group) => group.id === selectedGroupId
      );
      if (filtringFeedbacks) {
        setGroupSelected(filtringFeedbacks);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            minHeight="70px"
            minWidth="100%"
            display="flex"
            alignItems="center"
          >
            <Heading fontWeight="400" display="flex" alignItems="center">
              Análises sobre o grupo:{" "}
              <Select
                maxWidth="fit-content"
                border="none"
                fontSize="1.875rem"
                fontWeight="400"
                focusBorderColor="transparent"
                value={groupSelected?.id}
                onChange={(e) => {
                  newGroupFiltred(e.target.value);
                }}
              >
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.questionSetName}
                  </option>
                ))}
              </Select>
            </Heading>
            <Container display="flex" alignItems="center" w="fit-content">
              <Text
                fontWeight="bold"
                whiteSpace="nowrap"
                mr="10px"
                fontSize="18px"
              >
                Período dos dados:
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
            <BoxInfoNumbers
              title={
                groupSelected &&
                "Feedbacks criados no " + groupSelected.questionSetName
              }
              number={filtredFeedbacks.length}
              detailText={
                filtredFeedbacks.length !== 0
                  ? filtredFeedbacks.length === 1
                    ? "Feedback"
                    : "Feedbacks"
                  : "Nenhum Feedback"
              }
            />
            <BoxAverage
              average={average + " de " + groupSelected?.numberOfStars}
              description={"Média de todas as notas do grupo"}
            />
            <BoxInfoLists
              users={users}
              filtredFeedbacks={filtredFeedbacks}
              groupSelected={groupSelected}
            />
          </Container>
          <Container
            marginTop="15px"
            minWidth="100%"
            minHeight="367px"
            padding="0px"
            alignItems="center"
            display="grid"
            gridTemplateColumns="repeat(2, 2fr)"
          >
            <CartesianChart notes={groupSelected?.numberOfStars} feedbacks={filtredFeedbacks}/>
            <Container marginRight="60px">
              <AverageQuestions feedbacks={filtredFeedbacks}/>
              <AverageUsers notes={groupSelected?.numberOfStars} feedbacks={filtredFeedbacks}/>
            </Container>
          </Container>
          <Container
            minWidth="100%"
            height="fit-content"
            padding="0px"
            marginTop="15px"
            marginBottom="20px"
          >
            <Container
              minWidth="100%"
              maxHeight="fit-content"
              padding="0px"
              paddingLeft="15px"
            >
              <Heading>Comentários:</Heading>
            </Container>
            <Container minWidth="100%" minHeight="90%" gap="20px">
              <BoxObservations feedbacks={filtredFeedbacks} />
            </Container>
          </Container>
        </>
      )}
    </>
  );
}
