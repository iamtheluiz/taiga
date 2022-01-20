/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { RhinoWorkerFactory } from '@picovoice/rhino-web-en-worker';
import { useRhino } from '@picovoice/rhino-web-react';

import { CLOCK_EN_64 } from './clock';

export default function Voice() {
  const [latestInference, setLatestInference] = useState(null)

  const inferenceEventHandler = (rhinoInference: any) => {
    console.log(`Rhino inferred: ${rhinoInference}`);
    setLatestInference(rhinoInference)
  };

  const {
    contextInfo,
    isLoaded,
    isListening,
    isError,
    isTalking,
    errorMessage,
    start,
    resume,
    pause,
    pushToTalk,
  } = useRhino(
    // Pass in the factory to build Rhino workers. This needs to match the context language below
    RhinoWorkerFactory,
      // Start Rhino with the clock contex
      // Immediately start processing audio,
      // although rhino will not activate until the button is pressed
      { context: { base64: CLOCK_EN_64 }, start: true },
    inferenceEventHandler
  );

  useEffect(() => {
    console.log(isLoaded);
    console.log(contextInfo);
    console.log(isTalking);
  }, [isLoaded, isError, isTalking]);

  return (
    <div className="voice-widget">
      <button onClick={() => pushToTalk()}>
        Push to Talk
      </button>
      <p>{JSON.stringify(latestInference)}</p>
    </div>
  )
}