import React from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Routers from "./Routes";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routers />
      <Footer />
    </div>
  );
};

export default App;
