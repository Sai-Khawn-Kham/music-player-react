import React, { useRef, useState } from "react";
import useMusicStore from "../store/useMusicStore";
import { BiLeftArrowAlt, BiPause, BiPlay, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { Link } from "react-router";
import List from "./List";

const MusicPlayer = () => {
   const { songs } = useMusicStore();
   const audioTagRef = useRef(null);

   const [ isPlay, setIsPlay ] = useState(false);
   const [ currentSong, setCurrentSong ] = useState(songs[0]);
   const [ currentTime, setCurrentTime ] = useState("00:00");
   const [ songDuration, setSongDuration ] = useState("00:00");
   const [ seek, setSeek ] = useState(0);
   const [ maxSeek, setMaxSeek ] = useState(0);

   setTimeout(() => {
      setMaxSeek(audioTagRef.current.duration);
      setSongDuration(formatTime(parseInt(audioTagRef.current.duration)));
   }, 500);

   setInterval(() => {
      setSeek(audioTagRef.current.currentTime);
      setCurrentTime(formatTime(parseInt(audioTagRef.current.currentTime)));
   }, 500);
   
   const handlePlay = () => {
      if(isPlay) {
         audioTagRef.current.pause();
      } else {
         audioTagRef.current.play();
      }
      setIsPlay(!isPlay);
   }

   const handleSeek = (e) => {
      audioTagRef.current.currentTime = e.target.value;
      audioTagRef.current.play()
      setIsPlay(true)
   }

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
      if(currentSong.id==1) {
         setCurrentSong(songs[songs.length-1])
      } else {
         setCurrentSong(songs[currentSong.id-2])
      }
      setTimeout(() => {
         audioTagRef.current.play();
         setIsPlay(true)
      }, 50);
   }

   const handleNext = () => {
      if(currentSong.id==songs.length) {
         setCurrentSong(songs[0])
      } else {
         setCurrentSong(songs[currentSong.id])
      }
      setTimeout(() => {
         audioTagRef.current.play()
         setIsPlay(true)
      }, 50);
   }

   const handleEnded = () => {
      if(currentSong.id==songs.length) {
         setCurrentSong(songs[0])
      } else {
         setCurrentSong(songs[currentSong.id])
      }
      setTimeout(() => {
         audioTagRef.current.play()
      }, 50);
   }
   return (
      <div className="bg-primary-500 w-full h-screen flex justify-center items-center">
         <audio src={currentSong.url} ref={audioTagRef} onEnded={handleEnded}></audio>
         <div className="grid md:grid-cols-2 w-[340px] md:w-[660px] h-[530px] rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col gap-7 bg-slate-50/20 p-3">
               <Link to={"https://khawn-portfolio.netlify.app"}>
                  <BiLeftArrowAlt className="size-7" />
               </Link>
               <div className="text-center capitalize">
                  <h1 className="text-2xl font-medium">{currentSong.name}</h1>
                  <p className="text-lg">{currentSong.artist}</p>
               </div>
               <div className="flex justify-center">
                  <div style={{backgroundImage:`url(${currentSong.cover})`}} className={`w-[180px] h-[180px] rounded-full bg-center bg-cover shadow-disk shadow-slate-50/8 relative before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:size-7 before:rounded-full before:bg-primary-800 before:shadow-disk-center before:shadow-slate-50/80 animate-rotate ${isPlay?"animation-play":"animation-paused"}`}></div>
               </div>
               <div className="flex justify-between items-center gap-1 text-sm">
                  <span>{currentTime}</span>
                  <input
                     type="range"
                     value={seek}
                     max={maxSeek}
                     onChange={handleSeek}
                     className="seek-bar w-full [-webkit-appearance:none] h-[7px] rounded-xl bg-primary-500 cursor-pointer overflow-hidden" 
                  />
                  <span>{songDuration}</span>
               </div>
               <div className="w-[60%] mx-auto flex justify-between items-center">
                  <button
                     onClick={handlePrevious}
                     className="bg-secondary w-10 h-10 rounded-full cursor-pointer flex justify-center items-center"
                  >
                     <BiSkipPrevious className="text-primary-800 size-10" />
                  </button>
                  <button
                     onClick={handlePlay}
                     className="bg-secondary w-14 h-14 rounded-full cursor-pointer flex justify-center items-center"
                  >
                     {isPlay ? (
                        <BiPause className="text-primary-800 size-14" />
                     ) : (
                        <BiPlay className="text-primary-800 size-13 translate-x-1" />
                     )}
                  </button>
                  <button
                     onClick={handleNext}
                     className="bg-secondary w-10 h-10 rounded-full cursor-pointer flex justify-center items-center"
                  >
                     <BiSkipNext className="text-primary-800 size-10" />
                  </button>
               </div>
            </div>
            <div className="hidden md:block bg-slate-50/30 p-3">
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
            </div>
         </div>
      </div>
   );
};

export default MusicPlayer;
