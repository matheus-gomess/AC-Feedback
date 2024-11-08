import {
  Button,
  Text,
  InputGroup,
  Input,
  InputRightAddon,
  IconButton,
  Container,
  Heading,
  Tooltip,
  OrderedList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  CloseButton,
  ListItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  ModalFooter,
  useColorMode
} from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { RiFolderCloseFill, RiAlertFill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function ModalEditingGroup({
  isModalOpen,
  handleClose,
  selectedGroupValue,
  handleQuestionToGroup,
  questionsInput,
  setInputQuestionsValue,
  handleDeleteGroup,
  showADDQuestionsInput,
  setShowADDQuestionsInput,
  inputQuestionsValue,
  valueInputName,
  setValueInputName,
  numberInputStars,
  setNumberInputStars,
  handleSaveChanges,
  handleSelectedQuestionOpen,
  handleSelectedQuestionClose,
  selectedQuestion,
  openSelectedQuestion,
  valueNewTitleQuestion,
  setValueNewTitleQuestion,
  valueNewDescQuestion,
  setValueNewDescQuestion,
  handleRemoveQuestion,
  handleUpdateQuestion,
  isModalRemoveOpen,
  setIsModalRemoveOpen,
  handleModalRemoveClose
}) {
  const { colorMode } = useColorMode();
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading
              maxWidth="368px"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {selectedGroupValue && selectedGroupValue.questionSetName}
            </Heading>
            <CloseButton onClick={handleClose} />
          </ModalHeader>
          <ModalBody>
            <Container
              margin="0px"
              padding="0px"
              w="100%"
              h="40px"
              borderBottom="2px solid"
              paddingBottom="10px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              paddingRight="6px"
              marginBottom="15px"
            >
              <Text>
                <strong>Título do grupo:</strong>
              </Text>
              <Input
                disabled={selectedGroupValue?.writable === false}
                maxWidth="60%"
                value={valueInputName}
                paddingLeft="5px"
                onChange={(event) => setValueInputName(event.target.value)}
                borderColor="#777a80"
                _hover={{}}
                focusBorderColor="#700e17"
              />
            </Container>
            <Container
              margin="0px"
              padding="0px"
              w="100%"
              h="40px"
              borderBottom="2px solid"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              paddingRight="6px"
              marginBottom="15px"
            >
              <Text>
                <strong>Quantidade de notas:</strong>
              </Text>
              <NumberInput
                disabled={selectedGroupValue?.writable === false}
                size="sm"
                maxWidth="65px"
                value={numberInputStars}
                min={1}
                max={10}
                onChange={(value) => setNumberInputStars(value)}
                focusBorderColor="#700e17"
                borderColor="#777a80"
                _hover={{}}
              >
                <NumberInputField
                  readOnly
                  cursor="default"
                  borderColor="#777a80"
                  _hover={{}}
                />
                <NumberInputStepper borderColor="#777a80" _hover={{}}>
                  <NumberIncrementStepper borderColor="#777a80" _hover={{}} />
                  <NumberDecrementStepper borderColor="#777a80" _hover={{}} />
                </NumberInputStepper>
              </NumberInput>
            </Container>
            <Container padding="10px" borderRadius="6px">
              <Container
                padding="0px"
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  isDisabled={selectedGroupValue?.writable === false}
                  _hover={{}}
                  _active={{ bgColor: "#acacac" }}
                  color={colorMode === "dark" ? "#1a202c" : "white"}
                  bgColor={colorMode === "dark" ? "white" : "#1a202c"}
                  onClick={() => {
                    setShowADDQuestionsInput(!showADDQuestionsInput); showADDQuestionsInput === false && setInputQuestionsValue("");
                  }}
                  disabled={selectedGroupValue?.writable === false}
                >
                  Nova escala de avaliação
                </Button>
              </Container>
              {showADDQuestionsInput && (
                <InputGroup size="sm" marginTop="15px">
                  <Input
                    marginBottom="10px"
                    placeholder="Digite aqui o nome da nova pergunta"
                    variant="flushed"
                    borderColor={colorMode === "dark" ? "white" : "#1a202c"}
                    _focus={{
                      boxShadow: "none",
                      borderColor: colorMode === "dark" ? "white" : "#1a202c"
                    }}
                    value={inputQuestionsValue}
                    onChange={(event) =>
                      setInputQuestionsValue(event.target.value)
                    }
                  />
                  <InputRightAddon
                    width="50px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="none"
                    border="none"
                    borderBottom="1px solid"
                    borderColor={colorMode === "dark" ? "white" : "#1a202c"}
                    borderRadius="none"
                  >
                    <IconButton
                      bg="none"
                      _hover={{}}
                      _active={{}}
                      boxSize={1}
                      onClick={handleQuestionToGroup}
                    >
                      <CheckIcon
                        style={{
                          transition: "color 0.3s ease",
                          color: colorMode === "dark" ? "white" : "#1a202c"
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.color = "green")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.color =
                            colorMode === "dark" ? "white" : "#1a202c")
                        }
                      />
                    </IconButton>
                  </InputRightAddon>
                </InputGroup>
              )}
              <Container
                borderLeft="1px solid"
                borderLeftColor={colorMode === "dark" ? "white" : "#1a202c"}
                marginTop="20px"
              >
                <OrderedList width="100%">
                  {questionsInput
                    .filter((item) => item.questionType !== "OBSERVATION")
                    .map((item, index) => (
                      <ListItem
                        key={index}
                        id="tasks"
                        color={colorMode === "dark" ? "white" : "#1a202c"}
                        marginBottom="10px"
                      >
                        <Text
                          _hover={{
                            cursor:
                              selectedGroupValue?.writable === true
                                ? "pointer"
                                : "not-allowed"
                          }}
                          color={
                            selectedGroupValue?.writable === false
                              ? "#777a80"
                              : colorMode === "dark"
                              ? "white"
                              : "#1a202c"
                          }
                          userSelect="none"
                          onClick={() =>
                            selectedGroupValue?.writable === true &&
                            handleSelectedQuestionOpen(item)
                          }
                        >
                          <strong>{item.questionName}</strong>
                          <EditIcon marginLeft="5px" />
                        </Text>
                      </ListItem>
                    ))}
                </OrderedList>
              </Container>
            </Container>
            <Tooltip label="Excluir Grupo">
              <Button
                marginTop="15px"
                colorScheme="red"
                color="white"
                onClick={() => {
                  if (selectedGroupValue.activatedSet === true) {
                    toast.error("Não é possível excluir um grupo ativado");
                  } else {
                    setIsModalRemoveOpen(true);
                  }
                }}
                _hover={{ bg: "#680000" }}
                padding="0px"
              >
                <RiFolderCloseFill size={22.5} />
              </Button>
            </Tooltip>
            <Tooltip
              label={
                selectedGroupValue?.writable === true
                  ? "Salvar Alterações"
                  : "Não é possível fazer alterações pois já se tem avaliações criadas com esse grupo"
              }
            >
              <Button
                color="white"
                isDisabled={selectedGroupValue?.writable === false}
                onClick={handleSaveChanges}
                marginTop="15px"
                marginLeft="10px"
                bg="green"
                padding="0px"
                _hover={{ bg: "#005a00" }}
              >
                <CheckIcon />
              </Button>
            </Tooltip>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isModalRemoveOpen}
        onClose={handleModalRemoveClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading>Aviso!</Heading>
            <RiAlertFill size="36px" />
          </ModalHeader>
          <ModalBody>
            Você tem certeza que deseja{" "}
            <Text
              as="span"
              textDecoration="underline"
              textDecorationColor="red"
            >
              excluir esse grupo de questões
            </Text>
            ?
            <Text mt={4} color="red">
              <strong>
                Você perderá todos os dados referentes a este grupo!
              </strong>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleDeleteGroup(selectedGroupValue)}
              colorScheme="red"
              color="white"
            >
              Sim
            </Button>
            <Button
              onClick={handleModalRemoveClose}
              bgColor={colorMode === "dark" ? "white" : "#1a202c"}
              color={colorMode === "dark" ? "#1a202c" : "white"}
              _hover={{}}
              _active={{}}
              ml={3}
            >
              Não
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={openSelectedQuestion}
        onClose={handleSelectedQuestionClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading>
              <Heading
                minWidth="340px"
                maxWidth="340px"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {selectedQuestion.questionName}
              </Heading>
            </Heading>
            <CloseButton onClick={handleSelectedQuestionClose} />
          </ModalHeader>
          <ModalBody>
            <Text fontSize={17}>
              <strong>Título:</strong>
            </Text>
            <Input
              borderColor="#777a80"
              _hover={{}}
              marginBottom="20px"
              value={valueNewTitleQuestion}
              onChange={(event) => setValueNewTitleQuestion(event.target.value)}
              focusBorderColor="#971520"
            />
            <Text fontSize={17}>
              <strong>Descrição:</strong>
            </Text>
            <Input
              borderColor="#777a80"
              _hover={{}}
              value={valueNewDescQuestion}
              placeholder="Digite a descrição da pergunta"
              onChange={(event) => setValueNewDescQuestion(event.target.value)}
              focusBorderColor="#971520"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              color="white"
              _hover={{ bg: "#680000" }}
              marginRight={5}
              onClick={handleRemoveQuestion}
            >
              Apagar Pergunta
            </Button>
            <Button
              bg="green"
              color="white"
              _hover={{ bg: "#005a00" }}
              onClick={handleUpdateQuestion}
            >
              Salvar Alterações
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
