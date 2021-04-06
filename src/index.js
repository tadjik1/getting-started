import Gl from "./gl";

import "./style.css";

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

navigator.getUserMedia(
  {
    video: { width: 1280, height: 720 },
  },
  (stream) => {
    const video = document.createElement("video");
    video.autoplay = true;
    video.srcObject = stream;

    video.onloadeddata = () => {
      const scene = new Gl(video);
      scene.init();
    };
  },
  function (error) {
    alert(
      "Unable to capture WebCam. Please reload the page or try using different browser."
    );
  }
);
