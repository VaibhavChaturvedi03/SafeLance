import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import ClientDashboard from "./ClientDashboard";
import FreelancerDashboard from "./FreelancerDashboard";

const DashboardPage = () => {
  const { user, userType } = useAuth();
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Route to appropriate dashboard based on user type
  return userType === 'client' ? <ClientDashboard /> : <FreelancerDashboard />;
};

export default DashboardPage;