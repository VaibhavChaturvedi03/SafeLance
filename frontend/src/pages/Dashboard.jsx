import { useAuth } from "../context/AuthProvider";

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