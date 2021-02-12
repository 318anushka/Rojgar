import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import MicIcon from '@material-ui/icons/Mic';

const Dictaphone = (props) => {
  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  function update() {
    console.log(transcript)
    props.handler(transcript);
  }

  return (
    <div className='row-wrap'>
       <MicIcon className="icon mrgr-5"></MicIcon>
      <div>
      <button className="mrglr-5 btn pink lighten-1 z-depth-0" onClick={SpeechRecognition.startListening}>Start</button>
      <button className="btn pink lighten-1 z-depth-0" onClick={SpeechRecognition.stopListening, update}>Stop</button>      
      {/* <button onClick={SpeechRecognition.resetTranscript, update}>Reset</button>       */}
      </div>
    </div>
  )
}
export default Dictaphone