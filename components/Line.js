import React, { useState } from "react";
import ComicLineforChar from "../components/ComicLineforChar";
import CharLineforComic from "../components/CharLineforComic";

export default function Line({ chars, comics, desc, name, url }) {
  const [descEmpty, setDescEmpty] = useState(desc ? false : true);
  const [displayDesc, setDisplayDesc] = useState(false);
  return (
    <>
      {!displayDesc ? (
        <div className="flex w-full h-20 box-content py-2 border-b-2 border-gray-200">
          <div className="h-full w-20">
            <img src={url} alt={name} className="h-full w-full object-fill" />
          </div>
          <div className="flex justify-center items-start w-32">
            <span className="text-center mt-2 font-semibold">{name}</span>
          </div>
          <div
            className={`flex items-start mt-2 w-96 ${
              descEmpty ? "bg-gray-300 h-64px" : "bg-red-100 h-72px"
            } relative`}
          >
            <p className="h-full overflow-ellipsis overflow-hidden">{desc}</p>
            {!descEmpty && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="absolute bottom-0 right-0 w-4 hover:text-lg cursor-pointer"
                onClick={() => {
                  setDisplayDesc(true);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          <div
            className={`flex w-688px flex-wrap ${
              comics?.length > 4 ? "h-full" : "h-1/2"
            } justify-between ml-2 pl-2`}
          >
            {comics
              ? comics.map((comic, index) => {
                  if (index >= 8) return;
                  return (
                    <ComicLineforChar
                      name={comic.title}
                      url={
                        comic.thumbnail.path + "." + comic.thumbnail.extension
                      }
                      comicsLength={comics?.length}
                      id={comic.id}
                      key={comic.id}
                    />
                  );
                })
              : chars.map((char) => {
                  return <CharLineforComic />;
                })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex w-full h-20 mt-2">
            <div className="h-full w-20">
              <img src={url} alt={name} className="h-full w-full object-fill" />
            </div>
            <div className="flex justify-center items-start w-32">
              <span className="text-center mt-2 font-semibold">{name}</span>
            </div>
            <div
              className={`flex items-start mt-2 w-96 ${
                descEmpty ? "bg-gray-300 h-64px" : "bg-red-100 h-72px"
              } relative z-10`}
            >
              <p className="h-full">{desc}</p>
            </div>
            <div
              className={`flex w-688px flex-wrap ${
                comics?.length > 4 ? "h-full" : "h-1/2"
              } justify-between ml-2 pl-2`}
            >
              {comics
                ? comics.map((comic, index) => {
                    if (index >= 8) return;
                    return (
                      <ComicLineforChar
                        name={comic.title}
                        url={
                          comic.thumbnail.path + "." + comic.thumbnail.extension
                        }
                        comicsLength={comics?.length}
                        id={comic.id}
                        key={comic.id}
                      />
                    );
                  })
                : chars.map((char) => {
                    return <CharLineforComic />;
                  })}
            </div>
          </div>
          <div className="flex flex-grow w-full">
            <div className="h-full w-20"></div>
            <div className="flex justify-center items-start w-32"></div>
            <div
              className={`flex items-start w-96 ${
                descEmpty ? "bg-gray-300 h-64px" : "bg-red-100 h-72px"
              } relative`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="absolute bottom-0 right-0 w-4 hover:text-lg cursor-pointer"
                onClick={() => {
                  setDisplayDesc(false);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div
              className={`flex w-688px flex-wrap ${
                comics?.length > 4 ? "h-full" : "h-1/2"
              } justify-between ml-2 pl-2`}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
