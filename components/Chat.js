import React, { useState, useEffect, useRef, useContext } from "react";
import feathers from "@feathersjs/client";
import io from "socket.io-client";
import { GlobalStateProvider as stateProvider } from "../context/GlobalContextProvider";

const socket = io(process.env.REACT_APP_SERVER_URL);
const app = feathers();
app.configure(feathers.socketio(socket));

export default function Chat() {
  const [msgs, setMsgs] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatBoxRef = useRef();
  const sendMsgRef = useRef();
  const globalState = useContext(stateProvider);

  const settleMessageService = async () => {
    const msgs = await app.service("messages").find();
    setMsgs(msgs);

    app.service("messages").on("created", async (msg) => {
      const messages = await app.service("messages").find();
      setMsgs(messages);
    });
  };

  const sendMsg = async (e) => {
    if (globalState) {
      await app.service("messages").create({
        userId: globalState._id,
        text: userInput,
        color: globalState.messages?.color,
      });
    } else {
      await app.service("messages").create({ text: userInput });
    }
    setUserInput("");
  };

  useEffect(() => {
    settleMessageService();
    // setTimeout(
    //   () =>
    //     chatBoxRef.current.scrollTo({
    //       top: chatBoxRef.current.scrollHeight,
    //       left: 0,
    //       behavior: "smooth",
    //     }),
    //   500
    // );
  }, []);

  return (
    <div className="flex flex-col w-690px h-3/5 border-black mt-6">
      <div
        className="flex flex-col flex-grow border-t-2 border-r-2 border-l-2 min-h-558px"
        ref={chatBoxRef}
      >
        {msgs.map((msg, index) => {
          const now = Date.now();
          let diffSeconds = Math.floor(
            (now - Number(msg.datetime || now)) / 1000
          );
          if (!diffSeconds) {
            diffSeconds = 1;
          }
          let diffMinutes;
          if (diffSeconds >= 60) {
            diffMinutes = Math.floor((now - Number(msg.datetime)) / 1000 / 60);
            diffSeconds = null;
          }
          let diffHours;
          if (diffMinutes >= 60) {
            diffHours = Math.floor(
              (now - Number(msg.datetime)) / 1000 / 60 / 60
            );
            diffMinutes = null;
          }
          let diffDays;
          if (diffHours >= 24) {
            diffDays = Math.floor(
              (now - Number(msg.datetime)) / 1000 / 60 / 60 / 24
            );
            diffHours = null;
          }
          console.log(msg, msg.color);
          // console.log(globalState, globalState.messages.color);
          return (
            <div key={index} className="items-start">
              <div
                key={index}
                className={
                  index % 2 === 0
                    ? "flex items-start py-1 bg-white mt-1"
                    : "flex items-start py-1 bg-white mt-1"
                }
              >
                <div
                  className={`text-${msg.color}-500 text-sm mx-2 flex flex-col justify-between h-full mt-chat min-w-70px`}
                >
                  <p>
                    {msg.author?.firstname
                      ? msg.author.firstname[0].toUpperCase() +
                        msg.author.firstname.slice(1)
                      : "Unknown"}
                    :
                  </p>
                  <span className="h-16px w-full"></span>
                </div>
                <div
                  className={`whitespace-pre-line mr-4 break-word min-w-90px bg-${msg.color}-100 rounded-md p-1`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs flex justify-end">
                    {diffSeconds
                      ? diffSeconds + "s ago"
                      : diffMinutes
                      ? diffMinutes + "min ago"
                      : diffHours
                      ? diffHours +
                        `${diffHours === 1 ? "hour ago" : "hrs ago"}`
                      : diffDays + `${diffDays === 1 ? "day ago" : "days ago"}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form
        className="flex border-r-2 border-b-2 border-l-2 items-end"
        onSubmit={(e) => {
          sendMsg(e);
          sendMsgRef.current.style.height = "40px";
        }}
      >
        <div className="flex flex-grow border-b-2 border-r-4 border-l-2 border-t-4">
          <textarea
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            className="w-full flex focus:outline-none pl-2 pt-2"
            style={{ height: 40 }}
            ref={sendMsgRef}
            onScroll={(e) => {
              e.target.style.height =
                Number(e.target.style.height.slice(0, 2)) + 10 + "px";

              console.log(e.target.style.height);
            }}
          />
        </div>
        <button className="w-20 h-46px border-b-2 border-r-2 border-t-4 flex justify-end items-center pr-1 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-7 w-7"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
          Send
        </button>
      </form>
    </div>
  );
}
