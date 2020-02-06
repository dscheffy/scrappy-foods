import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useMedia } from "../../hooks/useMedia";
import * as style from "./style.css";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "environment" },
};

interface Props {
  onCapture: BlobCallback
}
const Camera: preact.FunctionalComponent<Props> = ({onCapture}: Props) => {
  
  const videoRef = useRef<HTMLVideoElement>();
  const canvasRef = useRef<HTMLCanvasElement>();
  const mediaStream = useMedia(CAPTURE_OPTIONS);
  if(mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = mediaStream;
  }
  const handleCanPlay = (e: any) =>  {
    e.preventDefault();
      if(videoRef && videoRef.current) { 
          videoRef.current.play();
      }
  }
  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if(!canvas || !video) { return }

    // downgrade the image for no particular reason -- just trying stuff here
    canvas.height=video.videoHeight/4;
    canvas.width=video.videoWidth/4;
    const context = canvas.getContext("2d");

    if(context) {  
      context.drawImage(
        video,0,0,video.videoWidth, video.videoHeight, 0,0,canvas.width,canvas.height
      );
    }

    canvas.toBlob(blob => onCapture(blob), "image/jpeg", 1);
    console.log(canvas.toDataURL());
  }
  
    return (
      <div class={style.wrapper}>
      <div class={style.container} >
        <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay={true} playsInline={true} muted={true} />
        <canvas ref={canvasRef} />
      </div>
        <button class={style.snap} onClick={handleCapture}>
        Take a picture
      </button>
      </div>
  );
}

export default Camera;
