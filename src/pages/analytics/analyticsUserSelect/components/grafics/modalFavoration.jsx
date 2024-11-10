import { CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Heading,
  Text,
  Stack,
  useColorMode,
  IconButton,
  Tag,
  Container,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formattingFirstName } from "utils/formattingTexts";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function ModalFavoration({ isOpen, onClose, topic, feedbacks }) {
  console.log(feedbacks);
  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent minW="600px" minH="400px">
        <ModalHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={4}
          paddingBottom="5px"
        >
          <Heading
            size="lg"
            color={colorMode === "dark" ? "white" : "black"}
            display="flex"
            alignItems="center"
            gap="10px"
          >
            {topic}
            {topic === "Favoráveis" ? (
              <FaCheck color="green" style={{ marginLeft: "10px" }} />
            ) : (
              <IoClose size={50} color="red" />
            )}
          </Heading>
          <IconButton
            onClick={onClose}
            bg="transparent"
            _hover={{}}
            _active={{}}
            icon={<CloseIcon />}
            aria-label="Fechar"
            position="absolute"
            top={4}
            right={4}
          />
        </ModalHeader>
        <ModalBody p={6}>
          <Container
            className="scrollbar"
            padding="10px"
            maxW="100%"
            maxH="300px"
            overflow="hidden"
            overflowY="auto"
            borderRadius="5px"
          >
            <Stack spacing={4}>
              {feedbacks.map((feedback, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  bg="gray.200"
                  boxShadow="sm"
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Text color="gray.900">
                      <strong>
                        De {formattingFirstName(feedback.reviewer)} para{" "}
                        {formattingFirstName(feedback.reviewed)}
                      </strong>
                    </Text>
                    <Tag
                      bg="black"
                      color={topic === "Favoráveis" ? "#9ae6b4" : "red"}
                    >
                      <strong>Média: {feedback.average}</strong>
                    </Tag>
                    <IconButton
                      onClick={onClose}
                      bg="transparent"
                      _hover={{}}
                      _active={{}}
                      icon={<ExternalLinkIcon color="blue" fontSize={20} />}
                      aria-label="Abrir Todo o Feedback"
                    />
                  </Stack>
                  <Box mt={2}>
                    <Text color="black">
                      <strong>
                        {format(parseISO(feedback.date), "dd/MM/yyyy", {
                          locale: ptBR,
                        })}
                      </strong>
                    </Text>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
