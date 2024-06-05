import { Container, IconButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, ModalFooter, Text, Flex, Heading, Button, Progress } from "@chakra-ui/react";
import { CalendarIcon, CloseIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import formatiingText from "../../../utils/formattingText";
import { array } from "../array";
import { useState } from "react";
import { TiStar } from "react-icons/ti";

export default function SeeMoreAvaliation({ isOpen, onClose, avaliation, observation, averageRating, arrayRatings }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const filteredQuestions = array.filter(item => item.type === "rate");
    const [rating, setRating] = useState(arrayRatings[0]);

    const clickNext = () => {
        setCurrentQuestion((prev) => prev + 1);
        setRating(arrayRatings[currentQuestion + 1]);
    };

    const clickPrevious = () => {
        setCurrentQuestion((prev) => prev - 1);
        setRating(arrayRatings[currentQuestion - 1]);
    };


    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay>
                    <ModalContent bg="#1c222b" minW="600px" minH="500px" borderLeft="6px solid" borderLeftColor="#971520">
                        <ModalHeader padding="0px">
                            <Container bg="#1c222b" minW="100%" display="flex" alignItems="center" justifyContent="space-between" borderTopRightRadius="8px" color="white">
                                <Heading size="ms">Avaliação feita por: {formatiingText(avaliation.reviewer)}</Heading>
                                <IconButton onClick={onClose} bg="transparent" _hover={{}} _active={{}}>
                                    <CloseIcon color="white" />
                                </IconButton>
                            </Container>
                        </ModalHeader>
                        <ModalBody color="#ffffff">
                            <Flex alignItems="center" fontSize="20px">
                                <CalendarIcon marginRight="5px" />
                                <strong>
                                    <Text>{avaliation.date}</Text>
                                </strong>
                            </Flex>
                            <Flex>
                                <strong>
                                    <Text marginRight="8px">Pessoa avaliada:</Text>
                                </strong>
                                {formatiingText(avaliation.reviewed)}
                            </Flex>
                            <Flex>
                                <strong>
                                    <Text marginRight="8px">Observação feita:</Text>
                                </strong>
                                {observation}
                            </Flex>
                            <strong>
                                <Text>Média dos Ratings: {averageRating}</Text>
                            </strong>
                            <Container width="100%" minHeight="300px" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                                <Container textAlign="center">
                                    <Heading>{filteredQuestions[currentQuestion].question}</Heading>
                                    <Text>{filteredQuestions[currentQuestion].questionDescription}</Text>
                                </Container>
                                <div style={{ display: "flex" }}>
                                    {[...Array(5)].map((star, i) => {
                                        const ratingValue = i + 1;

                                        return (
                                            <label key={ratingValue}>
                                                <input
                                                    type="radio"
                                                    style={{ opacity: "0" }}
                                                    name="rating"
                                                    value={ratingValue}
                                                />
                                                <TiStar
                                                    className="star"
                                                    color={ratingValue <= (rating) ? "#971520" : "#ffffff2b"}
                                                    size={50}
                                                />
                                                <Text
                                                    textAlign="center"
                                                    position="relative"
                                                    bottom="10px"
                                                    color="white"
                                                >
                                                    <strong>{ratingValue}</strong>
                                                </Text>
                                            </label>
                                        );
                                    })}
                                </div>
                            </Container>
                        </ModalBody>
                        <ModalFooter display="flex" alignItems="center" justifyContent="space-between" padding="5px" paddingLeft="20px" minW="100%">
                            <Container
                                padding="0px"
                                margin="0px"
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                maxW="100px"
                            >
                                {currentQuestion !== 0 && (
                                    <Button
                                        padding="0px"
                                        bg="transparent"
                                        _hover={{ border: "1px solid", borderColor: "#ffffff" }}
                                        _active={{ bgColor: "#00000057" }}
                                        onClick={clickPrevious}
                                    >
                                        <ArrowLeftIcon color="#ffffff" />
                                    </Button>
                                )}
                                {currentQuestion !== filteredQuestions.length - 1 && (
                                    <Button
                                        padding="0px"
                                        bg="transparent"
                                        _hover={{ border: "1px solid", borderColor: "#ffffff" }}
                                        _active={{ bgColor: "#00000057" }}
                                        onClick={clickNext}
                                    >
                                        <ArrowRightIcon color="#ffffff" />
                                    </Button>
                                )}
                            </Container>
                            <Container maxWidth="300px" margin="0px">
                                <Progress
                                    value={currentQuestion}
                                    max={filteredQuestions.length - 1}
                                    borderRadius="20px"
                                    colorScheme="red"
                                    size="xs" 
                                    maxWidth="300px"
                                    />
                            </Container>

                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </div>
    );
}
