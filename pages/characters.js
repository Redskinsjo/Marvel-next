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

function Characters({ router, presMainData, presComics }) {
  const [displaySignin, setDisplaySignin] = useState(false);
  const [displayLogout, setDisplayLogout] = useState(false);
  const dispatch = useContext(disProvider);
  const [characters, setCharacters] = useState(presComics);
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
        <div className="flex flex-grow max-w-7xl flex-col">
          <div className="flex h-260px overflow-hidden overflow-x-auto">
            <div className="flex justify-center border-t-2 items-center mt-4 animate-slide relative">
              {presMainData.map((card) => (
                <Card
                  name={card.name}
                  url={card.thumbnail.path + "." + card.thumbnail.extension}
                  isClickable={false}
                  key={card.id}
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
            {characters.length > 0 &&
              presMainData.map((char, index) => {
                let character = characters.find(
                  (character) => character.id === char.id
                );

                return (
                  <Line
                    name={char.name}
                    desc={char.description}
                    url={char.thumbnail.path + "." + char.thumbnail.extension}
                    comics={character?.comics && character.comics}
                    key={char.id}
                    displayDesc={displayDesc}
                    setDisplayDesc={setDisplayDesc}
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
  let presComics;

  try {
    const responseResults = await axios.post(
      process.env.REACT_APP_DATA_API + "/characters",
      { limit: 20 }
    );
    presMainData = responseResults.data.results;

    const chars = [];
    for (let i = 0; i < presMainData.length; i++) {
      const comics = await axios.get(
        `${process.env.REACT_APP_DATA_API}/character/${presMainData[i].id}/comics`
      );
      chars.push({
        id: presMainData[i].id,
        comics: comics.data,
      });
    }
    presComics = chars;
  } catch (error) {
    console.log("line 112", error.message);
  }

  return { props: { presMainData, presComics } };
}

export default withRouter(Characters);
