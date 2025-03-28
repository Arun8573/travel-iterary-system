
import { useEffect } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout/Layout";

const Register = () => {
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (isAuthenticated) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated]);
  
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <h1 className="text-4xl font-serif font-medium">Voyage</h1>
            </Link>
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 animate-scale-in">
            <RegisterForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
