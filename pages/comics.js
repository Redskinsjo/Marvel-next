import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Header from "../components/shared/Header";
import Signin from "../components/shared/Signin";
import { withRouter } from "next/router";
import { GlobalDispatchProvider as disProvider } from "../context/GlobalContextProvider";
import Footer from "../components/shared/Footer";
import axios from "axios";
import Card from "../components/Card";
import Line from "../components/Line";

function Comics({ router, presMainData, comics }) {
  const [displaySignin, setDisplaySignin] = useState(false);
  const [displayLogout, setDisplayLogout] = useState(false);
  const dispatch = useContext(disProvider);
  const [displayDesc, setDisplayDesc] = useState(false);

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
    <div>
      <Head>
        <title>Marvel-Comics</title>
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
        <div className="flex flex-grow max-w-7xl flex-col">
          <div className="flex h-260px overflow-hidden overflow-x-auto">
            <div className="flex justify-center border-t-2 items-center mt-4 animate-slide relative">
              {presMainData.map((card) => (
                <Card
                  title={card.title}
                  url={card.thumbnail.path + "." + card.thumbnail.extension}
                  isClickable={true}
                  key={card.id}
                  comic={true}
                />
              ))}
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="absolute right-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg> */}
            </div>
          </div>
          <div className="flex flex-grow flex-col">
            <div className="flex w-full h-12 mt-2 border-b-2 border-gray-200">
              <div className="flex flex-col justify-end h-full w-20 font-black">
                <div>Character</div>
              </div>
              <div className="flex justify-center items-end items-start w-32">
                <span className="text-center mt-2 font-black">Name</span>
              </div>
              <div className={`flex items-end mt-2 w-96`}>
                <span className="font-black">Description</span>
              </div>
              <div className="flex h-full items-end">
                <span className="font-black">Comics related</span>
              </div>
            </div>
            {comics.length > 0 &&
              presMainData.map((com, index) => {
                let comic = comics.find((comic) => comic.id === com.id);

                if (index === 1) console.log("line 98", com);
                if (index === 1) console.log("line 99", comic);

                return (
                  <Line
                    title={com.title}
                    desc={com.description}
                    url={com.thumbnail.path + "." + com.thumbnail.extension}
                    characters={comic?.characters && comic.characters}
                    key={com.id}
                    displayDesc={displayDesc}
                    setDisplayDesc={setDisplayDesc}
                    id={com.id}
                  />
                );
              })}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  let presMainData;
  let comics;

  try {
    // console.log(process.env.REACT_APP_DATA_API);
    const responseResults = await axios.post(
      process.env.REACT_APP_DATA_API + "/comics"
    );

    presMainData = responseResults.data.results;
    // console.log("line 132", response);

    const comicsList = [];
    for (let i = 0; i < presMainData.length; i++) {
      const characters = await axios.get(
        `${process.env.REACT_APP_DATA_API}/comic/${presMainData[i].id}/characters`
      );
      comicsList.push({
        id: presMainData[i].id,
        characters: characters.data,
      });
    }
    comics = comicsList;
  } catch (error) {
    console.log("line 112 AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log("line 112", error.message);
  }

  return { props: { presMainData, comics } };
}

export default withRouter(Comics);
