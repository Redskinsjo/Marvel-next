import React, { useState, useContext } from "react";
import axios from "axios";
import io from "socket.io-client";
import feathers from "@feathersjs/client";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  GlobalStateProvider as stateProvider,
  GlobalDispatchProvider as disProvider,
} from "../context/GlobalContextProvider";

const socket = io(process.env.REACT_APP_SERVER_URL_PRODUCTION);

const client = feathers();
client.configure(feathers.socketio(socket));
client.configure(feathers.authentication());

export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password2Visible, setPassword2Visible] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const globalState = useContext(stateProvider);
  const dispatch = useContext(disProvider);

  let passwordHidden = password
    .split("")
    .map((letter, index) => {
      if (index === password.length - 1) return letter;
      else return "*";
    })
    .join("");
  let password2Hidden = password2
    .split("")
    .map((letter, index) => {
      if (index === password2.length - 1) return letter;
      else return "*";
    })
    .join("");

  const handleCreate = async () => {
    try {
      if (password.length === 0) throw new Error("Password is empty");
      if (password2.length === 0) throw new Error("Confirm password is empty");
      if (password !== password2) {
        throw new Error("Confirm password should be equal");
      }
      const colors = [
        "blue",
        "red",
        "pink",
        "green",
        "yellow",
        "indigo",
        "purple",
      ];
      const rand = Math.floor(Math.random() * (colors.length - 1 - 0) + 0);
      const color = colors[rand];

      await axios.post(process.env.REACT_APP_SERVER_URL + "/users", {
        email,
        password,
        firstname,
        lastname,
        phone,
        messages: { color },
      });
      const login = await client.authenticate({
        strategy: "local",
        email,
        password,
      });
      // console.log(login);
      dispatch({ type: "SIGN_UP", payload: login.user });
      console.log(globalState);

      router.push("/");
    } catch (error) {
      setError({ message: error.message });
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="h-screen w-96 bg-gray-900"></div>
      <div className="flex justify-start flex-grow">
        <div className="flex flex-col px-12 my-16">
          <Link href="/">
            <a>
              <img src="/images/logo.svg" className="w-40 pb-8" />
            </a>
          </Link>
          <h1 className="font-title text-4xl pb-8">Create your account</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}
            className="flex flex-col"
          >
            <label htmlFor="email" className="font-medium mt-2">
              Email
            </label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 p-3 bg-gray-200 rounded-2xl hover:bg-gray-300 focus:outline-none font-body text-xl"
            />
            <label htmlFor="firstname" className="font-medium mt-2">
              Firstname
            </label>
            <input
              name="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="h-10 p-3 bg-gray-200 rounded-2xl hover:bg-gray-300 focus:outline-none font-body text-xl"
            />
            <label htmlFor="lastname" className="font-medium mt-2">
              Lastname
            </label>
            <input
              name="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="h-10 p-3 bg-gray-200 rounded-2xl hover:bg-gray-300 focus:outline-none font-body text-xl"
            />
            <label htmlFor="password" className="font-medium mt-2">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type="text"
                value={passwordVisible ? password : passwordHidden}
                onChange={(e) => {
                  if (e.target.value.length < password.length)
                    setPassword(password.slice(0, e.target.value.length));
                  else
                    setPassword(
                      password + e.target.value[e.target.value.length - 1]
                    );
                }}
                className="h-10 p-3 bg-gray-200 rounded-2xl hover:bg-gray-300 focus:outline-none font-body text-xl w-full"
              />
              {passwordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="absolute top-2 right-2 h-6 w-6 cursor-pointer"
                  onClick={() => {
                    setPasswordVisible(false);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="absolute top-2 right-2 h-6 w-6 cursor-pointer"
                  onClick={() => {
                    setPasswordVisible(true);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
              {password.length > 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="absolute top-2 -right-8 h-6 w-6 cursor-pointer text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <label htmlFor="password2" className="font-medium mt-2">
              Confirm your password
            </label>
            <div className="relative">
              <input
                name="password2"
                type="text"
                value={password2Visible ? password2 : password2Hidden}
                onChange={(e) => {
                  if (e.target.value.length < password2.length)
                    setPassword2(password2.slice(0, e.target.value.length));
                  else
                    setPassword2(
                      password2 + e.target.value[e.target.value.length - 1]
                    );
                }}
                className="h-10 p-3 bg-gray-200 rounded-2xl hover:bg-gray-300 focus:outline-none font-body text-xl w-full"
              />
              {password2Visible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="absolute top-2 right-2 h-6 w-6 cursor-pointer"
                  onClick={() => {
                    setPassword2Visible(false);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="absolute top-2 right-2 h-6 w-6 cursor-pointer"
                  onClick={() => {
                    setPassword2Visible(true);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
              {password2.length > 0 && password === password2 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="absolute top-2 -right-8 h-6 w-6 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : password2.length > 0 && password !== password2 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="absolute top-2 -right-8 h-6 w-6 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : null}
            </div>
            <label htmlFor="phone" className="font-medium mt-2">
              Phone
            </label>
            <input
              name="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-10 p-3 bg-gray-200 rounded-2xl hover:bg-gray-300 focus:outline-none font-body text-xl"
            />

            <div className="h-12 flex items-center">
              <span className="text-red-500">{error && error.message}</span>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 focus:bg-gray-200 focus:text-gray-400 focus:outline-none"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
