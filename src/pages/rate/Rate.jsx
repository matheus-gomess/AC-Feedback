import { Box, Container } from "@chakra-ui/react";
import ButtonPages from "../generalComponents/headerPages/ButtonPages";
import Calendar from "../generalComponents/headerPages/Calendar";
import NewAvaliation from "./components/NewAvaliation";
import CreatedAvaliations from "./components/CreatedAvaliations";
import User from "../generalComponents/headerPages/User";

export default function Avaliar() {
    return (
        <div style={{ backgroundColor: "#26272D", minHeight: "100vh" }}>
            <Box as="header" bgColor="#1c222b" padding="20px" display="flex" justifyContent="space-between" maxHeight="10vh" alignItems="center" width="100%">
                <Container maxWidth="294px" maxHeight="65px" padding="0px" margin="0px">

                </Container>
                <Container display="flex" justifyContent="space-between" alignItems="center" padding="0px" margin="0px" maxW="300px">
                    <ButtonPages title="FEEDBACKS" navigate="/home/feedbacks" />
                    <ButtonPages title="HOME" navigate="/home" />
                </Container>
                <Container maxW="300px" padding="0px" margin="0px" display="flex">
                    <Calendar />
                    <User />
                </Container>
            </Box>
            <Box as="main" minHeight="83vh" display="flex" justifyContent="center" alignItems="center">
                <CreatedAvaliations />
                <NewAvaliation />
            </Box>
        </div>
    )
}