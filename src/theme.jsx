import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "white",
    useSystemColorMode: false
  },

  colors: {
    red: {
      50: "#FF0000",
      100: "#FF0000",
      200: "#FF0000",
      300: "#FF0000",
      400: "#FF0000",
      500: "#FF0000",
      600: "#FF0000",
      700: "#FF0000",
      800: "#FF0000",
      900: "#FF0000",
    }
  },


  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "#1a202c" : "#ffffff",
        color: props.colorMode === "dark" ? "#ffffff" : "#1a202c",
      },
      hr: {
        borderColor: props.colorMode === "dark" ? "#ffffff" : "#1a202c",
      },
      ":root": {
        "--scrollbar-bg": props.colorMode === "light" ? "black" : "white",
      }
    }),
  },

  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
})

export default theme