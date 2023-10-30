import React, { useRef, useState } from 'react'
import './app.css'
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default function App() {

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const startListen = () => {
    setShowDiv(true);
    SpeechRecognition.startListening({ continuous: true });
  }

  const copyRef = useRef();

  const copyToClip = () => {
    window.navigator.clipboard.writeText(transcript)
    copyRef.current.innerText = "Copied!"
    setInterval(() => {
      copyRef.current.innerText = "Copy To Clipboard"
    }, 1000);
  }

  const [showDiv, setShowDiv] = useState(false)

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='min-h-screen h-full  w-full flex flex-col text-black items-center p-10 bg-black/90'>
      <h1 className='text-3xl font-semibold  text-green-400'>Speech To Text Converter</h1>
      
      {showDiv && <div className='text-white text-2xl absolute top-3 left-5'>
        Listening...
      </div>}

      <div
        className='block w-3/5 h-fit bg-gray-400 rounded-lg mt-5 p-5 text-xl font-medium'
      >
        {transcript}
      </div>


      <div className='mt-7 w-3/5 flex flex-wrap justify-around'>
        <button
          className='hover:bg-green-500 bg-green-400 rounded-lg px-5 py-3 m-2 text-xl font-semibold font-mono'
          onClick={copyToClip}
          ref={copyRef}
        >
          Copy To Clipboard
        </button>

        <button
          className='hover:bg-green-500 bg-green-400 rounded-lg px-5 py-3 m-2 text-xl font-semibold font-mono'
          onClick={startListen}
        >
          Start Listening
        </button>

        <button
          className='hover:bg-green-500 bg-green-400 rounded-lg px-5 py-3 m-2 text-xl font-semibold font-mono'
          onClick={() => {
            SpeechRecognition.stopListening();
            setShowDiv(false);
          }}
        >
          Stop Listening
        </button>

        <button
          className='hover:bg-green-500 bg-green-400 rounded-lg px-5 py-3 m-2 text-xl font-semibold font-mono'
          onClick={resetTranscript}
        >
          Reset
        </button>



      </div>
    </div>
  )
}

