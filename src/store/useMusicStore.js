import { create } from "zustand";

const useMusicStore = create((set) => ({
   songs: [
      {
         id: 1,
         name: "Take Me To Your Heart",
         url: "/public/assets/musicPlayer/take-me-to-your-heart.mp3",
         artist: "Michael Learns To Rock",
         cover: "/public/assets/musicPlayer/mp-c1.jpg",
      },
      {
         id: 2,
         name: "I Like You So Much",
         url: "/public/assets/musicPlayer/i-like-you-so-much.mp3",
         artist: "Wang Junqi",
         cover: "/public/assets/musicPlayer/mp-c2.jpg",
      },
      {
         id: 3,
         name: "That Girl",
         url: "/public/assets/musicPlayer/that-girl.mp3",
         artist: "Olly Murs",
         cover: "/public/assets/musicPlayer/mp-c3.jpg",
      },
      {
         id: 4,
         name: "Until You",
         url: "/public/assets/musicPlayer/until-you.mp3",
         artist: "Shayne Ward",
         cover: "/public/assets/musicPlayer/mp-c4.jpg",
      },
      {
         id: 5,
         name: "You Belong With Me",
         url: "/public/assets/musicPlayer/you-belong-with-me.mp3",
         artist: "Taylor Swift",
         cover: "/public/assets/musicPlayer/mp-c5.jpg",
      },
   ],
}));

export default useMusicStore;