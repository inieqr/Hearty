import * as React from 'react'
import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"
import { Global, css } from '@emotion/react'
import { useEffect } from 'react'

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    black: {
      'light': "#30343F",
      'dark': "#15162A"
    },
    white: {
      'off': '#FAFAFF',
      'full': '#FFFFFF'
    },
    yellow: {
      'light': '#F5F0D9',
      'med': '#F0E6B2',
      'dark': '#FFC020'
    },
    blue: {
      'veryLight': '#C6DCF0',
      'light': '#92BDE1',
      'med': '#5E9FD2',
      'medDark': '#2A80C2',
    },
    red: {
      'light': '#FF7C7C',
    },
    green: {
      'dark': '#158C4C',
    }
  },
})

function ForceLightMode({ children }) {
  // force light mode b/c of ChakraUI bug
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "light") return;
    toggleColorMode();
  }, [toggleColorMode, colorMode]);

  return children;
}

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode()

  return (
    <>
      <Global
        styles={css`
          html {
            min-width: 356px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === 'light' ? '#FAFAFF' : '#15161a'};
          }
        `}
      />
      {children}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle>
        <ForceLightMode>
          <Component {...pageProps} />
        </ForceLightMode>
      </GlobalStyle>
    </ChakraProvider>
  )
}

export default MyApp
