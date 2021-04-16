// import styles from "../styles/Home.module.css";
import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Header from "../components/shared/Header";
import Chat from "../components/Chat";
import Signin from "../components/shared/Signin";
import io from "socket.io-client";
import feathers from "@feathersjs/client";
import { withRouter } from "next/router";
import {
  GlobalStateProvider as stateProvider,
  GlobalDispatchProvider as disProvider,
} from "../context/GlobalContextProvider";
import Footer from "../components/shared/Footer";

const socket = io(process.env.REACT_APP_SERVER_URL);
const client = feathers();
client.configure(feathers.socketio(socket));
client.configure(feathers.authentication());

function Home({ router }) {
  const [displaySignin, setDisplaySignin] = useState(false);
  const [displayLogout, setDisplayLogout] = useState(false);
  const globalState = useContext(stateProvider);
  const dispatch = useContext(disProvider);

  const autoLogin = async () => {
    try {
      const response = await client.reAuthenticate();

      if (response) {
        dispatch({ type: "CONNECT", payload: response.user });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!globalState.justSignedUp) {
      autoLogin();
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Marvel-Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        onClick={() => {
          setDisplayLogout(false);
        }}
        className="flex flex-col items-center h-screen relative"
      >
        {displaySignin && <Signin setDisplaySignin={setDisplaySignin} />}
        <Header
          setDisplaySignin={setDisplaySignin}
          displayLogout={displayLogout}
          setDisplayLogout={setDisplayLogout}
          displaySearch={false}
          nav={router.pathname}
        />
        <div className="flex flex-grow">
          <Chat />
        </div>
        <Footer />
      </main>

      {/* <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */}
    </div>
  );
}

export default withRouter(Home);
