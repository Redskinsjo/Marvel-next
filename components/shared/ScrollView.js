import React from "react";
import Card from "../Card";

export default function ScrollView({ data, horizontal }) {
  return (
    <>
      <div
        className={`${
          horizontal
            ? "flex h-60 w-96 overflow-x-scroll justif-start items-center"
            : "flex flex-col h-96 w-60 overflow-y-scroll justify-start items-center"
        } border-black border-t-2 overflow-hidden`}
      >
        {data.map((item) => (
          <Card
            name={
              item.name ? item.name : item.title ? item.title : item.fullName
            }
            url={
              item.thumbnail
                ? item.thumbnail.path + "." + item.thumbnail.extension
                : "/images/notfound.jpg"
            }
            key={item.id}
            isClickable={false}
            horizontal={horizontal}
          />
        ))}
      </div>
    </>
  );
}
