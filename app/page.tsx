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
  INTRO_MESSAGE: "致我可愛的寶寶,\n\n雖然我平常好像都不太會說什麼浪漫的話啦，但能遇見妳我是真的很開心，希望妳有感受到～好啦，我愛妳，22 歲生日快樂歐！",

  GALLERY_IMAGES: [
    "/1.jpg",
    "/vedio1.mp4",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    "/video2.mp4",
    "/6.jpg",
    "/7.jpg",
    "/8.jpg",
    "/9.jpg",
    "/video3.mp4",
    "/10.jpg",
    "/166326_0.jpg",
    "/166327_0.jpg",
    "/166328_0.jpg",
    "/166329_0.jpg",
    "/166330_0.jpg",
    "/11.jpg",
    "/12.jpg",
    "/13.jpg",
    "/15.jpg",
    "/16.jpg",
    "/video4.mp4",
    "/17.jpg",
  ],

  NARRATIVE_1: "雖然也才短短幾個月，但總覺得已經跟妳過了大概有一年這麽久了吧，到現在還是覺得很神奇",

  NARRATIVE_2: "真的很喜歡妳的笑容，拜託每天都對我笑，真的",

  OUTRO_MESSAGE: "大概就醬子八，希望妳有看的開心哈哈哈。不得不說，幾個月前的我根本也沒想過世界會變這樣吧，甚至說一晃眼我們也交往快半年了，吃了好多也玩好多，也很慶幸身邊的人是妳，很喜歡妳的一切，喜歡妳的理性、開朗、活潑、笑容和可愛，也很喜歡跟妳坐在星空底下談天說地，每次聊天完都覺得又更了解妳，也更能知道該怎麼好好的愛妳了。\
  希望妳接下來的日子，都能過的開心順利，就算有遇到什麼難過的事也都能好好撐過去，有需要的話我都在妳旁邊，雖然不太會講話但如果我的陪伴能讓妳感到舒服那就請好好的壓榨我吧哈哈。最後，很感謝妳願意包容我這個很會忘東忘西的小白癡，我不會讓妳失望的。\n\n生日快樂寶貝！"
};

import MobileWarning from "@/components/MobileWarning";

export default function Home() {
  return (
    <>
      <MobileWarning />

      <div className="hidden md:block">
        <SmoothScroll>
          <main className="bg-background min-h-screen">

            {/* 1. Hero Section */}
            <Hero />

            {/* 2. Intro Card */}
            <IntroCard message={CONTENT.INTRO_MESSAGE} />

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
            <Outro message={CONTENT.OUTRO_MESSAGE} />

            <BackgroundMusic />
          </main>
        </SmoothScroll>
      </div>
    </>
  );
}
