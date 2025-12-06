import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Home } from "lucide-react";

export default function NotFound() {
  const [isDark, setIsDark] = useState(false);

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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-8 right-8 z-50 p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700" />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-7xl font-bold text-primary mb-4">404</div>
          <h1 className="text-3xl font-bold mb-3">Page not found</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 group"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
