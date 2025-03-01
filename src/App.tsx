
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";

import StartupScreens from "./pages/StartupScreens";
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
import Profile from "./pages/Profile";
import Security from "./pages/profile/Security";
import Preferences from "./pages/profile/Preferences";
import CardsAndBanks from "./pages/profile/CardsAndBanks";
import Support from "./pages/profile/Support";
import Statements from "./pages/profile/Statements";
import Rewards from "./pages/profile/Rewards";
import Referrals from "./pages/profile/Referrals";
import Favorites from "./pages/profile/Favorites";
import Water from "./pages/services/Water";
import Internet from "./pages/services/Internet";
import Gaming from "./pages/services/Gaming";
import Betting from "./pages/services/Betting";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner position="top-right" />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<StartupScreens />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/bills" element={<Bills />} />
                <Route path="/transfer" element={<Transfer />} />
                <Route path="/ewallet" element={<EWallet />} />
                <Route path="/more" element={<MoreServices />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/security" element={<Security />} />
                <Route path="/preferences" element={<Preferences />} />
                <Route path="/cards-and-banks" element={<CardsAndBanks />} />
                <Route path="/support" element={<Support />} />
                <Route path="/statements" element={<Statements />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/referrals" element={<Referrals />} />
                <Route path="/favorites" element={<Favorites />} />
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
                <Route path="/bills/water" element={<Water />} />
                <Route path="/bills/internet" element={<Internet />} />
                <Route path="/bills/gaming" element={<Gaming />} />
                <Route path="/bills/betting" element={<Betting />} />
                {/* Catch-all route for 404 handling */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
