import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle/>
      <h1>Hello world</h1>
    </ThemeProvider>
  )
}

export default App