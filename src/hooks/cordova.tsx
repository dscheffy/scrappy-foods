import { createContext, FunctionalComponent, h } from "preact";
import { useCallback, useContext, useEffect, useState } from "preact/hooks";
import { PropsWithChildren } from "react";

interface Context {
  isDeviceReady: boolean;
  platformId: string;
  listen: (evtType: CordovaEventType, handler: EventListener) => void;
  unlisten: (evtType: CordovaEventType, handler: EventListener) => void;
}

export interface Cordova {
  platformId: string;
}

const CordovaContext = createContext<Context | undefined>(undefined);

type CordovaEventType = "deviceready" | "resume" | "pause" | "backbutton";

const CordovaProvider: FunctionalComponent = ({
  children
}: PropsWithChildren<{}>) => {
  const [isDeviceReady, setDeviceReady] = useState(false);
  const [platformId, setPlatformId] = useState("unknown");

  const onDeviceReady = useCallback(() => {
    setPlatformId(
      (window as Window & typeof globalThis & { cordova: Cordova }).cordova
        .platformId
    );
    setDeviceReady(true);
  }, []);

  const listen = (evtType: CordovaEventType, handler: EventListener) => {
    document.addEventListener(evtType, handler);
  };

  const unlisten = (evtType: CordovaEventType, handler: EventListener) => {
    document.removeEventListener(evtType, handler);
  };

  useEffect(() => {
    document.addEventListener("deviceready", onDeviceReady);

    return () => {
      document.removeEventListener("deviceready", onDeviceReady);
    };
  });

  return (
    <CordovaContext.Provider
      value={{ isDeviceReady, platformId, listen, unlisten }}
    >
      {children}
    </CordovaContext.Provider>
  );
};

const useCordova = (waitForDeviceReady = false): Cordova | undefined => {
  const cordova = useContext(CordovaContext);

  if (waitForDeviceReady && cordova && !cordova.isDeviceReady) {
    // I'm not sure what's going on here
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    throw new Promise(() => { });
  }

  return cordova;
};

export { CordovaProvider, useCordova };
