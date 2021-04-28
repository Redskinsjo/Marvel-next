import React from "react";
import Link from "next/link";

export default function ComicLineforChar({
  title,
  url,
  comicsLength,
  id,
  style,
}) {
  // Component designing each comic showed in a Character
  return (
    <Link href={`/comics/${id}`}>
      <a
        className={`flex items-center ${
          comicsLength <= 4 ? "h-1/2" : "h-1/4"
        } w-1/2 hover:bg-red-100 ${style} targetChildSpan:text-black`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="h-20px w-20px">
          <img src={url} alt={title} className="h-full w-full" />
        </div>
        <div className="flex items-center w-225px truncate h-20px">
          <span className="text-sm">{title}</span>
        </div>
      </a>
    </Link>
  );
}
