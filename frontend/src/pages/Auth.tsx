import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isDark, setIsDark] = useState(false);

  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Password Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login, signup, loading } = useAuth();

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const navigate = useNavigate();

  // Handle theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark;

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setIsDark(false);
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { success, message } = await login({ email, password })
    if (success) {
      toast.success("Welcome back!");
      navigate('/dashboard');
    } else {
      toast.error(message);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const { success, message } = await signup({ name, email, password });
    if (success) {
      toast.success("Account created successfully! Please login.");
      setIsLogin(true);
      clearForm()
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden transition-colors duration-300">
      {/* Theme Toggle - Top Right */}
      <button
        onClick={toggleTheme}
        className="absolute top-8 right-8 z-50 p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors border border-border"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700" />
        )}
      </button>

      {/* Logo/Brand - Top Left */}
      <div className="absolute top-8 left-8 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm">
            Z
          </div>
          <span className="text-xl font-bold tracking-tight">Zeno</span>
        </div>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        {/* Toggle Switch */}
        <div className="flex justify-center mb-12 mt-16 lg:mt-0">
          <div className="inline-flex bg-secondary rounded-full p-1 gap-1 border border-border">
            <button
              onClick={() => {
                setIsLogin(true);
                clearForm();
              }}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 text-sm ${isLogin
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                clearForm();
              }}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 text-sm ${!isLogin
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center px-4">
          {/* Left Content */}
          <div className="hidden lg:block">
            {isLogin ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                    Welcome back
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                    Continue your creative journey. Write, plan, and create
                    with purpose.
                  </p>
                </div>
                <div className="space-y-6 text-muted-foreground">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base">
                        Powerful Writing Tools
                      </p>
                      <p className="text-sm mt-0.5">Express ideas with rich formatting</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base">
                        Smart Planning
                      </p>
                      <p className="text-sm mt-0.5">Organize thoughts and goals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base">
                        Create Together
                      </p>
                      <p className="text-sm mt-0.5">Collaborate with your team</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                    Start creating
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                    Join thousands of creators who are transforming their ideas
                    into reality.
                  </p>
                </div>
                <div className="space-y-6 text-muted-foreground">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base">
                        Always Free
                      </p>
                      <p className="text-sm mt-0.5">No credit card required to start</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base">
                        Instant Setup
                      </p>
                      <p className="text-sm mt-0.5">Start in seconds, no installation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base">
                        Your Data
                      </p>
                      <p className="text-sm mt-0.5">Complete privacy and control</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Form */}
          <div className="w-full max-w-md mx-auto lg:max-w-none">
            {isLogin ? (
              <form
                onSubmit={handleLogin}
                className="bg-card border border-border rounded-2xl p-8 sm:p-10 shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-8 text-foreground">Sign in to your account</h3>

                <div className="space-y-5 mb-8">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-secondary border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 bg-secondary border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  {loading ? "Please wait..." : "Continue"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-card text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Button */}
                <button
                  type="button"
                  className="w-full bg-secondary hover:bg-secondary/80 border border-input text-foreground py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleSignup}
                className="bg-card border border-border rounded-2xl p-8 sm:p-10 shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-8 text-foreground">Create your account</h3>

                <div className="space-y-5 mb-8">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-secondary border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-secondary border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 bg-secondary border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 bg-secondary border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Signup Button */}
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  {loading ? "Creating..." : "Create Account"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Terms */}
                <p className="text-xs text-muted-foreground text-center mt-6">
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline font-medium">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline font-medium">
                    Privacy Policy
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}