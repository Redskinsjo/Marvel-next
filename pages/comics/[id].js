import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Header from "../../components/shared/Header";
import Signin from "../../components/shared/Signin";
import { withRouter } from "next/router";
import { GlobalDispatchProvider as disProvider } from "../../context/GlobalContextProvider";
import axios from "axios";
import Footer from "../../components/shared/Footer";
// import Lottie from "react-lottie";
// import * as animationData from "../../styles/jump.json";
import Profile from "../../components/Profile";
import ScrollView from "../../components/shared/ScrollView";

function Comic({ router, data, characters, events, stories, creators }) {
  const [displaySignin, setDisplaySignin] = useState(false);
  const [displayLogout, setDisplayLogout] = useState(false);
  const dispatch = useContext(disProvider);
  const [isReady, setIsReady] = useState(false);

  //   const defaultOptions = {
  //     loop: true,
  //     autoplay: true,
  //     animationData: animationData,
  //     rendererSettings: {
  //       preserveAspectRatio: "xMidYMid slice",
  //     },
  //   };

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
    setIsReady(true);
    // console.log(data);
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
          displaySearch={false}
          nav={router.pathname}
        />
        {/* {router.isFallback && (
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            isStopped={false}
            isPaused={false}
          />
        )} */}
        {isReady && (
          <div className="flex flex-col flex-grow">
            <div className="flex h-full">
              <div className="w-1/3">
                <div className="h-410px flex flex-col justify-center items-center relative">
                  {events.length > 2 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="absolute w-8 right-44 -top-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}

                  <h3 className="font-bold text-lg">Events</h3>
                  <ScrollView horizontal={false} data={events} />
                </div>
                <div className="h-410px flex flex-col justify-center items-center relative">
                  {creators.length > 2 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="absolute w-8 right-24 top-16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                  <h3 className="font-bold text-lg">Creators</h3>
                  <ScrollView horizontal={true} data={creators} />
                </div>
              </div>
              <div className="w-1/3">
                <Profile
                  title={data[0].title}
                  url={
                    data[0].thumbnail.path + "." + data[0].thumbnail.extension
                  }
                  description={data[0].description}
                  format={data[0].format}
                  pageCount={data[0].pageCount}
                  issueNumber={data[0].issueNumber}
                  upc={data[0].upc}
                  diamondCode={data[0].diamondCode}
                />
              </div>
              <div className="w-1/3">
                <div className="h-410px flex flex-col justify-center items-center relative">
                  {characters.length > 2 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="absolute w-8 right-44 -top-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                  <h3 className="font-bold text-lg">Characters</h3>
                  <ScrollView horizontal={false} data={characters} />
                </div>
                <div className="h-410px flex flex-col justify-center items-center relative">
                  {stories.length > 2 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="absolute w-8 right-24 top-16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                  <h3 className="font-bold text-lg">Stories</h3>
                  <ScrollView horizontal={true} data={stories} />
                </div>
              </div>
            </div>
          </div>
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
    } = await axios.post(process.env.REACT_APP_DATA_API + "/comics");

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
  if (params.id) {
    try {
      let comicInfo = await axios.get(
        `${process.env.REACT_APP_DATA_API}/comic/${params.id}`
      );
      let characters = await axios.get(
        `${process.env.REACT_APP_DATA_API}/comic/${params.id}/characters`
      );
      let events = await axios.get(
        `${process.env.REACT_APP_DATA_API}/comic/${params.id}/events`
      );
      let stories = await axios.get(
        `${process.env.REACT_APP_DATA_API}/comic/${params.id}/stories`
      );
      let creators = await axios.get(
        `${process.env.REACT_APP_DATA_API}/comic/${params.id}/creators`
      );

      return params.id
        ? {
            props: {
              data: comicInfo.data,
              characters: characters.data,
              events: events.data,
              stories: stories.data,
              creators: creators.data,
            },
          }
        : { notFound: true };
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
