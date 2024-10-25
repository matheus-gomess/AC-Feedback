import { Route, Routes } from "react-router-dom";
import Analytics from "pages/analytics/Analytics";
import Authentication from "./pages/login/Authentification";
import Home from "./pages/home/Home";
import Feedbacks from "./pages/feedback/Feedbacks";
import RateChooseUser from "./pages/rateChooseUser";
import RateParticipantScreen from "./pages/rate";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import Settings from "pages/settings/settings";
import { useColorMode } from "@chakra-ui/react";
import "./index.css";
import Register from "pages/register/register";
import { getUser } from "storage/get-user";
import { useLocation } from "react-router-dom";
import AnalyticsUserSelect from "pages/analytics/analyticsUserSelect";
import ScrollToTop from "components/ScrollToTop";

function App() {
  const { colorMode } = useColorMode();
  const location = useLocation();
  return (
    <div
      className="App"
      style={{
        overflow: "hidden",
        fontFamily: "Montserrat, sans-serif",
        minHeight: "100vh",
        maxWidth: "100vw",
      }}
    >
      {location.pathname !== "/" || location.pathname !== "/register"
        ? getUser() && <Header />
        : null}

      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/rate" element={<RateChooseUser />} />
        <Route
          path="/rate-participant/:participant"
          element={<RateParticipantScreen />}
        />
        <Route path="/home/feedbacks" element={<Feedbacks />} />
        <Route path="/home/settings" element={<Settings />} />
        <Route path="/home/analytics" element={<Analytics />} />
        <Route path="/home/analytics/:user" element={<AnalyticsUserSelect />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ScrollToTop />
      <ToastContainer
        style={{ marginTop:"10vh" }}
        position="top-center"
        pauseOnHover={false}
        theme={colorMode === "dark" ? "dark" : "light"}
        progressStyle={{ background: "#ff0000" }}
        limit={2}
        autoClose={2500}
        closeOnClick={true}
        closeButton={false}
      />
    </div>
  );
}

export default App;
