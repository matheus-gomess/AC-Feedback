import { Container, Text, useColorMode } from "@chakra-ui/react";
import { Bar, BarChart, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { formattingFirstName } from "utils/formattingTexts";

export default function AverageUsers({ notes, feedbacks }) {
    const { colorMode } = useColorMode();
    
    const calculateAverageRatings = (feedbacks) => {
        const userRatings = {};
    
        feedbacks.forEach(feedback => {
            const { reviewed, questions } = feedback;
            const formattedName = formattingFirstName(reviewed);
    
            const ratings = questions
                .filter(question => question.questionType === "RATING" && question.rating !== null)
                .map(question => question.rating);
    
            if (ratings.length > 0) {
                const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
                
                if (userRatings[formattedName]) {
                    userRatings[formattedName].sum += totalRating;
                    userRatings[formattedName].count += ratings.length;
                } else {
                    userRatings[formattedName] = { sum: totalRating, count: ratings.length };
                }
            }
        });
    
        return Object.entries(userRatings).map(([name, { sum, count }]) => ({
            name,
            Média: parseFloat((sum / count).toFixed(2))
        }));
    };

    const data = calculateAverageRatings(feedbacks);

    const ticks = Array.from({ length: notes + 1 }, (_, i) => i);
    return (
        <div>
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
                        <XAxis dataKey={"name"} stroke={colorMode === "dark" ? "white" : "black"}/>
                        <YAxis stroke={colorMode === "dark" ? "white" : "black"} domain={[0, notes]} ticks={ticks}/>
                        <Tooltip cursor={{ fill: colorMode === "dark" ? "#ffffff58" : "#00000057" }} wrapperStyle={{ color: "black" }}/>
                        <Legend />
                        <Bar dataKey="Média" fill="#971520" activeOpacity={0}/>
                    </BarChart>
                </ResponsiveContainer>
            </Container>
        </div>
    );
}
