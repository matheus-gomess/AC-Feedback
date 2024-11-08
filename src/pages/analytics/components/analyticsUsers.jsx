import {
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Box,
    useColorMode,
    Tooltip,
    Icon,
    ModalFooter,
    Container
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PiLineSegmentsFill } from "react-icons/pi";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { listUsers } from "services/users";
import { formattingName } from "utils/formattingTexts";

export default function AnalyticsUsers() {
    const { colorMode } = useColorMode();
    const [openMainAnalytics, setOpenMainAnalytics] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [animation, setAnimation] = useState("entering");
    const [users, setUsers] = useState([]);

    const fadeStyles = {
        entering: { opacity: 1, transition: "opacity 0.25s ease-in" },
        exiting: { opacity: 0, transition: "opacity 0.25s ease-out" },
        exited: { display: "none" },
    };

    async function findParticipants() {
        try {
            const response = await listUsers();
            setUsers(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        findParticipants();
    }, []);

    const handleClosePrincipalModalAnalytics = () => {
        setOpenMainAnalytics(false);
        setSelectedUser(null)
    };

    const handleUserClick = (user) => {
        setAnimation("exiting");
        setTimeout(() => {
            setSelectedUser(user);
            setAnimation("entering");
        }, 250);
    };

    const handleBackToUserList = () => {
        setAnimation("exiting");
        setTimeout(() => {
            setSelectedUser(null);
            setAnimation("entering");
        }, 250);
    };

    return (
        <>
            <Button
                onClick={() => setOpenMainAnalytics(true)}
                padding="0px"
                variant="ghost"
                bg="transparent"
                _hover={{ bg: "rgba(0, 0, 0, 0.3)" }}
            >
                <Text display="flex" marginRight="10px"><strong>Métricas individuais</strong></Text>
                <PiLineSegmentsFill size={22.5} />
            </Button>
            <Modal isOpen={openMainAnalytics} onClose={handleClosePrincipalModalAnalytics} isCentered>
                <ModalOverlay />
                <ModalContent minWidth="500px" height="430.1px">
                    <Box style={fadeStyles[animation]}>
                        <ModalHeader>
                            {selectedUser ?
                                <>
                                    <Heading>{formattingName(selectedUser.name)}</Heading>
                                    <Text fontSize="16px" textColor="rgba(113, 128, 150, 0.6)" position="relative" bottom="6px"><strong style={{ textTransform: "uppercase" }}>{selectedUser.userType === "ADMIN" ? "administrador" : "participante"}</strong></Text>
                                </>
                                :
                                <Box display="flex" alignItems="center">
                                    <Heading>Análises de usuários</Heading>
                                    <Tooltip
                                        label="Neste modal, você vê análises dos usuários individualmente"
                                        aria-label="Tooltip explicando como funciona as análises"
                                    >
                                        <Icon
                                            w={3}
                                            position="relative"
                                            bottom="10px"
                                            _hover={{ cursor: "pointer" }}
                                        />
                                    </Tooltip>
                                </Box>
                            }
                            <ModalCloseButton onClick={handleClosePrincipalModalAnalytics} />
                        </ModalHeader>
                        <ModalBody minH="259px">
                            {selectedUser ? (
                                <>
                                    <Text>Análises sobre o {formattingName(selectedUser.name)}:</Text>
                                    <Text>Feedbacks recebidos:</Text>
                                    <Text>Média das notas recebidas pelo usuário:</Text>
                                </>
                            ) : (
                                <Box>
                                    <Text><strong>Escolha um usuário:</strong></Text>
                                    <Container bg={colorMode === "dark" ? "#14181E60" : "transparent"}
                                        border={colorMode === "dark" ? "none" : "1px solid black"}
                                        className="scrollbar"
                                        overflow="hidden"
                                        overflowY="auto"
                                        minWidth="100%"
                                        maxHeight="283px"
                                        borderRadius="10px"
                                        padding="0px"
                                        paddingBottom="10px"
                                    >
                                        {users.map(user => (
                                            <Button
                                                key={user.id}
                                                onClick={() => handleUserClick(user)}
                                                variant="ghost"
                                                width="100%"
                                                marginTop="10px"
                                                justifyContent="flex-start"
                                                _hover={{ bg: "rgba(0, 0, 0, 0.1)" }}
                                            >
                                                {formattingName(user.name)}
                                            </Button>
                                        ))}
                                    </Container>
                                </Box>
                            )}
                        </ModalBody>
                        <ModalFooter
                            display="flex"
                            alignItems="center"
                            justifyContent="start"
                            minW="100%"
                        >
                            {selectedUser &&
                                <Button
                                    padding="0px"
                                    bg="transparent"
                                    _hover={{ border: "1px solid", borderColor: colorMode === "dark" ? "white" : "#1a202c" }}
                                    _active={{ bgColor: "#00000057" }}
                                    onClick={handleBackToUserList}
                                >
                                    <ArrowLeftIcon color={colorMode === "dark" ? "white" : "#1a202c"} />
                                </Button>
                            }
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
}
