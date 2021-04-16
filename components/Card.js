import React from "react";

export default function Card({ name, url, isClickable }) {
  return (
    <div className="w-48 pl-2 bg-gray-200">
      <div className="flex flex-col items-center relative">
        <img
          src={url}
          alt={name}
          className="w-48 h-48 object-fill hover:animate-pulse cursor-pointer"
        />
        <span className="absolute -bottom-4 bg-opacity-90 border-black border-2 bg-gray-100 text-black p-0.5 rounded-lg text-center m-1">
          {name}
        </span>
        {isClickable && (
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
        )}
      </div>
    </div>
  );
}
