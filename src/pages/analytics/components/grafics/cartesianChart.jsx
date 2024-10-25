import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Heading, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

export default function CartesianChart({ notes, feedbacks }) {
  const { colorMode } = useColorMode();
  const [groupedFeedbacks, setGroupedFeedbacks] = useState([]);

  useEffect(() => {
    const grouped = feedbacks.reduce((acc, feedback) => {
      const date = feedback.date.split("T")[0]; // Extrai a data

      // Inicializa os valores para a data se não existirem
      if (!acc[date]) {
        acc[date] = { total: 0, count: 0 };
      }

      // Extrai as avaliações e atualiza a soma e a contagem
      feedback.questions.forEach((question) => {
        if (question.rating) {
          // Verifica se a avaliação existe
          acc[date].total += question.rating;
          acc[date].count += 1;
        }
      });

      return acc;
    }, {});

    // Converte o objeto em um array com médias
    const averages = Object.keys(grouped).map((date) => ({
      name: format(parseISO(date), "dd/MM/yy"),
      Ideal: notes,
      Notas: grouped[date].count
        ? grouped[date].total / grouped[date].count
        : 0,
      date: (date), // Adiciona a data original para ordenação
    }));

    setGroupedFeedbacks(averages);
    console.log(averages);
  }, [feedbacks]);

  const ticks = Array.from({ length: notes + 1 }, (_, i) => i);

  return groupedFeedbacks.length > 0 ? (
    <ResponsiveContainer width="120%" height="100%">
      <ComposedChart
        width={500}
        height={200}
        data={groupedFeedbacks.sort((a, b) => new Date(a.date) - new Date(b.date))}
      >
        <XAxis
          dataKey="name"
          stroke={colorMode === "dark" ? "white" : "black"}
        />
        <YAxis
          stroke={colorMode === "dark" ? "white" : "black"}
          domain={[0, notes]}
          ticks={ticks}
        />
        <Tooltip />
        <Legend />
        <Area dataKey="Notas" fill="#0078d4" stroke="#0078d4" />
        <Line dataKey="Ideal" stroke="#9d9d9d" />
      </ComposedChart>
    </ResponsiveContainer>
  ) : (
    <Box width="120%" display="flex" justifyContent="center">
      <Heading color="#808080">Nenhum gráfico construído</Heading>
    </Box>
  );
}
