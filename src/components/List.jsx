import React from 'react'
import useMusicStore from '../store/useMusicStore'

const List = ({ song: { id, name }, setCurrentSong, audioTagRef, setIsPlay }) => {
   const { songs } = useMusicStore();
   const handleClick = () => {
      setCurrentSong(songs[id-1]);
      setTimeout(() => {
         audioTagRef.current.play();
         setIsPlay(true)
      }, 50);
   }
   return (
      <div
         onClick={handleClick}
         className="bg-slate-50/40 hover:bg-slate-50/50 shadow hover:shadow-lg duration-300 rounded-r-lg border-l-4 border-primary-500 hover:border-secondary py-1 px-2"
      >
         <span className='line-clamp-1'>{name}</span>
      </div>
   )
}

export default List