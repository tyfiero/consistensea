/*global chrome*/
import { useEffect, useState } from "react";
import Habits from "./components/Habits";
import { fetchImages } from "./lib/unsplash";

import { images } from "./lib/images";
import { lowResImages } from "./lib/lowResImages";
import { createApi } from "unsplash-js";
function App() {
  console.time("images");
  let imgPointer = Math.floor(Math.random() * images.length);
  let randomImg = images[imgPointer];
  let randomLowResImg = lowResImages[imgPointer];
  const [url, setUrl] = useState("/assets/img1.jpg");
  const [imgReady, setImgReady] = useState(false);
  const [pics, setPics] = useState([]);
  let apiImgs = [
    "https://images.unsplash.com/photo-1657299142018-4f7f33aea18c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1OTMxMjkyNw&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1659289991487-dd118a2727be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MHwxfGFsbHwyfHx8fHx8Mnx8MTY1OTMxMjkyNw&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1659290767390-0450c97881a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MHwxfGFsbHwzfHx8fHx8Mnx8MTY1OTMxMjkyNw&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1659292572590-01c557819637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MHwxfGFsbHw0fHx8fHx8Mnx8MTY1OTMxMjkyNw&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1659292553629-ca0fe1d3b538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MHwxfGFsbHw1fHx8fHx8Mnx8MTY1OTMxMjkyNw&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MXwxfGFsbHw2fHx8fHx8Mnx8MTY1OTMxMjkyNw&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1659287887682-5945996fc512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MHwxfGFsbHw3fHx8fHx8Mnx8MTY1OTMxMjkyNw&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1659296587637-41691ba63a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MHwxfGFsbHw4fHx8fHx8Mnx8MTY1OTMxMjkyNw&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1659298059663-a23f52499343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MHwxfGFsbHw5fHx8fHx8Mnx8MTY1OTMxMjkyNw&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1659301033907-a0dd1e59e8f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MHwxfGFsbHwxMHx8fHx8fDJ8fDE2NTkzMTI5Mjc&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1657299170937-3c87404f01c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MXwxfGFsbHwxMXx8fHx8fDJ8fDE2NTkzMTI5Mjc&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1659259540437-0fe84def75cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MHwxfGFsbHwxMnx8fHx8fDJ8fDE2NTkzMTI5Mjc&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1659284652601-7ac13e5750d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MHwxfGFsbHwxM3x8fHx8fDJ8fDE2NTkzMTI5Mjc&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1659282151049-84f82c45cb17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MHwxfGFsbHwxNHx8fHx8fDJ8fDE2NTkzMTI5Mjc&ixlib=rb-1.2.1&q=80&w=1080",
    "https://images.unsplash.com/photo-1659260516446-e49823490a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMjh8MHwxfGFsbHwxNXx8fHx8fDJ8fDE2NTkzMTI5Mjc&ixlib=rb-1.2.1&q=80&w=1080",
  ];

  let rndUnsplash = apiImgs[Math.floor(Math.random() * apiImgs.length)];

  // const getImage = async () => {
  //   // const u = new Unsplas({ accessKey: process.env.UNSPLASH_ACCESS_KEY });
  //   const unsplash = createApi({
  //     accessKey: "7KKRKkAQjP1KbmWcghLKNUuONZ6fTefvz-T-8e7nteM",
  //   });

  //   unsplash.photos
  //     .list({
  //       page: 1,
  //       perPage: 15,
  //       orderBy: "latest",
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       let images = response.response.results;
  //       let imageUrls = images.map((image) => image.urls.regular);

  //       console.log(imageUrls);

  //       // const newPics = pics.concat(response.response.results);

  //       // setPics(newPics);
  //     });
  // };

  // useEffect(() => {
  //   getImage()
  //     .then((url) => {
  //       setUrl(url);
  //       setImgReady(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div
      className="relative App "
      style={{ backgroundImage: `url(${rndUnsplash})` }}
    >
      <div className="fixed ">
        {!imgReady && (
          <img
            src={randomLowResImg}
            // src={url}
            alt="background "
            className={
              "object-cover w-screen h-screen fade-effect-turbo -z-[3]  " +
              (imgReady ? "opacity-10" : "opacity-100")
            }
          />
        )}
        {/* <img
          src={randomImg}
          rel="preload"
          // src={url}
          onLoad={() => console.timeEnd("images")}
          alt="background "
          className="object-cover w-screen h-screen fade-effect-turbo -z-[5]"
        /> */}
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden">
        <Habits setUrl={setUrl} />
      </div>
    </div>
  );
}

export default App;
