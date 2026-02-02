import { EyeClosedIcon, EyeIcon, UserLock, Loader2, Mail, Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const state = searchParams.get("page") === "register" ? "register" : "login";
  
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { user, login, signUp } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {};
    if (state === "register" && !formData.name.trim()) newErrors.name = "Name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";
    
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (state === "login") {
        await login({ email: formData.email, password: formData.password });
      } else {
        await signUp(formData);
      }
    } catch (err) {
      setErrors({ server: err.message || "Authentication failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const toggleState = () => {
    setSearchParams({ page: state === "login" ? "register" : "login" });
    setErrors({}); // Clear errors when switching modes
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <section className="md:px-16 pt-24 min-h-screen flex items-center justify-center px-8 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[450px] text-center bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600/20 p-4 rounded-2xl mb-4">
            <UserLock className="text-indigo-500 w-10 h-10" />
          </div>
          <h1 className="text-white text-3xl font-semibold">
            {state === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            {state === "login" ? "Enter your credentials to access your account" : "Join us to start generating amazing content"}
          </p>
        </div>

        {errors.server && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {errors.server}
          </div>
        )}

        <div className="space-y-4">
          {/* Name Field (Register Only) */}
          {state === "register" && (
            <div className="text-left">
              <div className={`flex items-center w-full bg-white/5 ring-1 ${errors.name ? 'ring-red-500/50' : 'ring-white/10'} focus-within:ring-indigo-500/60 h-12 rounded-xl transition-all pl-4 gap-3`}>
                <User size={18} className="text-white/40" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full bg-transparent text-white placeholder-white/40 outline-none text-sm"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && <span className="text-red-500 text-[10px] ml-4 mt-1">{errors.name}</span>}
            </div>
          )}

          {/* Email Field */}
          <div className="text-left">
            <div className={`flex items-center w-full bg-white/5 ring-1 ${errors.email ? 'ring-red-500/50' : 'ring-white/10'} focus-within:ring-indigo-500/60 h-12 rounded-xl transition-all pl-4 gap-3`}>
              <Mail size={18} className="text-white/40" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full bg-transparent text-white placeholder-white/40 outline-none text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <span className="text-red-500 text-[10px] ml-4 mt-1">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="text-left">
            <div className={`flex items-center w-full bg-white/5 ring-1 ${errors.password ? 'ring-red-500/50' : 'ring-white/10'} focus-within:ring-indigo-500/60 h-12 rounded-xl transition-all pl-4 gap-3`}>
              <Lock size={18} className="text-white/40" />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full bg-transparent text-white placeholder-white/40 outline-none text-sm"
                value={formData.password}
                onChange={handleChange}
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="pr-4 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPass ? <EyeClosedIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-[10px] ml-4 mt-1">{errors.password}</span>}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full h-12 rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : (state === "login" ? "Sign In" : "Create Account")}
        </button>

        <p className="text-gray-400 text-sm mt-6">
          {state === "login" ? "New to the platform?" : "Already have an account?"}
          <button
            type="button"
            onClick={toggleState}
            className="text-indigo-400 hover:text-indigo-300 font-medium ml-1 transition-colors"
          >
            {state === "login" ? "Create an account" : "Sign in here"}
          </button>
        </p>
      </form>
    </section>
  );
};

export default Login;