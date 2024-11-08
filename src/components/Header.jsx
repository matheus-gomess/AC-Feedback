import { Box, Container, Image, useColorMode } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ButtonPages from "./ButtonPages";
import User from "./User";
import AcDigitalLogoWhite from "../assets/acdigitalwhite.png";
import AcDigitalLogoBlack from "../assets/acdigitalblack.png";
import { getUser } from "storage/get-user";

function Header() {
  const location = useLocation();
  const user = getUser();
  const verifyAdm = user?.role === "ADMIN";
  const { colorMode } = useColorMode();

  const getMaxWidth = () => {
    return verifyAdm ? "800px" : "400px";
  };

  const routes = [
    {
      name: "Home",
      path: "/home"
    },
    {
      name: "Avaliar",
      path: "/home/rate"
    },
    {
      name: "Feedbacks",
      path: "/home/feedbacks"
    },
    {
      name: "Análises",
      path: "/home/analytics"
    },
    {
      name: "Configurações",
      path: "/home/settings"
    }
  ];

  return (
    <div>
        <Box
          as="header"
          padding="20px"
          display="flex"
          position="fixed"
          top="0px"
          bgColor={colorMode === "dark" ? "#1a202c" : "white"}
          justifyContent="space-between"
          maxH="10vh"
          borderBottom="1px"
          alignItems="center"
          w="100%"
          zIndex="100"
        >
          <Container padding="0px" margin="0px" maxH="65px" maxW="294px">
            <Image
              src={
                colorMode === "dark" ? AcDigitalLogoWhite : AcDigitalLogoBlack
              }
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </Container>
          <Container
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="0px"
            maxW={getMaxWidth()}
          >
            {routes.map((route, index) =>
              (route.name === "Configurações" || route.name === "Análises") && !verifyAdm ? null : (
                <ButtonPages
                  title={route.name}
                  navigate={route.path}
                  key={index}
                  isActualRoute={route.path === location.pathname}
                />
              )
            )}
          </Container>
          <Container
            padding="0px"
            paddingRight="18px"
            margin="0px"
            display="flex"
            justifyContent="end"
            alignItems="center"
            maxW="294px"
          >
            <User />
          </Container>
        </Box>
    </div>
  );
}

export default Header;
