import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Card({
  character,
  comic,
  name,
  title,
  url,
  isClickable,
  horizontal,
  id,
}) {
  // Component serving the different types of card on "/characters", "/comics" or on "/[id].js"
  return (
    <>
      {isClickable ? (
        <Link
          href={
            character ? `/characters/${id}` : comic ? `/comics/${id}` : null
          }
        >
          <a
            className={`${
              isClickable ? "bg-gray-200 pl-4 w-48 ml-4" : "bg-gray-100"
            } ${horizontal ? "pr-4" : "pb-4"}`}
          >
            <div
              className={`flex flex-col items-center relative ${
                isClickable ? "w-48" : "w-32"
              }`}
            >
              {url[0] === "/" ? (
                <div className="w-32 h-32 hover:animate-pulse">
                  <Image
                    src="/images/notfound.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt={name}
                  />
                </div>
              ) : (
                <img
                  src={url}
                  alt={name}
                  className={`${
                    isClickable ? "w-48 h-48" : "w-32 h-32"
                  } object-fill hover:animate-pulse`}
                />
              )}

              <span
                className={`absolute -bottom-4 bg-opacity-90 border-black border-2 bg-gray-100 text-black p-0.5 rounded-lg text-center m-1`}
              >
                {name && name.length > 22 ? name.slice(0, 22) : name}
                {title && title.length > 22 ? title.slice(0, 22) : title}
              </span>
              {/* {isClickable && (
        <div className="flex justify-center items-center">
          <div className="py-2 px-4 cursor-pointer flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>Add to favourites</span>
          </div>
        </div>
      )} */}
            </div>
          </a>
        </Link>
      ) : (
        <div
          className={`${
            isClickable ? "bg-gray-200 pl-4 w-48 ml-4" : "bg-gray-100"
          } ${horizontal ? "pr-4" : "pb-4"}`}
        >
          <div
            className={`flex flex-col items-center relative ${
              isClickable ? "w-48" : "w-32"
            }`}
          >
            {url[0] === "/" ? (
              <div className="w-32 h-32 hover:animate-pulse">
                <Image
                  src="/images/notfound.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt={name}
                />
              </div>
            ) : (
              <img
                src={url}
                alt={name}
                className={`${
                  isClickable ? "w-48 h-48" : "w-32 h-32"
                } object-fill hover:animate-pulse`}
              />
            )}

            <span
              className={`absolute -bottom-4 bg-opacity-90 border-black border-2 bg-gray-100 text-black p-0.5 rounded-lg text-center m-1`}
            >
              {name && name.length > 22 ? name.slice(0, 22) : name}
            </span>
            {/* {isClickable && (
          <div className="flex justify-center items-center">
            <div className="py-2 px-4 cursor-pointer flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>Add to favourites</span>
            </div>
          </div>
        )} */}
          </div>
        </div>
      )}
    </>
  );
}
