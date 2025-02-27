
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Wallet from "./pages/Wallet";
import Bills from "./pages/Bills";
import NotFound from "./pages/NotFound";
import Transfer from "./pages/Transfer";
import EWallet from "./pages/EWallet";
import MoreServices from "./pages/MoreServices";
import Airtime from "./pages/services/Airtime";
import Data from "./pages/services/Data";
import Electricity from "./pages/services/Electricity";
import CableTV from "./pages/services/CableTV";
import GiftCards from "./pages/services/GiftCards";
import MovieTickets from "./pages/services/MovieTickets";
import FlightBooking from "./pages/services/FlightBooking";
import HotelBooking from "./pages/services/HotelBooking";
import Insurance from "./pages/services/Insurance";
import Education from "./pages/services/Education";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/bills" element={<Bills />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/ewallet" element={<EWallet />} />
              <Route path="/more" element={<MoreServices />} />
              <Route path="/bills/airtime" element={<Airtime />} />
              <Route path="/bills/data" element={<Data />} />
              <Route path="/bills/electricity" element={<Electricity />} />
              <Route path="/bills/cable" element={<CableTV />} />
              <Route path="/bills/gift-cards" element={<GiftCards />} />
              <Route path="/bills/movies" element={<MovieTickets />} />
              <Route path="/bills/flights" element={<FlightBooking />} />
              <Route path="/bills/hotels" element={<HotelBooking />} />
              <Route path="/bills/insurance" element={<Insurance />} />
              <Route path="/bills/education" element={<Education />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
