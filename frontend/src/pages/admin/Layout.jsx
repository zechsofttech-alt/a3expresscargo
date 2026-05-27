import React, { useEffect, useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Eye, EyeOff, Lock, LogIn } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("__token") || localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch("/api/user", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setIsAuthenticated(data.success);
        if (!data.success) {
          localStorage.removeItem("__token");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Token verification error", error);
        localStorage.removeItem("__token");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (loginAttempts >= 5) {
      setError("Too many attempts. Please try again later.");
      return;
    }

    setIsLoading(true);
    setError("");
    setLoginAttempts(prev => prev + 1);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("__token", data.token);
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        setLoginAttempts(0);
      } else {
        setError("Invalid password");
      }
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="w-24 h-24">
          <DotLottieReact
            src="https://lottie.host/a0441091-aecc-49ca-b35a-bf50cf375535/uqrV8C9tkm.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="p-8">
            <div className="w-32 h-32 mx-auto mb-6">
              <DotLottieReact
                src="https://lottie.host/a0441091-aecc-49ca-b35a-bf50cf375535/uqrV8C9tkm.lottie"
                loop
                autoplay
              />
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Admin Portal
              </h2>
              <p className="text-gray-500">Enter your credentials to continue</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-500">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading || loginAttempts >= 5}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    <span>Login to Admin</span>
                  </>
                )}
              </button>
              
              {loginAttempts > 0 && loginAttempts < 5 && (
                <p className="text-sm text-gray-500 text-center">
                  {5 - loginAttempts} attempts remaining
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <div className="admin-layout">{children}</div>;
};

export default AdminLayout;
