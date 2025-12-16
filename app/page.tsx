"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import IntroCard from "@/components/IntroCard";
import ParallaxGallery from "@/components/ParallaxGallery";
import NarrativeText from "@/components/NarrativeText";
import Outro from "@/components/Outro";
import BackgroundMusic from "@/components/BackgroundMusic";

// --- CONTENT CONSTANTS ---
const CONTENT = {
  INTRO_MESSAGE: "致我可愛的寶寶,\n\n突然很臨時起意的做了一個小網站，想說我平常好像都不太會說什麼浪漫的話，那就做點不一樣的送給妳吧！生日快樂！啊請慢慢往下滑不要滑太快，還有記得打開聲音",

  GALLERY_IMAGES: [
    { src: "/1.jpg", caption: "謝謝寶寶送我錢包，非常非常喜歡" },
    { src: "/vedio1.mp4" },
    { src: "/3.jpg", caption: "情人節快樂" },
    { src: "/4.jpg", caption: "妳笑起來真的好美" },
    { src: "/5.jpg" },
    { src: "/video2.mp4" },
    { src: "/6.jpg", caption: "這天我們好像聊了不少家和的八卦吧哈哈哈" },
    { src: "/7.jpg", caption: "真的很喜歡跟你一起出去玩" },
    { src: "/8.jpg", caption: "這應該是我們第一次出去玩吧" },
    { src: "/9.jpg", caption: "這到底誰家可愛寶寶啊" },
    { src: "/video3.mp4" },
    { src: "/10.jpg", caption: "真的很喜歡這個小吊飾，超可愛" },
    { src: "/166326_0.jpg" },
    { src: "/166327_0.jpg", caption: "準備要開吃了！" },
    { src: "/166328_0.jpg" },
    { src: "/166329_0.jpg", caption: "三和夜市絕對是最頂的" },
    { src: "/166330_0.jpg", caption: "姆, 好吃" },
    { src: "/11.jpg", caption: "大開殺戒" },
    { src: "/12.jpg", caption: "明明就很好看不知道在躲什麼" },
    { src: "/13.jpg" },
    { src: "/15.jpg", caption: "我覺得我這張拍的很好哈哈哈" },
    { src: "/16.jpg", caption: "超級好吃的炒手" },
    { src: "/video4.mp4" },
    { src: "/17.jpg" },
  ],

  NARRATIVE_1: "雖然也才短短幾個月，但總覺得已經跟妳過了大概有一年這麽久了吧，到現在還是覺得很神奇",

  NARRATIVE_2: "真的很喜歡妳的笑容，拜託每天都對我笑，真的",

  OUTRO_MESSAGE: "恭喜妳滑到底啦，希望妳有看的開心哈哈哈。不得不說，幾個月前的我根本也沒想過世界會變這樣吧，甚至說一晃眼我們也交往快半年了，吃了好多也玩好多，也很慶幸身邊的人是妳，很喜歡妳的一切，喜歡妳的理性、開朗、活潑、笑容和可愛，也很喜歡跟妳坐在星空底下談天說地，每次聊天完都覺得又更了解妳，也更能知道該怎麼好好的愛妳了。",
  OUTRO_MESSAGE_2: "希望妳接下來的日子，都能過的開心順利，就算有遇到什麼難過的事也都能好好撐過去，有需要的話我都在妳身邊，雖然不太會講話但如果我的陪伴能讓妳感到舒服那就請好好的壓榨我吧哈哈。最後，很感謝妳願意包容我這個很會忘東忘西、常常搞不清楚狀況的小白癡，希望未來我能把自己弄的更好，讓妳不會一直擔心，不然我可能也會先被妳打死哈哈哈。\n\n好啦！就這樣，生日快樂寶貝，我愛妳"
};

import MobileWarning from "@/components/MobileWarning";

import { useState } from "react";
// ... imports

export default function Home() {
  const [startMusic, setStartMusic] = useState(false);

  return (
    <>
      <MobileWarning />

      <div className="hidden md:block">
        <SmoothScroll>
          <main className="bg-background min-h-screen">

            {/* 1. Hero Section */}
            <Hero />

            {/* 2. Intro Card */}
            <IntroCard
              message={CONTENT.INTRO_MESSAGE}
              onOpen={() => setStartMusic(true)}
            />

            {/* 3. Gallery Part 1 */}
            <ParallaxGallery
              images={CONTENT.GALLERY_IMAGES.slice(0, 9)}
              className="pb-0"
            />

            {/* 4. Narrative Interlude 1 */}
            <NarrativeText text={CONTENT.NARRATIVE_1} />

            {/* 5. Gallery Part 2 */}
            <ParallaxGallery
              images={CONTENT.GALLERY_IMAGES.slice(9, 18)}
              className="pt-0"
            />

            {/* 6. Narrative Interlude 2 */}
            <NarrativeText text={CONTENT.NARRATIVE_2} />

            {/* 7. Gallery Part 3 */}
            <ParallaxGallery
              images={CONTENT.GALLERY_IMAGES.slice(18)}
              className="pt-0"
            />

            {/* 8. Outro */}
            <Outro
              message={CONTENT.OUTRO_MESSAGE}
              message2={CONTENT.OUTRO_MESSAGE_2}
            />

            <BackgroundMusic shouldPlay={startMusic} />
          </main>
        </SmoothScroll>
      </div>
    </>
  );
}
