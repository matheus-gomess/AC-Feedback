import { useState, useEffect } from "react";
import { IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { colorMode } = useColorMode();

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
          <Tooltip
            label="Voltar ao topo"
            aria-label="Rolar para o topo"
            placement="left"
          >
            <IconButton
              position="fixed"
              bottom="20px"
              right="20px"
              size="lg"
              onClick={scrollToTop}
              icon={<ArrowUpIcon boxSize={6} color={colorMode === "dark" ? "black" : "white"} />}
              aria-label="Scroll to top"
              bgColor={colorMode === "dark" ? "#d4d8dc" : "#1a1f24"}
              _hover={{ bgColor: "#86111c" }}
              borderRadius="full"
            />
          </Tooltip>
      )}
    </>
  );
};

export default ScrollToTop;
