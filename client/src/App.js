import {
  // React Router v6
  // Navigate,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import HomePage from "scenes/homePage"
import LoginPage from "scenes/loginPage"
import ProfilePage from "scenes/profilePage"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  }
])

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        {/* Reset CSS */}
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  )
}

export default App
