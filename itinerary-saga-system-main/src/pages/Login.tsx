
import { useEffect } from "react";
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";

const Login = () => {
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
            <LoginForm />
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-slate-900 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-3">
                <Button variant="outline" className="btn-transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                  </svg>
                </Button>
                
                <Button variant="outline" className="btn-transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.934.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </Button>
                
                <Button variant="outline" className="btn-transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 5.16c-.406.71-1.12 1.332-1.824 1.558v.4c0 4.418-3.56 9.514-10.067 9.514-1.983 0-3.84-.55-5.398-1.503a7.864 7.864 0 005.36-1.417c-1.66-.03-3.06-1.064-3.526-2.493.276.054.554.082.84.082.386 0 .76-.042 1.116-.122-1.73-.35-3.028-1.818-3.028-3.602v-.046c.52.276 1.116.434 1.752.456-1.01-.636-1.68-1.73-1.68-2.965 0-.655.18-1.252.496-1.776 1.803 2.1 4.506 3.48 7.55 3.634-.064-.276-.098-.56-.098-.856 0-2.068 1.77-3.743 3.97-3.743 1.135 0 2.158.464 2.877 1.19.9-.162 1.744-.456 2.503-.87-.295.884-.92 1.62-1.73 2.09.795-.1 1.55-.316 2.252-.626z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
