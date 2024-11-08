import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Button, Text, ModalBody, Heading, ModalFooter, Flex, Container, Tooltip, Input, Select, useColorMode, Box } from "@chakra-ui/react";
import { formattingName, APIformattingName } from "utils/formattingTexts";
import { CheckIcon } from "@chakra-ui/icons";
import { FaUserEdit, FaUserSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { listUsers, editUser, deleteUser } from "services/users";
import { RiAlertFill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function ModalEditingLogParticipant({ isOpenEditParticipantSelected, handleCloseEditParticipantSelected, infoSelectedParticipant, setParticipants, showButtonConfirm, setShowButtonConfirm }) {
    const { colorMode } = useColorMode();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newValueName, setNewValueName] = useState("");
    const [newValueEmail, setNewValueEmail] = useState("");
    const [newUserType, setNewUserType] = useState("");
    const participantId = infoSelectedParticipant?.id;

    useEffect(() => {
        if (infoSelectedParticipant) {
            setNewValueName(formattingName(infoSelectedParticipant.name));
            setNewValueEmail(infoSelectedParticipant.email);
            setNewUserType(infoSelectedParticipant.userType);
        }
    }, [infoSelectedParticipant]);

    //Atualizando informações do usuário selecionado
    const sendNewInfoUser = async () => {
        const data = {
            email: newValueEmail,
            name: APIformattingName(newValueName),
            userType: newUserType
        }
        try {
            await editUser(infoSelectedParticipant.id, data);
            handleCloseEditParticipantSelected();
            const participantsList = await listUsers();
            setParticipants(participantsList);
            toast.success("Alterações efetuadas com sucesso!")
        } catch (error) {
            console.log(error)
        }
        setShowButtonConfirm(false)
    }

    //Deletando usuário selecionado
    const deleteParticipantSelected = async (id) => {
        try {
            await deleteUser(id);
            setIsModalOpen(false);
            handleCloseEditParticipantSelected();
            const participantsList = await listUsers();
            setParticipants(participantsList);
            toast.success("Usuário apagado com sucesso!");
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickEdit = () => {
        setShowButtonConfirm(!showButtonConfirm);
        setNewValueName(formattingName(infoSelectedParticipant.name));
        setNewValueEmail(infoSelectedParticipant.email);
        setNewUserType(infoSelectedParticipant.userType);
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <Modal isOpen={isOpenEditParticipantSelected} onClose={handleCloseEditParticipantSelected} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Heading>
                            {infoSelectedParticipant && formattingName(infoSelectedParticipant.name)}
                        </Heading>
                        <ModalCloseButton onClick={handleCloseEditParticipantSelected} />
                    </ModalHeader>
                    <ModalBody fontSize={18} minHeight="150px" display="flex" alignItems="center" paddingLeft="40px" >
                        <Flex direction="column" alignItems="start" display="flex" justify="space-between" minH="100px" width="100%">
                            <Container padding="0px" marginBottom="10px">
                                <Text><strong>Nome:</strong></Text>
                                {showButtonConfirm === false ?
                                    <Text>{infoSelectedParticipant && formattingName(infoSelectedParticipant.name)}</Text>
                                    :
                                    <Input
                                        maxWidth="90%"
                                        padding="0px"
                                        value={newValueName}
                                        onChange={(event) => setNewValueName(event.target.value)}
                                        border="none"
                                        borderBottom="1px solid"
                                        borderRadius="none"
                                        _hover={{}}
                                        _focus={{
                                            boxShadow: "none",
                                            borderColor: "red",
                                            borderTopColor: "transparent",
                                            borderLeftColor: "transparent",
                                            borderRightColor: "transparent",
                                        }}
                                        fontSize="18px"
                                    ></Input>
                                }

                            </Container>
                            <Container padding="0px" marginBottom="10px" >
                                <Text><strong>Email:</strong></Text>
                                {showButtonConfirm === false ?
                                    <Text>{infoSelectedParticipant && infoSelectedParticipant.email}</Text>
                                    :
                                    <Input maxWidth="90%" padding="0px" value={newValueEmail} onChange={(event) => setNewValueEmail(event.target.value)} border="none"
                                        borderBottom="1px solid"
                                        borderRadius="none"
                                        _hover={{}}
                                        _focus={{
                                            boxShadow: "none",
                                            borderColor: "red",
                                            borderTopColor: "transparent",
                                            borderLeftColor: "transparent",
                                            borderRightColor: "transparent",
                                        }}
                                        fontSize="18px"
                                    ></Input>
                                }
                            </Container>
                            <Container padding="0px" marginBottom="10px">
                                <Text><strong>Modelo:</strong> </Text>
                                {showButtonConfirm === false ?
                                    <Text>{infoSelectedParticipant && infoSelectedParticipant.userType === "PARTICIPANT" ? "Participante" : "Administrador"}</Text>
                                    :
                                    <Select borderColor="#3f454c" _hover={{}} value={newUserType} onChange={(event) => setNewUserType(event.target.value)} focusBorderColor="#FF0000">
                                        <option value="PARTICIPANT">Participante</option>
                                        <option value="ADMIN">Administrador</option>
                                    </Select>
                                }
                            </Container>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Container>
                            <Tooltip label="Excluir usuário">
                                <Button colorScheme="brand" color="white" bgColor="red" marginRight={5} _hover={{ bg: "#680000" }} onClick={() => setIsModalOpen(true)} padding="0px"><FaUserSlash size={22.5} /></Button>
                            </Tooltip>
                            <Tooltip label="Editar usuário">
                                <Button color="black" bgColor="white" _hover={{ bg: "#b1b1b1" }} marginRight={5} padding="0px" onClick={handleClickEdit}><FaUserEdit size={22.5} /></Button>
                            </Tooltip>
                        </Container>
                        {showButtonConfirm &&
                            <Tooltip label="Salvar alterações">
                                <Button bg="green" padding="0px" _hover={{ bg: "#005a00" }} onClick={sendNewInfoUser}><CheckIcon color="white" /></Button>
                            </Tooltip>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display="flex" alignItems="center" justifyContent="space-between"><Heading>Aviso!</Heading><RiAlertFill size="36px" />
                    </ModalHeader>
                    <ModalBody>
                        <Text fontSize="22px">Você tem certeza que deseja <Box as="span" textDecoration="underline" textDecorationColor="red">excluir o usuário {formattingName(infoSelectedParticipant?.name)}</Box>?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => participantId && deleteParticipantSelected(participantId)} colorScheme="red" color="white">
                            Sim
                        </Button>
                        <Button bgColor={colorMode === "dark" ? "white" : "#1a202c"} color={colorMode === "dark" ? "#1a202c" : "white"} _hover={{}} _active={{}} onClick={handleModalClose} ml={3}>
                            Não
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}