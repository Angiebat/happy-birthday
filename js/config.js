/* ==========================================================
   ✿ ЭНЭ ФАЙЛЫГ Л ӨӨРЧИЛНӨ ✿
   Бусад файлд гар хүрэх шаардлагагүй.
   ========================================================== */
window.CONFIG = {

  /* 1. Нэр (гарчиг дээр гарна) */
  name: "Emoji",

  /* 2. Зургууд
     Зургаа assets/photos/ хавтас руу хуулаад src дээр замыг нь бичнэ.
     src хоосон ("") байвал зөөлөн ландшафттай placeholder гарна.
     Хүссэн тоогоороо нэмж болно (6-8 хамгийн гоё харагдана). */
  photos: [
    { src: "assets/photos/photo1.jpeg", caption: "my favourite of the year" },
    { src: "assets/photos/photo2.jpeg", caption: "i don't know how to explain it" },
    { src: "assets/photos/photo3.jpeg", caption: "Woody Emujin" },
    { src: "assets/photos/photo4.jpeg", caption: "the beginning of the hair era" },
    { src: "assets/photos/photo5.jpeg", caption: "two hats one brain" },
    { src: "assets/photos/photo6.jpeg", caption: "our aesthetic era" },
    { src: "assets/photos/photo7.jpeg", caption: "the biggest secret" },
    { src: "assets/photos/photo8.jpeg", caption: "favourite XD" },
    { src: "assets/photos/titanic.jpeg", caption: "titanic" },
    { src: "assets/photos/19th birthday.jpeg", caption: "your 19th birthday" },
    { src: "assets/photos/photo9.jpeg", caption: "our first sleepover" },
    { src: "assets/photos/photo10.jpeg", caption: "attempt of fake photos" }
  ],

  /* 3. Дуунууд
     mp3 файлаа assets/music/ руу хуулаад src дээр бичнэ.
     cover дээр зураг өгвөл дууны дэлгэц дээр гарна (хоосон бол ландшафт).
     src хоосон дуу нь хөгжмийн хайрцагны "Happy Birthday" аяыг тоглоно. */
  songs: [
    { title: "Don't Be So Shy", artist: "Imany", src: "assets/music/Dont_be_so_shy.mp3", cover: "assets/photos/videoframe_49985.png" },
    { title: "Nicole Kidman", artist: "Adela", src: "assets/music/nicole-kidman.mp3", cover: "assets/photos/nicole2.gif" },
    { title: "Toxic", artist: "Ashnikko", src:"assets/music/toxic.mp3", cover: "assets/photos/ashnikko.png" }, 
    { title: "Too Deep", artist: "Vandebo", src:"assets/music/too_deep.mp3", cover: "assets/photos/toodeep.png" }, 
    { title: "Sweather Weather", artist: "The Neighborhood", src:"assets/music/sweather_weather.mp3", cover: "assets/photos/sweather.png" },
    { title: "Like JENNIE", artist: "Jennie", src:"assets/music/like_jennie.mp3", cover: "assets/photos/videoframe_11358.png" }
  ],

  /* Бэлэг нээх үед аль дуу эхэлж тоглох вэ (дээрх жагсаалтын дугаар, 0-ээс эхэлж тоолно)
     0 бол эхний дуу, 1 бол хоёр дахь дуу гэх мэт */
  startSong: 1,

  /* 4. Захидал */
  letter: {
    greeting: "Happiest 23rd birthday to my girl!!! ",
    paragraphs: [
      "I’m so, so proud of you. You’ve got an amazing job, you’re living on your own, and you have a cute little daughter. I love you so muchhh.",
      "We’ve spent so many years together, and now, starting this year, we’re finally entering the busy adult lives of the grown-ups we used to look up to when we were little hahaha. We can’t go out and wander around together every single day like we used to, but every time we meet, we’re still the same idiots, being just as unserious and chaotic as always hahaha.",
      "I wish you nothing but the very best in life, my love. I love you so muchhh!",
      "There are still so many exciting things and firsts waiting for both of us, and I can’t wait for us to experience them together, go through every new chapter side by side, and celebrate all the little and big things along the way.",
      "Here’s to many more years of friendship, growing up together, and being the same two idiots no matter how old we get. "
    ],
    signature: "love youu ♡"
  },
  /* 5. Бялууны хэсэг бүх лааг үлээсний дараа гарах бичиг */
  wishText: "may all your wishes come true ♡"
};
