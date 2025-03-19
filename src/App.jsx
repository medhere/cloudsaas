import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Apple, AppleIcon, Play } from "lucide-react";

function App() {
  const location = useLocation();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Check if the current route contains 'dashboard' or 'project'
  const isDashboardOrProject = location.pathname.includes('/dashboard') ||
    location.pathname.includes('/project');

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial dimensions
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile breakpoint (typically 768px for tablets, adjust as needed)
  const isMobile = dimensions.width < 1024;

  // If on mobile and on dashboard/project route, show mobile app download UI
  if (isMobile && isDashboardOrProject) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100">
        <h1 className="mb-4 text-2xl font-bold">Mobile App Required</h1>
        <p className="mb-6">Please download our mobile app for the best experience on smaller screens.</p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#"
            className="flex items-center justify-center px-6 py-3 text-white bg-black rounded-lg"
            onClick={(e) => e.preventDefault()}
          >
            <AppleIcon/>
            App Store
          </a>
          <a
            href="#"
            className="flex items-center justify-center px-6 py-3 text-white bg-black rounded-lg"
            onClick={(e) => e.preventDefault()}
          >
            <Play/>
            Google Play
          </a>
        </div>
      </div>
    );
  }

  // Otherwise, render the normal outlet
  return <Outlet />;
}

export default App;
