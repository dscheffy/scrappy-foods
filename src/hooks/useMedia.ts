import { useEffect, useState } from "preact/hooks";

export function useMedia(requestedMedia: MediaStreamConstraints) {
  const [mediaStream, setMediaStream] = useState<MediaStream|null>(null);

  useEffect(() => {
    if (mediaStream) {
      // return a cleanup function
      return () => {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    }
    async function enableStream() {
      try {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia(requestedMedia);
        setMediaStream(stream);
      } catch(err) {
        console.log("something, uh... what?",err)
        // Removed for brevity
      }
    }

    enableStream();

  }, [mediaStream, requestedMedia]);

  return mediaStream;
}