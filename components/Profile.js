import React from "react";

export default function Profile({
  title,
  url,
  description,
  format,
  pageCount,
  issueNumber,
  upc,
  diamondCode,
  name,
}) {
  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-col justify-start items-center w-full h-410px">
        <div className="flex justify-center items-center h-5/6">
          <img
            src={url}
            alt={title || name}
            className="h-full w-1/2 object-contain"
          />
        </div>
        <span className="text-xl font-bold mt-4">{title || name}</span>
      </div>
      <div className="flex flex-col w-full px-4">
        <div className="w-full border-b-2 border-black">
          <span className="mx-8 font-bold">Description</span>
        </div>
        <p className="mx-8 my-4">{description || "No info available"}</p>
        <span className="mx-8 leading-7 font-bold">
          Format:{" "}
          <span className="font-normal ml-4">
            {format || "No info available"}
          </span>
        </span>
        <span className="mx-8 leading-7 font-bold">
          Page count:{" "}
          <span className="font-normal ml-4">
            {pageCount || "No info available"}
          </span>
        </span>
        <span className="mx-8 leading-7 font-bold">
          Issue number:{" "}
          <span className="font-normal ml-4">
            {issueNumber || "No info available"}
          </span>
        </span>
        <span className="mx-8 leading-7 font-bold">
          UPC:{" "}
          <span className="font-normal ml-4">{upc || "No info available"}</span>
        </span>
        <span className="mx-8 leading-7 font-bold">
          Diamond code:{" "}
          <span className="font-normal ml-4">
            {diamondCode || "No info available"}
          </span>
        </span>
      </div>
    </div>
  );
}
