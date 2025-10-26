import React, { useRef, useState } from "react";
import useMusicStore from "../store/useMusicStore";
import { BiPause, BiPlay, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import List from "./List";

const MusicPlayer = () => {
  const { songs } = useMusicStore();
  const audioTagRef = useRef(null);

  const [dark, setDark] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [songDuration, setSongDuration] = useState("00:00");
  const [seek, setSeek] = useState(0);
  const [maxSeek, setMaxSeek] = useState(0);

  setTimeout(() => {
    setMaxSeek(audioTagRef.current.duration);
    setSongDuration(formatTime(parseInt(audioTagRef.current.duration)));
  }, 500);

  setInterval(() => {
    setSeek(audioTagRef.current.currentTime);
    setCurrentTime(formatTime(parseInt(audioTagRef.current.currentTime)));
  }, 500);

  const handlePlay = () => {
    if (isPlay) {
      audioTagRef.current.pause();
    } else {
      audioTagRef.current.play();
    }
    setIsPlay(!isPlay);
  };

  const handleSeek = (e) => {
    audioTagRef.current.currentTime = e.target.value;
    audioTagRef.current.play();
    setIsPlay(true);
  };

  const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
      min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec}`;
  };

  const handlePrevious = () => {
    if (currentSong.id == 1) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[currentSong.id - 2]);
    }
    setTimeout(() => {
      audioTagRef.current.play();
      setIsPlay(true);
    }, 50);
  };

  const handleNext = () => {
    if (currentSong.id == songs.length) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[currentSong.id]);
    }
    setTimeout(() => {
      audioTagRef.current.play();
      setIsPlay(true);
    }, 50);
  };

  const handleEnded = () => {
    if (currentSong.id == songs.length) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[currentSong.id]);
    }
    setTimeout(() => {
      audioTagRef.current.play();
    }, 50);
  };

  const handleTheme = () => {
    setDark(!dark);
  };
  return (
    <div className={`${dark ? "dark" : ""} w-full h-screen flex flex-col`}>
      <audio
        src={currentSong.url}
        ref={audioTagRef}
        onEnded={handleEnded}
      ></audio>
      <div className="flex justify-between p-3 dark:bg-slate-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
        {dark ? (
          <button onClick={handleTheme}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </button>
        ) : (
          <button onClick={handleTheme}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </button>
        )}
      </div>
      <div
        className="grow relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${currentSong.cover})` }}
      >
        <div className="absolute inset-0 bg-slate-700/70"></div>
        <div className="h-full relative z-10">
          <div className="h-3/5 flex justify-center items-center">
            <div
              style={{ backgroundImage: `url(${currentSong.cover})` }}
              className={`size-[230px] rounded-full bg-center bg-cover shadow-disk shadow-slate-300/20 animate-rotate ${
                isPlay ? "animation-play" : "animation-paused"
              }`}
            ></div>
          </div>
          <div className="space-y-5">
            <div className="text-center capitalize text-slate-50">
              <h1 className="font-medium text-2xl">{currentSong.name}</h1>
              <p className="text-lg">{currentSong.artist}</p>
            </div>
            <div className="flex justify-between items-center gap-3 text-sm text-slate-50">
              <span>{currentTime}</span>
              <input
                type="range"
                value={seek}
                max={maxSeek}
                onChange={handleSeek}
                className="seek-bar w-full [-webkit-appearance:none] h-[7px] rounded-xl bg-slate-100 cursor-pointer overflow-hidden"
              />
              <span>{songDuration}</span>
            </div>
            <div className="w-2/3 mx-auto flex justify-between items-center">
              <button
                onClick={handlePrevious}
                className="size-14 rounded-full cursor-pointer flex justify-center items-center"
              >
                <BiSkipPrevious className="text-slate-50 size-12" />
              </button>
              <button
                onClick={handlePlay}
                className="size-20 rounded-full border-4 border-slate-50 cursor-pointer flex justify-center items-center"
              >
                {isPlay ? (
                  <BiPause className="text-slate-50 size-17" />
                ) : (
                  <BiPlay className="text-slate-50 size-16 translate-x-1" />
                )}
              </button>
              <button
                onClick={handleNext}
                className="size-14 rounded-full cursor-pointer flex justify-center items-center"
              >
                <BiSkipNext className="text-slate-50 size-12" />
              </button>
            </div>
          </div>
        </div>
        {/* <div className="hidden md:block bg-slate-50/30 p-3">
          <div className="flex flex-col gap-3 h-[506px] overflow-auto hsb border border-slate-300 rounded p-3">
            {songs.map((song) => (
              <List
                key={song.id}
                song={song}
                setCurrentSong={setCurrentSong}
                audioTagRef={audioTagRef}
                setIsPlay={setIsPlay}
              />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MusicPlayer;
