
import { Navigate } from "react-router-dom";

const Index = () => {
  // Simply redirect to the login page
  return <Navigate to="/login" replace />;
};

export default Index;
