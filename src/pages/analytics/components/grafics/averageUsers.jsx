import { Box, Container, Heading, Text, useColorMode } from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { formattingFirstName } from "utils/formattingTexts";

export default function AverageUsers({ feedbacks, notes }) {
  const { colorMode } = useColorMode();

  // Função para calcular a média das notas de cada usuário
  const calculateAverageRatings = (feedbacks) => {
    return feedbacks?.map(({ reviewed, notes }) => {
      const sum = notes.reduce((acc, note) => acc + note, 0);
      const average = parseFloat((sum / notes.length).toFixed(2)); // Média com 2 casas decimais
      return { name: formattingFirstName(reviewed), Média: average };
    });
  };

  const data = calculateAverageRatings(feedbacks);

  return (
    <>
      {feedbacks?.length === 0 ? (
        <Container
          bgColor={colorMode === "dark" ? "#2b3442" : "transparent"}
          borderRadius="10px"
          border="1px solid"
          borderColor={colorMode === "dark" ? "transparent" : "black"}
          padding="20px"
          mb="30px"
          display="flex"
          flexDirection="column"
        >
          <Text fontSize="1.4rem" mb="10px">
            <strong>Média dos usuários</strong>
          </Text>
          <Box
            paddingLeft="20px"
            paddingRight="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="135px"
          >
            <Heading color="#808080">Nenhum Usuário</Heading>
          </Box>
        </Container>
      ) : (
        <Container
          bgColor={colorMode === "dark" ? "#2b3442" : "transparent"}
          borderRadius="10px"
          border="1px solid"
          borderColor={colorMode === "dark" ? "transparent" : "black"}
          padding="20px"
          mb="30px"
          display="flex"
          flexDirection="column"
        >
          <Text fontSize="1.4rem" mb="10px">
            <strong>Média dos usuários</strong>
          </Text>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                left: -30,
                bottom: -10,
              }}
            >
              <XAxis
                dataKey={"name"}
                stroke={colorMode === "dark" ? "white" : "black"}
              />
              <YAxis
                stroke={colorMode === "dark" ? "white" : "black"}
                domain={[0, notes]} // Definindo o limite máximo da Y para 5
              />
              <Tooltip
                cursor={{
                  fill: colorMode === "dark" ? "#ffffff58" : "#00000057",
                }}
                wrapperStyle={{ color: "black" }}
              />
              <Legend />
              <Bar dataKey="Média" fill="#971520" activeOpacity={0} />
            </BarChart>
          </ResponsiveContainer>
        </Container>
      )}
    </>
  );
}
