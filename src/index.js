import Gl from "./gl";

import "./style.css";

if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  alert(
    "Unable to capture WebCam. Please reload the page or try using different browser."
  );
} else {
  navigator.mediaDevices
    .getUserMedia({
      video: { width: 1280, height: 720 },
    })
    .then((stream) => {
      const video = document.createElement("video");
      video.autoplay = true;
      video.srcObject = stream;

      video.onloadeddata = () => {
        const scene = new Gl(video);
        scene.init();
      };
    })
    .catch((error) => {
      console.error(error);
      alert(
        "Unable to capture WebCam. Please reload the page or try using different browser."
      );
    });
}
