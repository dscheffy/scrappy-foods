import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useMedia } from "../../hooks/useMedia";
import * as style from "./style.css";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "environment" },
};

interface Props {
  onCapture: (blob: Blob, thumb: string) => void
}
const Camera: preact.FunctionalComponent<Props> = ({onCapture}: Props) => {
  
  const videoRef = useRef<HTMLVideoElement>();
  const canvasRef = useRef<HTMLCanvasElement>();
  const thumbRef = useRef<HTMLCanvasElement>();
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
    const thumb = thumbRef.current;
    if(!canvas || !video || !thumb) { return }

    // downgrade the image for no particular reason -- just trying stuff here
    canvas.height=video.videoHeight;
    canvas.width=video.videoWidth;
    thumb.height=video.videoHeight/16;
    thumb.width=video.videoWidth/16;
    const context = canvas.getContext("2d");
    const thumbCtx = thumb.getContext("2d");

    if(context) {  
      context.drawImage(
        video,0,0,video.videoWidth, video.videoHeight, 0,0,canvas.width,canvas.height
      );
    }
    if(thumbCtx) {  
      thumbCtx.drawImage(
        video,0,0,video.videoWidth, video.videoHeight, 0,0,thumb.width,thumb.height
      );
    }

    const thumbUrl = thumb.toDataURL()
    canvas.toBlob(blob => blob && onCapture(blob, thumbUrl), "image/jpeg", 1);
  }
  
    return (
      <div class={style.wrapper}>
      <div class={style.container} >
        <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay={true} playsInline={true} muted={true} />
        <canvas class={style.preview} ref={canvasRef} />
        <canvas class={style.thumb} ref={thumbRef} />
      </div>
        <button class={style.snap} onClick={handleCapture}>
        Take a picture
      </button>
      </div>
  );
}

export default Camera;
