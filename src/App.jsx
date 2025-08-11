import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";


const App = () => {
  return (
    <Router>
      <div className="font-sans">
        <AppRoutes />
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </Router>
  );
};

export default App;
