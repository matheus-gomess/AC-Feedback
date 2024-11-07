import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Container,
  Select,
} from "@chakra-ui/react";
import { formattingName } from "utils/formattingTexts";
import { listUsers } from "services/users";

export default function RatingModal({ isOpen, handleClose, handleClick }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [participants, setParticipants] = useState([]);

  const fetchParticipants = async () => {
    try {
      const response = await listUsers();
      setParticipants(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  const handleExecuteClick = () => {
    handleClick(selectedOption);
  };

  const handleCloseModal = () => {
    setSelectedOption("");
    handleClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Escolha o participante que deseja avaliar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              <Select
                placeholder="Escolha o participante"
                onChange={handleSelectChange}
                value={selectedOption}
                focusBorderColor="#971520"
              >
                {participants.map((reviewer) => (
                  <option>
                    {formattingName(reviewer.name)}
                  </option>
                ))}
              </Select>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleExecuteClick}
              colorScheme="red"
              isDisabled={selectedOption === ""}
              color="white"
            >
              Começar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
