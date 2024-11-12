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

const CustomTooltip = ({ active, payload, label }) => {
  const { colorMode } = useColorMode();
  if (active && payload) {
    return (
      <div style={{ backgroundColor: "transparent", padding: "10px", border: colorMode === "dark" ? "1px solid white" : "1px solid black" }}>
        <p>{`${label}`}</p>
        <p>{`Média: ${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

export default function CartesianChart({ notes, feedbacks }) {
  const { colorMode } = useColorMode();
  const [groupedFeedbacks, setGroupedFeedbacks] = useState([]);

  useEffect(() => {
    const grouped = feedbacks.reduce((acc, feedback) => {
      const date = feedback.date.split("T")[0];

      if (!acc[date]) {
        acc[date] = { total: 0, count: 0 };
      }

      feedback.questions.forEach((question) => {
        if (question.rating) {
          acc[date].total += question.rating;
          acc[date].count += 1;
        }
      });

      return acc;
    }, {});

    const averages = Object.keys(grouped).map((date) => ({
      name: format(parseISO(date), "dd/MM/yy"),
      Ideal: notes,
      Notas: grouped[date].count
        ? grouped[date].total / grouped[date].count
        : 0,
      date: (date),
    }));

    setGroupedFeedbacks(averages);
  }, [feedbacks, notes]);

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
        <Tooltip content={<CustomTooltip />}/>
        <Legend />
        <Area dataKey="Notas" fill="#86111c" stroke="#971520" />
        <Line dataKey="Ideal" stroke="#9d9d9d" />
      </ComposedChart>
    </ResponsiveContainer>
  ) : (
    <Box width="120%" display="flex" justifyContent="center">
      <Heading color="#808080">Nenhum gráfico construído</Heading>
    </Box>
  );
}
