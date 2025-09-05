import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/SignUp";
import BrowseFreelancersPage from './pages/BrowserFreelancer';
import ServicesPage from './pages/Services';
import ServiceDetailPage from './pages/ServiceDetails';
import FreelancerProfilePage from './pages/FreelancerProfile';
import PostJobPage from './pages/PostJob';
import MessagesPage from './pages/MessagePage';
import AboutPage from './pages/About';
import DashboardPage from './pages/Dashboards/Dashboard';
import { AuthProvider } from './context/AuthProvider';
import { BlockchainProvider } from './context/BlockchainContext'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApplicationForm from './pages/ApplicationForm';

const App = () => {
  return (
    <AuthProvider>
      <BlockchainProvider> {}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/browse" element={<BrowseFreelancersPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/service/:id" element={<ServiceDetailPage />} />
            <Route path="/freelancer/:id" element={<FreelancerProfilePage />} />
            <Route path="/post-job" element={<PostJobPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            {/* <Route path="/how-it-works" element={<HowItWorksPage />} /> */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/application" element={<ApplicationForm />} />
          </Routes>
        </BrowserRouter>
      </BlockchainProvider>
    </AuthProvider>
  );
};

export default App;
