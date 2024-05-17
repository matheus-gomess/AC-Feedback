import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ButtonPages({ title, navigate, isActualRoute }) {
    const nav = useNavigate();

    return (
        <Button
            bg="transparent"
            onClick={() => { nav(navigate) }}
            _hover={{}}
            _active={{ bg: "rgba(0, 0, 0, 0.473)" }}
            css={{
                color: isActualRoute ? "#BA303B" : "#ffffff",
                textDecoration: "none",
                padding: "0px",
                fontSize: "14pt",
                fontFamily: "Montserrat",
                fontWeight: "700",
                "&:hover::after": {
                    width: isActualRoute ? "0%" : "110%",
                },

                "&::after": {
                    content: '" "',
                    width: "0%",
                    height: "4px",
                    backgroundColor: "#BA303B",
                    position: "absolute",
                    bottom: "4px",
                    left: "0px",
                    transition: "0.4s ease-in-out",
                },
            }}>
            {title}
        </Button >
    );
};