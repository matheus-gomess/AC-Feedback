import {
  Container,
  Heading,
  Button,
  Box,
  Select,
  useColorMode,
  Tooltip,
  Icon
} from "@chakra-ui/react";
import SubmittedAvaliation from "../rate/components/submittedAvaliations";
import { useRef, useState } from "react";
import ModalFilter from "./components/modalFilter";
import ModalGroupSelect from "./components/modalGroupSelect";
import { CalendarIcon } from "@chakra-ui/icons";
import { getAddedFeedbacks, getReceivedFeedbacks } from "services/feedbacks";
import { listUsers } from "services/users";
import { formattingName } from "utils/formattingTexts";
import PrincipalSpinner from "components/Spinner";
import { toast } from "react-toastify";
import { printQuestionSet } from "services/questionsSet";
import { getUser } from "storage/get-user";

export default function Feedbacks() {
  const user = getUser();
  const verifyAdm = user?.role === "ADMIN";
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [questionSets, setQuestionSets] = useState([]);
  const [openFilters, setOpenFilters] = useState(false);
  const [openGroupFilter, setOpenGroupFilter] = useState(false);
  const [avaliationsAdded, setAvaliationsAdded] = useState();
  const [avaliationsReceived, setAvaliationsReceived] = useState();
  const [selectUserAdded, setSelectUserAdded] = useState("");
  const [selectUserReceived, setSelectUserReceived] = useState("");
  const [selectedUserReviewed, setSelectedUserReviewed] = useState("");
  const [newSelectedGroup, setNewSelectedGroup] = useState("");
  const initializeRef = useRef(false);

  //Gradiente das cores nos temas
  const colorGradientBackGround =
    colorMode === "dark"
      ? "linear-gradient(to top, #1c222b, rgba(28, 34, 43, 0.85), rgba(28, 34, 43, 0.7), transparent)"
      : "linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.7), transparent)";

  async function findParticipants() {
    try {
      const response = await listUsers();
      setUsers(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    try {
      const groups = await printQuestionSet();
      setQuestionSets(groups);
    } catch (error) {
      console.log(error);
    }
  }

  async function userFeedbacksAdded(selectedUserAdded) {
    try {
      const responseAdded =
        selectedUserAdded &&
        (await getAddedFeedbacks(selectedUserAdded, newSelectedGroup));
      setAvaliationsAdded(responseAdded.addedFeedbacks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function userFeedbacksReceived(selectedUserReceived) {
    try {
      const responseReceived =
        selectedUserReceived &&
        (await getReceivedFeedbacks(selectedUserReceived, newSelectedGroup));
      setAvaliationsReceived(responseReceived.receivedFeedbacks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const newGroupFiltred = async (selectedGroup) => {
    try {
      const responseNewGroupAdded = await getAddedFeedbacks(
        selectUserAdded === "" ? user.name : selectUserAdded,
        selectedGroup
      );
      const responseNewGroupReceived = await getReceivedFeedbacks(
        selectUserReceived === "" ? user.name : selectUserReceived,
        selectedGroup
      );
      setAvaliationsAdded(responseNewGroupAdded.addedFeedbacks);
      setAvaliationsReceived(responseNewGroupReceived.receivedFeedbacks);
      setNewSelectedGroup(selectedGroup);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

const initializeData = async () => {
      try {
        await fetchData();
        await findParticipants();

        userFeedbacksReceived(user.name);
        userFeedbacksAdded(user.name);
      } catch (error) {
        console.log(error);
      }
    };
  
    if (!initializeRef.current) {
      initializeData();
      initializeRef.current = true; // Marcar como executado
    }

  //Função controlando a fechura do filtro de grupos
  const handleCloseGroupFilter = () => {
    setOpenGroupFilter(false);
  };

  //Funções controlando a abertura e fechura do filtro por data
  const handleOpenFilters = () => {
    setOpenFilters(true);
  };

  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const filtringParticipantReviewed = async (selectedParticipantReviewed) => {
    try {
      const responseNewParticipantReviewed = await getAddedFeedbacks(
        user.name,
        null,
        selectedParticipantReviewed && selectedParticipantReviewed
      );
      setAvaliationsAdded(responseNewParticipantReviewed.addedFeedbacks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "inherit",
        color: "white",
        minHeight: "90vh",
        backgroundColor: "1c222b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {verifyAdm ? (
        <>
          <Button
            pos="absolute"
            top="200px"
            onClick={() => setOpenGroupFilter(true)}
            background="transparent"
            border="1px solid"
            borderColor={colorMode === "dark" ? "white" : "#1c222b"}
            color={colorMode === "dark" ? "white" : "#1c222b"}
            _hover={{}}
            _active={{ background: "rgba(0, 0, 0, 0.26)" }}
          >
            Filtrar por grupo
          </Button>
          <ModalGroupSelect
            isOpen={openGroupFilter}
            onClose={handleCloseGroupFilter}
            setLoading={setLoading}
            newGroupFiltred={newGroupFiltred}
          />
        </>
      ) : null}
      <ModalFilter isOpen={openFilters} onClose={handleCloseFilters} />
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
      ) : (
        <Container
          maxH="300px"
          borderRadius="20px"
          padding="0px"
          position="relative"
          bottom="50"
          _after={{
            content: '""',
            position: "absolute",
            top: 300,
            bottom: 0,
            left: 0,
            right: 0,
            width: "95%",
            height: "75px",
            background: colorGradientBackGround,
            borderBottomRadius: "20px",
            pointerEvents: "none"
          }}
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
            <Heading fontSize="30px">Avaliações criadas:</Heading>
            {verifyAdm ? (
              <Box display="flex" minWidth="40%">
                <Box display="flex" alignItems="center" marginRight="20px">
                  <Select
                    _focus={{ boxShadow: "none" }}
                    borderColor="transparent"
                    _hover={{}}
                    focusBorderColor="white"
                    value={selectUserAdded}
                    onChange={(e) => {
                      setSelectUserAdded(e.target.value);
                      userFeedbacksAdded(e.target.value);
                    }}
                    marginRight="2px"
                  >
                    <option
                      key={user.name}
                      value={user.name}
                      style={{
                        color: colorMode === "dark" ? "white" : "black"
                      }}
                    >
                      Você
                    </option>
                    {users.map((user) => (
                      <option
                        key={user.name}
                        value={user.name}
                        style={{
                          color: colorMode === "dark" ? "white" : "black"
                        }}
                      >
                        {formattingName(user.name)}
                      </option>
                    ))}
                  </Select>
                  <Tooltip
                    label="Filtro que você filtra o participante que criou as avaliações"
                    aria-label="Tooltip explicando como funciona o filtro de avaliações criadas"
                  >
                    <Icon
                      w={3}
                      position="relative"
                      bottom="10px"
                      _hover={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                </Box>
                <Box
                  cursor="pointer"
                  onClick={() =>
                    toast.error("Esta funcionalidade está em construção")
                  }
                >
                  <Button
                    pointerEvents="none"
                    variant="outline"
                    colorScheme="white"
                    onClick={handleOpenFilters}
                    padding="0px"
                  >
                    <CalendarIcon />
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box display="flex" minWidth="40%">
                <Box display="flex" alignItems="center" marginRight="20px">
                  <Select
                    _focus={{ boxShadow: "none" }}
                    borderColor="transparent"
                    _hover={{}}
                    value={selectedUserReviewed}
                    onChange={(e) => {
                      setSelectedUserReviewed(e.target.value);
                      filtringParticipantReviewed(e.target.value);
                    }}
                    focusBorderColor="white"
                    marginRight="2px"
                  >
                    <option
                      value={""}
                      style={{
                        color: colorMode === "dark" ? "white" : "black"
                      }}
                    >
                      Todos
                    </option>
                    {users.map((user) => (
                      <option
                        key={user.name}
                        value={user.name}
                        style={{
                          color: colorMode === "dark" ? "white" : "black"
                        }}
                      >
                        {formattingName(user.name)}
                      </option>
                    ))}
                  </Select>
                  <Tooltip
                    label="Filtro que você filtra o participante que recebeu suas avaliações"
                    aria-label="Tooltip explicando como funciona o filtro de avaliações criadas"
                  >
                    <Icon
                      w={3}
                      position="relative"
                      bottom="10px"
                      _hover={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                </Box>
                <Box
                  cursor="pointer"
                  onClick={() =>
                    toast.error("Esta funcionalidade está em construção")
                  }
                >
                  <Button
                    pointerEvents="none"
                    variant="outline"
                    colorScheme="white"
                    onClick={handleOpenFilters}
                    padding="0px"
                  >
                    <CalendarIcon />
                  </Button>
                </Box>
              </Box>
            )}
          </Container>
          <Container padding="8px">
            <Container
              className="scrollbar"
              padding="10px"
              paddingBottom="50px"
              paddingTop="15px"
              maxW="100%"
              maxH="306px"
              overflow="hidden"
              overflowY="auto"
            >
              {avaliationsAdded && avaliationsAdded.length > 0 ? (
                <SubmittedAvaliation
                  avaliations={avaliationsAdded}
                  questionSets={questionSets}
                />
              ) : (
                <Container>
                  <Heading
                    color="grey"
                    marginTop="126px"
                    position="relative"
                    bottom="75px"
                  >
                    Nenhum Feedback Criado
                  </Heading>
                </Container>
              )}
            </Container>
          </Container>
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
      ) : (
        <Container
          maxH="300px"
          borderRadius="20px"
          padding="0px"
          position="relative"
          pos="relative"
          bottom="50"
          _after={{
            content: '""',
            position: "absolute",
            top: 300,
            bottom: 0,
            left: 0,
            right: 0,
            width: "95%",
            height: "75px",
            background: colorGradientBackGround,
            borderBottomRadius: "20px",
            pointerEvents: "none"
          }}
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
            <Heading fontSize="30px">Avaliações recebidas:</Heading>
            {verifyAdm ? (
              <Box display="flex" minWidth="40%">
                <Box display="flex" alignItems="center" marginRight="20px">
                  <Select
                    _focus={{ boxShadow: "none" }}
                    borderColor="transparent"
                    _hover={{}}
                    focusBorderColor="white"
                    marginRight="2px"
                    value={selectUserReceived}
                    onChange={(e) => {
                      setSelectUserReceived(e.target.value);
                      userFeedbacksReceived(e.target.value);
                    }}
                  >
                    <option
                      key={user.name}
                      value={user.name}
                      style={{
                        color: colorMode === "dark" ? "white" : "black"
                      }}
                    >
                      Você
                    </option>
                    {users.map((user) => (
                      <option
                        key={user.name}
                        value={user.name}
                        style={{
                          color: colorMode === "dark" ? "white" : "black"
                        }}
                      >
                        {formattingName(user.name)}
                      </option>
                    ))}
                  </Select>
                  <Tooltip
                    label="Filtro que você filtra as avaliações que certo participante recebeu"
                    aria-label="Tooltip explicando como funciona o filtro de avaliações criadas"
                  >
                    <Icon
                      w={3}
                      position="relative"
                      bottom="10px"
                      _hover={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                </Box>
                <Box
                  cursor="pointer"
                  onClick={() =>
                    toast.error("Esta funcionalidade está em construção")
                  }
                >
                  <Button
                    pointerEvents="none"
                    variant="outline"
                    colorScheme="white"
                    onClick={handleOpenFilters}
                    padding="0px"
                  >
                    <CalendarIcon />
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box
                cursor="pointer"
                onClick={() =>
                  toast.error("Esta funcionalidade está em construção")
                }
              >
                <Button
                  pointerEvents="none"
                  variant="outline"
                  colorScheme="white"
                  onClick={handleOpenFilters}
                  padding="0px"
                >
                  <CalendarIcon />
                </Button>
              </Box>
            )}
          </Container>
          <Container padding="8px">
            <Container
              className="scrollbar"
              padding="10px"
              paddingTop="15px"
              paddingBottom="50px"
              maxW="100%"
              maxH="306px"
              overflow="hidden"
              overflowY="auto"
            >
              {avaliationsReceived && avaliationsReceived.length > 0 ? (
                <SubmittedAvaliation
                  avaliations={avaliationsReceived}
                  questionSets={questionSets}
                />
              ) : (
                <Container position="relative" bottom="75px">
                  <Heading color="grey" marginTop="126px">
                    Nenhum Feedback Recebido
                  </Heading>
                </Container>
              )}
            </Container>
          </Container>
        </Container>
      )}
    </div>
  );
}
