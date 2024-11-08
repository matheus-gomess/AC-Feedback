import { Box, Text, Container, Heading, Button, Flex } from "@chakra-ui/react";
import { SettingsIcon, AddIcon } from "@chakra-ui/icons";
import EditParticipants from "./components/users/editParticipants";
import CreatingGroupAvaliations from "./components/groupAvaliations/creatingGroupAvaliations";
import { useState } from "react";

export default function Settings() {
  const [showInputGroup, setShowInputGroup] = useState(false);
  const [nameGroupValue, setNameGroupValue] = useState("");

  return (
    <Flex
      height="inherit"
      minHeight="90vh"
      justify="center"
      align="center"
      pb="100px"
    >
      <Container
        border="2px solid"
        borderColor="#700e17"
        maxW="800px"
        p="6"
        borderRadius="12px"
        boxShadow="0px 0px 13px 3px rgba(0, 0, 0, 0.35)"
      >
        <Flex align="center" mb="4">
          <SettingsIcon boxSize="10" mr="3" color="#FFD700" /> {/* Cor ícone */}
          <Box>
            <Heading as="h2" size="lg">
              Configurações do Formulário
            </Heading>
            <Text fontSize="md" color="#808080">
              Configure aqui os grupos de avaliações e todos os usuários
            </Text>
          </Box>
        </Flex>

        <Flex justify="space-between" mb="4" align="center">
          <Box w="auto">
            <EditParticipants />
          </Box>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            variant="solid"
            height="36px"
            onClick={() => {
              setShowInputGroup(!showInputGroup);
              showInputGroup === false && setNameGroupValue("");
            }}
          >
            Criar novo grupo de avaliações
          </Button>
        </Flex>

        <Box mt="30px">
          <CreatingGroupAvaliations nameGroupValue={nameGroupValue} setNameGroupValue={setNameGroupValue} showInputGroup={showInputGroup} setShowInputGroup={setShowInputGroup}/>
        </Box>
      </Container>
    </Flex>
  );
}
