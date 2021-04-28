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

function Character({ router, data, comics, events, stories, series }) {
  const [displaySignin, setDisplaySignin] = useState(false);
  const [displayLogout, setDisplayLogout] = useState(false);
  const dispatch = useContext(disProvider);
  const [isReady, setIsReady] = useState(false);

  console.log(router);

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
                  {events && events.length > 2 && (
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
                  {series && series.length > 2 && (
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
                  <h3 className="font-bold text-lg">Series</h3>
                  <ScrollView horizontal={true} data={series} />
                </div>
              </div>
              <div className="w-1/3">
                <Profile
                  title={data[0].title}
                  name={data[0].name}
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
                  {comics && comics.length > 2 && (
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
                  <h3 className="font-bold text-lg">Comics</h3>
                  <ScrollView horizontal={false} data={comics} />
                </div>
                <div className="h-410px flex flex-col justify-center items-center relative">
                  {stories && stories.length > 2 && (
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
    } = await axios.post(process.env.REACT_APP_DATA_API + "/characters");

    paths = results.map((char) => {
      return {
        params: {
          id: String(char.id),
        },
      };
    });
  } catch (error) {
    console.log("line 211", error.message);
  }

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  if (params.id) {
    try {
      let characterInfo = await axios.get(
        `${process.env.REACT_APP_DATA_API}/character/${params.id}`
      );
      let comics = await axios.get(
        `${process.env.REACT_APP_DATA_API}/character/${params.id}/comics`
      );
      let events = await axios.get(
        `${process.env.REACT_APP_DATA_API}/character/${params.id}/events`
      );
      let stories = await axios.get(
        `${process.env.REACT_APP_DATA_API}/character/${params.id}/stories`
      );
      let series = await axios.get(
        `${process.env.REACT_APP_DATA_API}/character/${params.id}/series`
      );

      return params.id
        ? {
            props: {
              data: characterInfo.data,
              comics: comics.data,
              events: events.data,
              stories: stories.data,
              series: series.data,
            },
          }
        : { notFound: true };
    } catch (error) {
      console.log("line 122", error.response);
      return { notFound: true };
    }
  } else {
    console.log("else");
    return { notFound: true };
  }
}

export default withRouter(Character);
