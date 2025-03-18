import { Outlet } from "react-router-dom";

function App() {
  // Since we're using createHashRouter in main.jsx, this component just renders its children
  return <Outlet />;
}

export default App;
