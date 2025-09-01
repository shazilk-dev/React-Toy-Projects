import { ArrowLeft, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

interface NavigationHeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export default function NavigationHeader({
  title,
  showBackButton = true,
}: NavigationHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const getProjectTitle = () => {
    if (title) return title;

    const path = location.pathname;
    switch (path) {
      case "/todo":
        return "Todo App";
      case "/quiz":
        return "Quiz App";
      case "/stepper":
        return "Multi-Step Form";
      default:
        return "React Toy Projects";
    }
  };

  const handleBack = () => {
    // If we're on a project page, go back to home
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      // If we're on home, go back in browser history
      window.history.back();
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {showBackButton && location.pathname !== "/" && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}

          <h1 className="text-xl font-bold text-gray-900">
            {getProjectTitle()}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {location.pathname !== "/" && (
            <button
              onClick={handleHome}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              <Home className="h-4 w-4" />
              Home
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
