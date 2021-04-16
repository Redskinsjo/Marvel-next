import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Header from "../../components/shared/Header";
import Signin from "../../components/shared/Signin";
import { withRouter } from "next/router";
import { GlobalDispatchProvider as disProvider } from "../../context/GlobalContextProvider";
import axios from "axios";
import Footer from "../../components/shared/Footer";
import Lottie from "react-lottie";
import * as animationData from "../../styles/jump.json";

function Comic({ router, data }) {
  const [displaySignin, setDisplaySignin] = useState(false);
  const [displayLogout, setDisplayLogout] = useState(false);
  const dispatch = useContext(disProvider);

  //   console.log("line 17 hello", data);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const autoLogin = async () => {
    try {
      const response = await client.reAuthenticate();

      if (response) {
        dispatch({ type: "CONNECT", payload: response.user });
      }
    } catch (error) {}
  };

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <>
      <Head>
        <title>Marvel-Characters</title>
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
          displaySearch={true}
          nav={router.pathname}
        />
        {router.isFallback && (
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            isStopped={false}
            isPaused={false}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  let paths;
  try {
    const {
      data: { results, total },
    } = await axios.post("https://backendmarvel.herokuapp.com/comics");

    // console.log("line 94", results[0]);

    paths = results.map((comic) => {
      return {
        params: {
          id: String(comic.id),
        },
      };
    });
  } catch (error) {
    console.log(error.message);
  }

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  //   console.log("line 112", params);

  if (params.id) {
    try {
      //   console.log("if");
      let response = await axios.get(
        `https://backendmarvel.herokuapp.com/comic/${params.id}`
      );
      //   console.log("down");
      return response ? { props: { data: response.data } } : { notFound: true };
    } catch (error) {
      console.log("line 122", error.message);
      return { notFound: true };
    }
  } else {
    console.log("else");
    return { notFound: true };
  }
}

export default withRouter(Comic);
