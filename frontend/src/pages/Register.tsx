import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import useFetch from "../hooks/useFetch";
import Navbar from "../components/Navbar";

export interface IRegisterProps {}

const verifyIfPasswordEqual = (firstPassword: String, secondPassword: String) =>
  firstPassword === secondPassword;

export default function Register(props: IRegisterProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [email, setEmail] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { postData } = useFetch("http://127.0.0.1:5000/auth/register", false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (!fileRef.current) throw new Error("fileRef is not assigned");
      else if (fileRef.current.files?.length === 0)
        throw new Error("No avatar image file!");

      if (!verifyIfPasswordEqual(password, secondPassword)) {
        throw new Error("Password or the other is wrong!");
      }

      const multipart = new FormData();
      const files = fileRef.current.files!;
      multipart.append("username", username);
      multipart.append("password", password);
      multipart.append("email", email);
      multipart.append("avatar", files[0]);

      console.log(multipart);

      postData(multipart)
        .then((data) => {
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      toast.error("Password or the other is wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <>
      <div className="register">
        <div className="register-container">
          <Navbar className="register-navbar" />
          <div className="register-form">
            <h3>Sign Up</h3>
            <p>
              Already have a chatroom account?
              <Link to="/login">Sign In from Here!</Link>
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirm Password"
                value={secondPassword}
                onChange={(e) => setSecondPassword(e.target.value)}
                required
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input type="file" name="avatar" id="avatar" ref={fileRef} />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
        <div className="register-background"></div>
      </div>
      <ToastContainer autoClose={5000} />
    </>
  );
}
