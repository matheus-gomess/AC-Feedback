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
    ModalFooter
} from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { RiFolderCloseFill } from "react-icons/ri";

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
    handleUpdateQuestion
}) {
    return (
        <>
            <Modal isOpen={isModalOpen} onClose={handleClose} isCentered>
                <ModalOverlay />
                <ModalContent bg="#1c222b" color="white">
                    <ModalHeader display="flex" alignItems="center" justifyContent="space-between">
                        <Heading
                            maxWidth="368px"
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}>
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
                            <Text><strong>Título do grupo:</strong></Text>
                            <Input disabled={selectedGroupValue?.writable === false} maxWidth="60%" value={valueInputName} paddingLeft="5px" onChange={(event) => setValueInputName(event.target.value)} focusBorderColor="#700e17" />
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
                            <NumberInput disabled={selectedGroupValue?.writable === false} size='sm' maxWidth="65px" value={numberInputStars} min={1} max={10} onChange={(value) => setNumberInputStars(value)} focusBorderColor="#700e17">
                                <NumberInputField readOnly cursor="default" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper color="white" />
                                    <NumberDecrementStepper color="white" />
                                </NumberInputStepper>
                            </NumberInput>
                        </Container>
                        <Container padding="10px" borderRadius="6px">
                            <Container padding="0px" width="100%" display="flex" alignItems="center" justifyContent="space-between">
                                <Button isDisabled={selectedGroupValue?.writable === false} _hover={{}} _active={{ bgColor: "#acacac" }} bgColor="#ffffff" onClick={() => setShowADDQuestionsInput(!showADDQuestionsInput)} disabled={selectedGroupValue?.writable === false}>
                                    Nova escala de avaliação
                                </Button>
                            </Container>
                            {showADDQuestionsInput &&
                                <InputGroup size="sm" marginTop="15px">
                                    <Input
                                        marginBottom="10px"
                                        variant="flushed"
                                        _focus={{
                                            boxShadow: "none",
                                            borderColor: "#ffffff",
                                        }}
                                        color="white"
                                        value={inputQuestionsValue}
                                        onChange={(event) => setInputQuestionsValue(event.target.value)}
                                    />
                                    <InputRightAddon
                                        width="50px"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        bg="none"
                                        border="none"
                                        borderBottom="1px solid"
                                        borderColor="white"
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
                                                    color: "white",
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.color = "green"}
                                                onMouseOut={(e) => e.currentTarget.style.color = "white"}
                                            />
                                        </IconButton>
                                    </InputRightAddon>
                                </InputGroup>
                            }
                            <Container borderLeft="1px solid" borderLeftColor="white" marginTop="20px">
                                <OrderedList width="100%">
                                    {questionsInput
                                        .filter(item => item.questionType !== "OBSERVATION")
                                        .map((item, index) => (
                                            <ListItem key={index} id="tasks" color="white" marginBottom="10px" >
                                                <Text _hover={{ cursor: selectedGroupValue?.writable === true ? "pointer" : "not-allowed" }} color={selectedGroupValue?.writable === false ? "#777a80" : "white"} userSelect="none" onClick={() => selectedGroupValue?.writable === true && handleSelectedQuestionOpen(item)}>
                                                    <strong>{item.questionName}</strong>
                                                    <EditIcon marginLeft="5px" />
                                                </Text>
                                            </ListItem>
                                        ))}
                                </OrderedList>
                            </Container>
                        </Container>
                        <Tooltip label="Excluir Grupo">
                            <Button marginTop="15px" colorScheme="red" onClick={() => handleDeleteGroup(selectedGroupValue)} _hover={{ bg: "#680000" }} padding="0px"><RiFolderCloseFill size={22.5} /></Button>
                        </Tooltip>
                        <Tooltip label={selectedGroupValue?.writable === true ? "Salvar Alterações" : "Não é possível fazer alterações pois já se tem avaliações criadas com esse grupo"}>
                            <Button isDisabled={selectedGroupValue?.writable === false} onClick={handleSaveChanges} marginTop="15px" marginLeft="10px" bg="green" color="black" padding="0px" _hover={{ bg: "#005a00" }}><CheckIcon color="white" /></Button>
                        </Tooltip>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={openSelectedQuestion} onClose={handleSelectedQuestionClose} isCentered>
                <ModalOverlay />
                <ModalContent bgColor="#1c222b">
                    <ModalHeader display="flex" alignItems="center" justifyContent="space-between">
                        <Heading color="white">
                            <Heading minWidth="340px" maxWidth="340px" style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}>
                                {selectedQuestion.questionName}
                            </Heading>
                        </Heading>
                        <CloseButton color="white" onClick={handleSelectedQuestionClose} />
                    </ModalHeader>
                    <ModalBody>
                        <Text fontSize={17} color="white"><strong>Título:</strong></Text>
                        <Input color="white" marginBottom="20px" value={valueNewTitleQuestion} onChange={(event) => setValueNewTitleQuestion(event.target.value)} focusBorderColor="#971520" />
                        <Text fontSize={17} color="white"><strong>Descrição:</strong></Text>
                        <Input color="white" value={valueNewDescQuestion} placeholder="Digite a descrição da pergunta" onChange={(event) => setValueNewDescQuestion(event.target.value)} focusBorderColor="#971520" />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" _hover={{ bg: "#680000" }} marginRight={5} onClick={handleRemoveQuestion}>Apagar Pergunta</Button>
                        <Button bg="green" color="white" _hover={{ bg: "#005a00" }} onClick={handleUpdateQuestion}>Salvar Alterações</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
