import { Container, Heading, Text, Input, Select } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { getActivatedGroup, printQuestionSet } from "services/questionsSet";
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
import { getGroupAnalytics } from "services/analytics";
import { format } from "date-fns";

export default function Analytics() {
  const [groupSelected, setGroupSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const initializeRef = useRef(false);
  const [groupAPI, setGroupAPI] = useState([]);
  const today = format(new Date(), "dd/MM/yyyy");

  useEffect(() => {
    const fetchActivatedGroup = async () => {
      try {
        const activatedGroup = await getActivatedGroup();
        setGroupSelected(activatedGroup);
      } catch (error) {
        console.error("Erro ao buscar o grupo ativo:", error);
      }
    };
    const fetchGroups = async () => {
      try {
        const response = await printQuestionSet();
        setGroups(response.questions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGroups();
    fetchActivatedGroup();
  }, []);

  async function getGroup(group, endDate) {
    try {
      const response = await getGroupAnalytics(group?.id, endDate);
      setGroupAPI(response);
      setUsers(response?.reviewedUsers);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  if (groupSelected) {
    const initializeData = async () => {
      try {
        await getGroup(groupSelected, today);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!initializeRef.current) {
      initializeData();
      initializeRef.current = true;
    }
  }

  const newGroupFiltred = async (selectedGroupId) => {
    try {
      const response = await getGroupAnalytics(selectedGroupId, today);
      setGroupAPI(response);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateAverageRating = () => {
    const ratings = groupAPI?.ratingsOfAllAnsweredFeedbacks || [];
    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((acc, rating) => acc + rating, 0);
    return totalRatings > 0 ? (sumRatings / totalRatings).toFixed(2) : "0";
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
                value={groupAPI?.selectedGroup?.id}
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
                groupAPI &&
                "Feedbacks criados no " + groupAPI?.selectedGroup?.name
              }
              number={groupAPI?.numberOfRealizedFeedbacks}
              detailText={
                groupAPI?.numberOfRealizedFeedbacks !== 0
                  ? groupAPI?.numberOfRealizedFeedbacks === 1
                    ? "Feedback"
                    : "Feedbacks"
                  : "Nenhum Feedback"
              }
            />
            <BoxAverage
              average={
                calculateAverageRating() +
                " de " +
                groupAPI?.selectedGroup?.numberOfStars
              }
              description={"Média de todas as notas do grupo"}
            />
            <BoxInfoLists
              users={users}
              group={groupAPI}
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
            <CartesianChart feedbacks={groupAPI.graphData} />
            <Container marginRight="60px">
              <AverageQuestions
                feedbacks={groupAPI.notesOfAnsweredQuestions}
                title="Médias de notas por questão"
              />
              <AverageUsers
                notes={groupAPI?.selectedGroup?.numberOfStars}
                feedbacks={groupAPI?.sendedNotesPerUser}
              />
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
              <BoxObservations feedbacks={groupAPI?.realizedObservations} />
            </Container>
          </Container>
        </>
      )}
    </>
  );
}
