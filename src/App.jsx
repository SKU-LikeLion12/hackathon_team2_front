import React from "react";
import Home from "./pages/Home";

import {
  Routes,
  Route,
  Link,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
