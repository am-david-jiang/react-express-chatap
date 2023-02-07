import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../app/hooks";
import { login } from "../features/AuthSlice";

import Navbar from "../components/Navbar";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const urlencodedForm = new URLSearchParams();
    urlencodedForm.append("username", username);
    urlencodedForm.append("password", password);

    dispatch(login(urlencodedForm))
      .then(() => navigate("/"))
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.BOTTOM_LEFT,
        })
      );
  };
  return (
    <>
      <div className="login">
        <div className="login-container">
          <Navbar className="login-navbar" />
          <div className="login-form">
            <h3>Sign In</h3>
            <p>
              New to Chatroom?<Link to="/register">Sign up for free!</Link>
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link to="">Forgot Password?</Link>
              <button type="submit">Sign In</button>
            </form>
          </div>
        </div>
        <div className="login-background"></div>
      </div>
      <ToastContainer autoClose={5000} />
    </>
  );
}
