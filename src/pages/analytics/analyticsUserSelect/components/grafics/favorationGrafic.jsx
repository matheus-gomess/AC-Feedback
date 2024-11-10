import {
  Container,
  Heading,
  useColorMode,
  Box,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import ModalFavoration from "./modalFavoration";

const CustomTooltip = ({ active, payload, label }) => {
  const { colorMode } = useColorMode();
  if (active && payload) {
    return (
      <div
        style={{
          backgroundColor: "transparent",
          padding: "10px",
          border: colorMode === "dark" ? "1px solid white" : "1px solid black",
        }}
      >
        <p>{`${label}`}</p>
        <p>{`Feedback(s): ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function FavorationGrafic({ feedbacks, notes }) {
  const { colorMode } = useColorMode();
  const [favoraveis, setFavoraveis] = useState([]);
  const [naoFavoraveis, setNaoFavoraveis] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFeedbacks, setSelectedFeedbacks] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const calcularFavoraveis = () => {
      const favoravelList = [];
      const naoFavoravelList = [];

      feedbacks.forEach((feedback) => {
        const ratings = feedback.questions
          .filter((q) => q.questionType === "RATING" && q.rating !== null)
          .map((q) => q.rating);

        if (ratings.length > 0) {
          const average =
            ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
          const feedbackWithAverage = { ...feedback, average };
          if (average > notes / 2) {
            favoravelList.push(feedbackWithAverage);
          } else {
            naoFavoravelList.push(feedbackWithAverage);
          }
        }
      });

      setFavoraveis(favoravelList);
      setNaoFavoraveis(naoFavoravelList);
    };

    calcularFavoraveis();
  }, [feedbacks, notes]);

  const data = [
    { name: "Favoráveis", value: favoraveis.length },
    { name: "Não Favoráveis", value: naoFavoraveis.length },
  ];

  const handleBarClick = (name) => {
    setSelectedType(name);
    setSelectedFeedbacks(name === "Favoráveis" ? favoraveis : naoFavoraveis);
    onOpen();
  };

  return (
    <Container
      bgColor={colorMode === "dark" ? "#2b3442" : "transparent"}
      borderRadius="10px"
      border="1px solid"
      borderColor={colorMode === "dark" ? "transparent" : "black"}
      minHeight="233px"
      padding="20px"
    >
      <Heading marginBottom="20px">Avaliações</Heading>

      <Flex alignItems="start" height="200px" width="100%">
        <Box flex="1">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke={colorMode === "dark" ? "white" : "black"}
              />
              <YAxis
                stroke={colorMode === "dark" ? "white" : "black"}
                domain={[0, feedbacks.length]}
                allowDecimals={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill: colorMode === "dark" ? "#ffffff58" : "#00000057",
                }}
              />
              <Bar dataKey="value">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.name === "Favoráveis" ? "green" : "red"}
                    onClick={() => handleBarClick(entry.name)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Flex>
      <ModalFavoration
        isOpen={isOpen}
        onClose={onClose}
        topic={selectedType}
        feedbacks={selectedFeedbacks}
      />
    </Container>
  );
}
