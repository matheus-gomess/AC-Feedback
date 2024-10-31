import {
  Button,
  Text,
  InputGroup,
  Input,
  InputRightAddon,
  IconButton,
  Container,
  Heading,
  Checkbox,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ModalEditingGroup from "./modalEditingGroup";
import {
  printQuestionSet,
  createQuestionSet,
  editQuestionSet,
  deleteQuestionSet,
  postActivateGroup,
} from "services/questionsSet";
import { StarsNumberOfStars } from "components/Stars";

export default function CreatingGroupAvaliations() {
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false);
  const [selectedGroupValue, setSelectedGroupValue] = useState(null);
  const [nameGroupValue, setNameGroupValue] = useState("");
  const [questionsInput, setQuestionsInput] = useState([]);
  const [showInputGroup, setShowInputGroup] = useState(false);
  const [showADDQuestionsInput, setShowADDQuestionsInput] = useState(false);
  const [inputQuestionsValue, setInputQuestionsValue] = useState("");
  const [questionsSet, setQuestionsSet] = useState();
  const [valueInputName, setValueInputName] = useState("");
  const [numberInputStars, setNumberInputStars] = useState();
  const [openSelectedQuestion, setOpenSelectedQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [valueNewTitleQuestion, setValueNewTitleQuestion] = useState("");
  const [valueNewDescQuestion, setValueNewDescQuestion] = useState("");

  const fetchData = async () => {
    try {
      setQuestionsSet(await printQuestionSet());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Criando novo grupo
  const handleCreatingNewGroup = async () => {
    setNameGroupValue("");
    setShowInputGroup(false);
    try {
      const newGroup = {
        questionSetName: nameGroupValue,
        questions: [
          {
            questionName: "Primeira Pergunta",
            questionType: "RATING",
            questionDescription: "Descrição da pergunta 1",
          },
          {
            questionName: "Observações",
            questionType: "OBSERVATION",
            questionDescription:
              "Coloque uma observação para poder enviar o formulário",
          },
        ],
        numberOfStars: 5,
      };
      const response = await createQuestionSet(newGroup);
      fetchData();
      toast.success("Grupo de avaliações criado com sucesso!");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //Removendo um grupo
  const handleDeleteGroup = async (selectedGroup) => {
    try {
      await deleteQuestionSet(selectedGroup.id);
      fetchData();
      handleClose();
      toast.success("Grupo de avaliações excluído com sucesso!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalRemoveOpen(false);
    }
  };

  //Ativando um grupo
  const handleCheckboxChange = (selectedGroup) => {
    postActivateGroup(selectedGroup.questionSetName).then(() => fetchData());
  };

  //Criando uma questão
  const handleQuestionToGroup = () => {
    if (inputQuestionsValue.trim() !== "") {
      const newQuestion = {
        questionType: "RATING",
        questionName: inputQuestionsValue,
        questionDescription: "",
      };
      const updatedQuestions = [...questionsInput, newQuestion];
      setQuestionsInput(updatedQuestions);
      setInputQuestionsValue("");
      setShowADDQuestionsInput(false);
    } else {
      alert("Digite Algo no input para ser salvo!");
    }
  };

  //Removendo uma questão
  const handleRemoveQuestion = () => {
    const updatedQuestions = questionsInput.filter(
      (question) => question !== selectedQuestion
    );
    setQuestionsInput(updatedQuestions);
    setOpenSelectedQuestion(false);
  };

  //Atualizando uma questão
  const handleUpdateQuestion = async () => {
    const updatedQuestions = questionsInput.map((question) => {
      if (question === selectedQuestion) {
        if (valueNewTitleQuestion !== "") {
          setOpenSelectedQuestion(false);
          return {
            ...question,
            questionName: valueNewTitleQuestion,
            questionDescription: valueNewDescQuestion,
          };
        } else {
          toast.error("É necessário haver um título para a pergunta");
          return question;
        }
      }
      return question;
    });
    setQuestionsInput(updatedQuestions);
  };

  //Salvando todas as alterações
  const handleSaveChanges = async () => {
    if (questionsInput.length >= 2) {
      const changes = {
        questionSet: {
          numberOfStars: Number(numberInputStars),
          questionSetName: valueInputName,
          questions: questionsInput,
        },
      };
      try {
        await editQuestionSet(selectedGroupValue.id, changes);
        setShowADDQuestionsInput(false);
        handleClose();
        fetchData();
        toast.success("Alterações efetuadas com sucesso!");
      } catch (error) {
        console.log(error);
      }
    } else {
        toast.error("É necessário no mínimo uma pergunta")
    }
  };

  const handleModalRemoveClose = () => {
    setIsModalRemoveOpen(false);
  };

  //Controlando a abertura do modal geral do grupo
  const handleOpen = (group) => {
    setIsModalOpen(true);
    setSelectedGroupValue(group);
    setQuestionsInput(group.questions || []);
    setValueInputName(group.questionSetName);
    setNumberInputStars(group.numberOfStars);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setShowADDQuestionsInput(false);
    setQuestionsInput([]);
    setSelectedGroupValue(null);
  };

  //Controlando a abertura do modal das questões selecionadas
  const handleSelectedQuestionOpen = (item) => {
    setOpenSelectedQuestion(true);
    setSelectedQuestion(item);
    setValueNewTitleQuestion(item.questionName || "");
    setValueNewDescQuestion(item.questionDescription || "");
  };

  const handleSelectedQuestionClose = () => {
    setOpenSelectedQuestion(false);
  };

  return (
    <>
      <Button
        _hover={{}}
        _active={{ bgColor: "#acacac" }}
        bgColor={colorMode === "dark" ? "#ffffff" : "#1c222b"}
        onClick={() => {
          setShowInputGroup(!showInputGroup);
          showInputGroup === false && setNameGroupValue("");
        }}
        marginBottom="10px"
      >
        <Text
          marginRight="10px"
          color={colorMode === "dark" ? "#1c222b" : "#ffffff"}
        >
          Criar novo grupo de avaliações
        </Text>
      </Button>
      {showInputGroup && (
        <InputGroup size="sm" marginBottom="15px">
          <Input
            placeholder="Digite aqui o nome do novo agrupamento de avaliações"
            marginBottom="10px"
            variant="flushed"
            _focus={{
              boxShadow: "none",
              borderColor: colorMode === "dark" ? "#ffffff" : "#1c222b",
            }}
            borderColor={colorMode === "dark" ? "#ffffff" : "#1c222b"}
            color={colorMode === "dark" ? "#ffffff" : "#1c222b"}
            value={nameGroupValue}
            onChange={(event) => setNameGroupValue(event.target.value)}
          />
          <InputRightAddon
            width="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="none"
            border="none"
            borderBottom="1px solid"
            borderColor={colorMode === "dark" ? "#ffffff" : "#1c222b"}
            borderRadius="none"
          >
            <IconButton
              bg="none"
              _hover={{}}
              _active={{}}
              boxSize={1}
              onClick={handleCreatingNewGroup}
              isDisabled={nameGroupValue === ""}
            >
              <CheckIcon
                color={colorMode === "dark" ? "#ffffff" : "#1c222b"}
                style={{
                  transition: "color 0.3s ease",
                  color: colorMode === "dark" ? "#ffffff" : "#1c222b",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "green")}
                onMouseOut={(e) =>
                  (e.currentTarget.style.color =
                    colorMode === "dark" ? "white" : "#1c222b")
                }
              />
            </IconButton>
          </InputRightAddon>
        </InputGroup>
      )}

      {loading ? (
        <Container
          minWidth="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner />
        </Container>
      ) : (
        <Container
          bg={colorMode === "dark" ? "#14181E60" : "transparent"}
          border={colorMode === "dark" ? "none" : "1px solid black"}
          className="scrollbar"
          overflow="hidden"
          overflowY="auto"
          minWidth="100%"
          maxHeight="220px"
          borderRadius="10px"
          padding="5px"
          display="grid"
          margin="0px"
          gridTemplateColumns="repeat(2, 1fr)"
          gap={4}
        >
          {questionsSet?.questions.map((group, index) => (
            <Container
              key={index}
              bgColor="transparent"
              borderRadius="10px"
              border="1px solid"
              minWidth="350px"
              maxWidth="350px"
            >
              <Container
                padding="0px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading display="flex" alignItems="center">
                  <Checkbox
                    paddingRight="10px"
                    isChecked={group.activatedSet}
                    onChange={() => handleCheckboxChange(group)}
                    colorScheme="red"
                    iconColor="white"
                  />
                  <Heading
                    maxWidth="250px"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {group.questionSetName}
                  </Heading>
                </Heading>
                <Button
                  bg="transparent"
                  padding="0px"
                  _hover={{}}
                  _active={{}}
                  onClick={() => handleOpen(group)}
                >
                  <EditIcon
                    transition="color 0.3s ease-in-out"
                    _hover={{
                      color: "red",
                      transition: "color 0.3s ease-in-out",
                    }}
                    boxSize={5}
                  />
                </Button>
              </Container>
              <Text paddingTop="5px" paddingBottom="10px" fontSize={17}>
                <strong>
                  Número de perguntas:{" "}
                  {group.questions.map(
                    (question) => question.questionType === "OBSERVATION"
                  )
                    ? group.questions.length - 1
                    : group.questions.length}
                </strong>
              </Text>
              <Text fontSize={17}>
                <strong>Quantidade de estrelas: {group.numberOfStars}</strong>
              </Text>
              <StarsNumberOfStars numberOfStars={group.numberOfStars} />
            </Container>
          ))}
        </Container>
      )}
      <ModalEditingGroup
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        selectedGroupValue={selectedGroupValue}
        handleQuestionToGroup={handleQuestionToGroup}
        questionsInput={questionsInput}
        setInputQuestionsValue={setInputQuestionsValue}
        handleDeleteGroup={handleDeleteGroup}
        showADDQuestionsInput={showADDQuestionsInput}
        setShowADDQuestionsInput={setShowADDQuestionsInput}
        inputQuestionsValue={inputQuestionsValue}
        valueInputName={valueInputName}
        setValueInputName={setValueInputName}
        numberInputStars={numberInputStars}
        setNumberInputStars={setNumberInputStars}
        handleSaveChanges={handleSaveChanges}
        handleSelectedQuestionOpen={handleSelectedQuestionOpen}
        handleSelectedQuestionClose={handleSelectedQuestionClose}
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
        valueNewTitleQuestion={valueNewTitleQuestion}
        setValueNewTitleQuestion={setValueNewTitleQuestion}
        valueNewDescQuestion={valueNewDescQuestion}
        setValueNewDescQuestion={setValueNewDescQuestion}
        openSelectedQuestion={openSelectedQuestion}
        handleRemoveQuestion={handleRemoveQuestion}
        handleUpdateQuestion={handleUpdateQuestion}
        isModalRemoveOpen={isModalRemoveOpen}
        setIsModalRemoveOpen={setIsModalRemoveOpen}
        handleModalRemoveClose={handleModalRemoveClose}
      />
    </>
  );
}
