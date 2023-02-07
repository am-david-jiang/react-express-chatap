import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthCheck from "./components/AuthCheck";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./sass/style.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <AuthCheck>
                <Chat />
              </AuthCheck>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
