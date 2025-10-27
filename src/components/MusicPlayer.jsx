import React from "react";
import List from "./List";
import useMusicStore from "../store/useMusicStore";
import Container from "./Container";
import { BiPause, BiPlay, BiSkipNext, BiSkipPrevious } from "react-icons/bi";

const MusicPlayer = () => {
  const { songs } = useMusicStore();
  const audioTagRef = React.useRef(null);

  const [currentSong, setCurrentSong] = React.useState(songs[0]);
  const [dark, setDark] = React.useState(false);
  const [isPlay, setIsPlay] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState("00:00");
  const [songDuration, setSongDuration] = React.useState("00:00");
  const [seek, setSeek] = React.useState(0);
  const [maxSeek, setMaxSeek] = React.useState(0);

  React.useEffect(() => {
    if (isPlay) {
      audioTagRef.current.play();
    } else {
      audioTagRef.current.pause();
    }
  }, [isPlay, currentSong]);

  // Update duration once the song is loaded
  React.useEffect(() => {
    const updateDuration = () => {
      if (audioTagRef.current?.duration) {
        setMaxSeek(audioTagRef.current.duration);
        setSongDuration(formatTime(Math.floor(audioTagRef.current.duration)));
      }
    };
    audioTagRef.current?.addEventListener("loadedmetadata", updateDuration);
    return () => {
      audioTagRef.current?.removeEventListener(
        "loadedmetadata",
        updateDuration
      );
    };
  }, [currentSong]);
  // setTimeout(() => {
  //   setMaxSeek(audioTagRef.current.duration);
  //   setSongDuration(formatTime(parseInt(audioTagRef.current.duration)));
  // }, 500);

  // Update current time every 500ms while playing
  React.useEffect(() => {
    let interval;
    if (isPlay) {
      interval = setInterval(() => {
        if (audioTagRef.current) {
          setSeek(audioTagRef.current.currentTime);
          setCurrentTime(
            formatTime(Math.floor(audioTagRef.current.currentTime))
          );
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlay]);
  // setInterval(() => {
  //   setSeek(audioTagRef.current.currentTime);
  //   setCurrentTime(formatTime(parseInt(audioTagRef.current.currentTime)));
  // }, 500);

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

  const handleNext = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlay(true);
    // if (currentSong.id == songs.length) {
    //   setCurrentSong(songs[0]);
    // } else {
    //   setCurrentSong(songs[currentSong.id]);
    // }
    // setTimeout(() => {
    //   audioTagRef.current.play();
    //   setIsPlay(true);
    // }, 50);
  };

  const handlePlay = () => {
    if (isPlay) {
      audioTagRef.current.pause();
    } else {
      audioTagRef.current.play();
    }
    setIsPlay(!isPlay);
  };

  const handlePrevious = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setIsPlay(true);
    // if (currentSong.id == 1) {
    //   setCurrentSong(songs[songs.length - 1]);
    // } else {
    //   setCurrentSong(songs[currentSong.id - 2]);
    // }
    // setTimeout(() => {
    //   audioTagRef.current.play();
    //   setIsPlay(true);
    // }, 50);
  };

  const handleSeek = (e) => {
    audioTagRef.current.currentTime = e.target.value;
    // audioTagRef.current.currentTime = e.target.value;
    // audioTagRef.current.play();
    // setIsPlay(true);
  };

  const handleTheme = () => {
    setDark(!dark);
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

  return (
    <div className="h-screen flex flex-col">
      <audio
        src={currentSong.url}
        ref={audioTagRef}
        onEnded={handleEnded}
      ></audio>
      <div className="w-full shadow-lg">
        <Container className={`flex justify-between p-3`}>
          <div>
            <h1 className="font-semibold font-serif text-3xl">Khawn</h1>
          </div>
          <div className="flex justify-center items-center">
            {dark ? (
              <button onClick={handleTheme} className="cursor-pointer">
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
              <button onClick={handleTheme} className="cursor-pointer">
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
        </Container>
      </div>
      <div className="grow relative w-full">
        <Container className="p-3">
          <h2 className="font-medium font-serif text-2xl mb-2">Lists</h2>
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-237px)] scroll-pb-6 pb-3 hsb">
            {songs.map((song) => (
              <List
                key={song.id}
                song={song}
                setCurrentSong={setCurrentSong}
                audioTagRef={audioTagRef}
                setIsPlay={setIsPlay}
                currentSong={currentSong}
                isPlay={isPlay}
              />
            ))}
          </div>
        </Container>
        <div className="absolute bottom-0 w-full bg-slate-400">
          <Container className="space-y-1 p-2">
            <div className="flex justify-between items-center gap-3 text-sm">
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
            <div className="flex justify-between">
              <div className="flex gap-3">
                <div className="flex justify-center items-center">
                  <img
                    src={currentSong.cover}
                    alt={currentSong.name}
                    className={`size-[60px] rounded-full object-cover shadow-slate-300/20 animate-rotate ${
                      isPlay ? "animation-play" : "animation-paused"
                    }`}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-medium text-xl line-clamp-1">
                    {currentSong.name}
                  </p>
                  <p className=" line-clamp-1">{currentSong.artist}</p>
                </div>
              </div>
              <div className="flex">
                <button
                  onClick={handlePrevious}
                  className="hidden md:inline-block"
                >
                  <BiSkipPrevious className="text-slate-50 size-12" />
                </button>
                <button onClick={handlePlay} className="p-1">
                  {isPlay ? (
                    <BiPause className="text-slate-50 size-16" />
                  ) : (
                    <BiPlay className="text-slate-50 size-16 translate-x-1" />
                  )}
                </button>
                <button onClick={handleNext} className="hidden md:inline-block">
                  <BiSkipNext className="text-slate-50 size-12" />
                </button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
