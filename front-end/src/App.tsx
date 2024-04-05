import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import ProfilePage from "./pages/profile.page";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";
import UnauthorizePage from "./pages/unauthorize.page";
import RequireUser from "./components/requireUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./pages/admin.page";
import EmailVerificationPage from "./pages/verifyemail.page";
import AccountPage from "./pages/account.page";
import FreeCredit from "./pages/freecredit.page";


const theme = createTheme({

});

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Routes>

          {/* Private Route */}
          <Route element={<RequireUser allowedRoles={["user", "admin"]} />}>
            <Route element={<Layout />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route index element={<HomePage />} />

            </Route>
          </Route>
          <Route element={<RequireUser allowedRoles={["admin"]} />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
          <Route path="unauthorized" element={<UnauthorizePage />} />
          <Route path="verifyemail" element={<EmailVerificationPage />}>
            <Route path=":verificationCode" element={<EmailVerificationPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="freecredit" element={<FreeCredit />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
