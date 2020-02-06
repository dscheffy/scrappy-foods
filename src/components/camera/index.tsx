import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useMedia } from "../../hooks/useMedia";
import * as style from "./style.css";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "environment" },
};

interface Props {
  onSave: (blob: Blob, thumb: string) => void
}
const Camera: preact.FunctionalComponent<Props> = ({onSave}: Props) => {
  const [preview, setPreview] = useState(false);
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
  const handleCancel = () => {
    setPreview(false);
  }
  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if(!canvas || !video ) { return }

    // downgrade the image for no particular reason -- just trying stuff here
    canvas.height=video.videoHeight;
    canvas.width=video.videoWidth;
    const context = canvas.getContext("2d");

    if(!context) { return }  
    context.drawImage(
      video,0,0,video.videoWidth, video.videoHeight, 0,0,canvas.width,canvas.height
    );
    setPreview(true);

  }
  const handleSave = () => {
    const canvas = canvasRef.current;
    const thumb = thumbRef.current;
    if(!canvas || !thumb) { return }

    // downgrade the image for no particular reason -- just trying stuff here
    thumb.height=canvas.height/16;
    thumb.width=canvas.height/16;
    const context = thumb.getContext("2d");

    if(context) {  
      context.drawImage(
        canvas,0,0,canvas.width, canvas.height, 0,0,thumb.width,thumb.height
      );
    }

    const thumbUrl = thumb.toDataURL("image/jpeg", .5)
    canvas.toBlob(blob => blob && onSave(blob, thumbUrl), "image/jpeg", .5);
  }
  
    return (
      <div class={style.wrapper}>
      <div class={style.container} >
        <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay={true} playsInline={true} muted={true} />
        <canvas class={preview ? style.preview : style.hide} ref={canvasRef} />
        <canvas class={style.hide} ref={thumbRef} />
      </div>
      <div class={style.controls} >
      {!preview && <button class={style.snap} onClick={handleCapture}>
        Take a picture
      </button>}
      {preview && <button class={style.snap} onClick={handleSave}>
        save
      </button>}
      {preview && <button class={style.snap} onClick={handleCancel}>
        cancel
      </button>}
      </div>
      </div>
  );
}

export default Camera;
