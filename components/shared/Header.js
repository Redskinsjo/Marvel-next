import React, { useState, useContext } from "react";
import io from "socket.io-client";
import feathers from "@feathersjs/client";
import {
  GlobalStateProvider as stateProvider,
  GlobalDispatchProvider as disProvider,
} from "../../context/GlobalContextProvider";
import Link from "next/link";
import { withRouter } from "next/router";

const socket = io(process.env.REACT_APP_SERVER_URL);
const client = feathers();
client.configure(feathers.socketio(socket));
client.configure(feathers.authentication());

function Header({
  router,
  setDisplaySignin,
  displayLogout,
  setDisplayLogout,
  displaySearch,
  nav,
}) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const globalState = useContext(stateProvider);
  const dispatch = useContext(disProvider);

  console.log("header", router);

  return (
    <div className="flex justify-center flex-col items-center w-full">
      <div className="w-full flex justify-center bg-black">
        <img
          src="/images/logo.svg"
          className="w-32 my-4 object-cover"
          alt="logo"
        />
      </div>
      <div className="relative">
        {router.query.id && (
          <span
            className="absolute -left-20 top-2 hover:underline cursor-pointer font-bold"
            onClick={() => {
              router.back();
            }}
          >
            Go Back
          </span>
        )}

        {globalState?.firstname ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (displayLogout) return setDisplayLogout(false);
              return setDisplayLogout(true);
            }}
            className={`flex justify-around w-full hover:bg-red-100 rounded-md cursor-pointer py-2 ${
              displaySearch && "mt-2"
            } w-300px`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold">
              <span className="text-gray-500">Welcome </span>
              {globalState.firstname[0].toUpperCase() +
                globalState.firstname.slice(1) +
                " " +
                globalState.lastname.toUpperCase()}
            </span>
          </div>
        ) : (
          <div
            onClick={() => {
              setDisplaySignin(true);
            }}
            className={`py-2 ${
              displaySearch && "mt-2"
            } cursor-pointer w-300px hover:bg-red-100 rounded-md flex justify-around`}
          >
            Sign in
          </div>
        )}
      </div>
      {globalState && displayLogout && (
        <div
          onClick={async (e) => {
            e.stopPropagation();
            await client.logout();
            dispatch({ type: "DISCONNECT" });
          }}
          className="w-300px bg-black text-white rounded-md py-2"
        >
          <span className="w-full h-full hover:font-bold flex justify-center items-center cursor-pointer">
            Sign Out
          </span>
        </div>
      )}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setDisplayMenu(true);
        }}
        className={`mt-2 flex justify-center items-center w-690px bg-gray-300 ${
          !displayMenu && "hover:bg-opacity-60"
        } ${!displayMenu && "cursor-pointer"}`}
      >
        {displayMenu ? (
          <ul className="flex">
            <li
              className={
                nav === "/"
                  ? "mx-2 text-md font-bold"
                  : "mx-2 hover:text-gray-400 cursor-pointer"
              }
            >
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li
              className={
                nav === "/characters"
                  ? "mx-2 text-md font-bold"
                  : "mx-2 hover:text-gray-400 cursor-pointer"
              }
            >
              <Link href="/characters">
                <a>Characters</a>
              </Link>
            </li>
            <li
              className={
                nav === "/comics"
                  ? "mx-2 text-md font-bold"
                  : "mx-2 hover:text-gray-400 cursor-pointer"
              }
            >
              <Link href="/comics">
                <a>Comics</a>
              </Link>
            </li>
            {globalState.firstname && (
              <li
                className={
                  nav === "/favourites"
                    ? "mx-2 text-md font-bold"
                    : "mx-2 hover:text-gray-400 cursor-pointer"
                }
              >
                <Link href="/comics">
                  <a>Favourites</a>
                </Link>
              </li>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="cursor-pointer w-6 hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                setDisplayMenu(false);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </ul>
        ) : (
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 mx-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span>MENU</span>
          </div>
        )}
      </div>
      {displaySearch === false ? null : (
        <form className="relative group mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="absolute h-7 w-7 top-1 left-1 text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            className="ring-2 ring-gray-300 pl-9 pr-3 py-1 mr-6 rounded-md pl-8 focus:ring-black focus:rounded-md outline-none"
          />
          <button
            type="submit"
            className="border-2 border-black px-3 py-1 rounded-md hover:border-gray-300 hover:text-red-700 focus:border-red-700 focus:outline-none"
          >
            Search
          </button>
        </form>
      )}
    </div>
  );
}

export default withRouter(Header);
