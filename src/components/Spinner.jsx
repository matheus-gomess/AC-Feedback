import { Spinner, useColorMode } from "@chakra-ui/react";

export default function PrincipalSpinner() {
    const { colorMode } = useColorMode();

    return (
        <Spinner
            thickness="5px"
            width="75px"
            height="75px"
            speed="0.4s"
            color={colorMode === "dark" ? "#700e17" : "#1a202c"}
        />
    )
}