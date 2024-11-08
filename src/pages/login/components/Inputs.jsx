import { useState } from "react";
import {
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Container,
  useColorMode
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Inputs({ title, placeholder, type, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const {colorMode} = useColorMode();

  return (
    <>
      <Container padding="0px">
        <Text color={colorMode === "dark" ? "#1a202c" : "white"}>
          <strong>{title}:</strong>
        </Text>
        <InputGroup marginBottom="10px">
          <Input
            color={colorMode === "dark" ? "#1a202c" : "white"}
            paddingY="20px"
            border={colorMode === "dark" ? "1px solid #1a202c" : "1px solid white"}
            focusBorderColor="#971520"
            borderRadius="5px"
            bgColor="transparent"
            _hover={{}}
            placeholder={placeholder}
            _placeholder={{ color: colorMode === "dark" ? "gray.400" : "gray.200" }}
            type={type === "password" && showPassword ? "text" : type}
            paddingRight={type === "password" ? "2.5rem" : "0px"}
            variant="filled"
            value={value}
            onChange={onChange}
          />
          {type === "password" && (
            <InputRightElement>
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleClick}
                bg="transparent"
                _hover={{ bg: "transparent" }}
              >
                {showPassword ? (
                  <ViewOffIcon color={colorMode === "dark" ? "#1a202c" : "white"} />
                ) : (
                  <ViewIcon color={colorMode === "dark" ? "#1a202c" : "white"} />
                )}
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
      </Container>
    </>
  );
}
