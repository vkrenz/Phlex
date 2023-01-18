import {
  // React Router v6
  createBrowserRouter,
  Navigate,
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

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token))
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />
    },
    {
      path: "/home",
      element: isAuth ? <HomePage /> : <Navigate to="/" />
    },
    {
      path: "/profile/:userId",
      element: isAuth ? <ProfilePage /> : <Navigate to="/" />
    }
  ])
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
