import { Forecast } from "./Forecast";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Footer } from "./nav/Footer";
import { Masthead } from "./nav/Masthead";
import { About } from "./About";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ForecastJson } from "./Forecast/ForecastJson";
import { SunsetTimes } from "./Forecast/SunsetTimes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* basename so https://elovejoy5.github.io/sbweather/ will work */}
      <BrowserRouter basename="/sbweather/">
        <CssBaseline />
        <Masthead />
        <div className="App">
          <Routes>
            <Route path="about" element={<About />} />
            <Route path="forecast" element={<Forecast />} />
            <Route path="forecast/json" element={<ForecastJson />} />
            <Route path="sunset" element={<SunsetTimes />} />
            <Route path="/" element={<Navigate to="/forecast" />} />
            <Route path="*" element={<Navigate to="/forecast" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
