import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import io from "socket.io-client";
import feathers from "@feathersjs/client";
import { GlobalDispatchProvider as disProvider } from "../../context/GlobalContextProvider";

const socket = io(process.env.REACT_APP_SERVER_URL_PRODUCTION);

const client = feathers();
client.configure(feathers.socketio(socket));

export default function Signin({ setDisplaySignin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useContext(disProvider);

  client.configure(
    feathers.authentication({
      storage: window.localStorage,
    })
  );

  let passwordHidden = password
    .split("")
    .map((letter, index) => {
      if (index === password.length - 1) return letter;
      else return "*";
    })
    .join("");

  const handleConnect = async () => {
    try {
      const response = await client.authenticate({
        strategy: "local",
        email,
        password,
      });
      if (response) {
        dispatch({ type: "CONNECT", payload: response.user });
        setDisplaySignin(false);
      }
    } catch (error) {
      setError({ message: error.message });
    }
  };

  return (
    <div
      onClick={() => {
        setDisplaySignin(false);
      }}
      className="bg-white z-10 h-screen w-screen absolute flex"
    >
      <div className="h-full w-96 flex items-center">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-96 h-3/5 flex flex-col rounded-md bg-white px-4"
        >
          <div
            onClick={(e) => {
              setDisplaySignin(false);
            }}
            className="flex justify-center items-center cursor-pointer"
          >
            <Image
              src="/images/logo.svg"
              height="90px"
              width="90px"
              alt="logo"
            />
          </div>
          <div className="flex justify-center my-3">
            <h2 className="font-medium">Connect to your account</h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleConnect();
            }}
            className="flex flex-col mx-3"
          >
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              name="email"
              type="text"
              className="bg-red-100 rounded-md px-3 hover:bg-red-200 shadow-md"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type="text"
                className="bg-red-100 w-full rounded-md px-3 hover:bg-red-200 shadow-md"
                value={passwordVisible ? password : passwordHidden}
                onChange={(e) => {
                  if (e.target.value.length < password.length)
                    setPassword(password.slice(0, e.target.value.length));
                  else
                    setPassword(
                      password + e.target.value[e.target.value.length - 1]
                    );
                }}
              />
              {passwordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="absolute top-0 right-2 h-6 w-6 cursor-pointer"
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
                  className="absolute top-0 right-2 h-6 w-6 cursor-pointer"
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
            </div>
            <div className="flex justify-end my-3">
              <button
                type="submit"
                className="bg-red-200 p-1 rounded-md font-semibold focus:outline-none focus:bg-red-100 focus:text-gray-500 shadow-md hover:bg-red-300"
              >
                Connect
              </button>
            </div>

            <div className="flex justify-center text-red-500 h-20">
              <span>{error && error.message}</span>
            </div>

            <div>
              <span>
                Don't have an account yet?{" "}
                <Link href="/signup">
                  <a className="text-blue-500 hover:text-blue-600">Sign Up</a>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-grow h-full bg-black relative">
        <div className="absolute w-72 text-white top-16 left-12">
          <h3 className="w-72 font-title text-4xl font-bold">
            Official website and more updates
          </h3>
          <p className="w-80 font-body text-base font-semibold">
            Unlimited discoveries to be found, entertainments for addicts of
            Marvel brand. Don't miss out the opportunity to navigate there and
            find what you love
          </p>
          <a
            href="https://www.marvel.com/"
            className="flex items-center hover:text-black"
          >
            <span className="font-semibold underline">Learn More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
        <img
          src="/images/login-marvel-2.jpg"
          className="h-full object-contain"
          alt="login"
        />
      </div>
    </div>
  );
}
