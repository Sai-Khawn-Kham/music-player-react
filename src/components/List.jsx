import React from "react";
import useMusicStore from "../store/useMusicStore";

const List = ({
  song: { id, name, url, artist, cover },
  setCurrentSong,
  audioTagRef,
  setIsPlay,
  currentSong,
  isPlay,
}) => {
  const { songs } = useMusicStore();

  const handleClick = () => {
    setCurrentSong(songs[id - 1]);
    setTimeout(() => {
      audioTagRef.current.play();
      setIsPlay(true);
    }, 50);
  };

  return (
    <div
      onClick={handleClick}
      className="grid grid-cols-3 active:scale-90 hover:shadow-lg hover:bg-slate-50 duration-300 p-3"
    >
      <div>
        <img src={cover} alt={name} className="size-[80px] rounded-full" />
      </div>
      <div className="flex flex-col justify-center">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-slate-700">{artist}</p>
      </div>
      <div className="flex justify-end items-center">
        {isPlay && id === currentSong.id ? (
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        ) : (
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default List;
