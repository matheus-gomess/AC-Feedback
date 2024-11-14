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

const CustomTooltip = ({ active, payload, label }) => {
  const { colorMode } = useColorMode();
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: "transparent", padding: "10px", border: colorMode === "dark" ? "1px solid white" : "1px solid black" }}>
        <p>{`${label}`}</p>
        <p>{`Média: ${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

export default function CartesianChart({ feedbacks }) {
  const { colorMode } = useColorMode();
  const [groupedFeedbacks, setGroupedFeedbacks] = useState([]);

  useEffect(() => {
    const averages = feedbacks?.map((feedback) => {
      const total = feedback?.notes.reduce((sum, note) => sum + note, 0);
      const count = feedback?.notes.length;
      return {
        name: feedback.date,
        Ideal: feedback?.maxRating,
        Notas: count ? total / count : 0,
      };
    });

    setGroupedFeedbacks(averages);
  }, [feedbacks]);

  const ticks = feedbacks && Array.from({ length: feedbacks[0]?.maxRating + 1 || 1 }, (_, i) => i);

  return groupedFeedbacks?.length > 0 ? (
    <ResponsiveContainer width="120%" height="100%">
      <ComposedChart
        width={500}
        height={200}
        data={groupedFeedbacks}
      >
        <XAxis
          dataKey="name"
          stroke={colorMode === "dark" ? "white" : "black"}
        />
        <YAxis
          stroke={colorMode === "dark" ? "white" : "black"}
          domain={[0, feedbacks[0]?.maxRating]}
          ticks={ticks}
        />
        <Tooltip content={<CustomTooltip />} />
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
