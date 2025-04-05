import React from "react"
import { useState } from "react"
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
export default function Speech(){
    const [hold, setHold] = useState(false)
    const [time, setTime] = useState(null)
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition()

    if (!browserSupportsSpeechRecognition){
        return(
            <span>Votre navigateur ne supporte pas Speech To Text</span>
        )
    }
    const listeningSpeech = ()=>{
        setHold(true);
        const timer = setInterval(() => {
            console.log('tazomina')
            
        }, 1000)
        
        setTime(timer)
        SpeechRecognition.startListening();
        
    }

    const listeningStop = ()=>{
        setHold(false);
        if(time){
            console.log('votitra')
            clearInterval(time);
           
        }
        setTime(null)
        SpeechRecognition.stopListening()
    }

    const listeningReset = () =>{
        resetTranscript()
    }
    return(
        <>
        <h1>Microphone : {listening ? 'on' : 'off'}</h1>
        <button onMouseDown={listeningSpeech} onMouseUp={listeningStop} onTouchStart={listeningSpeech} onTouchEnd={listeningStop}>Commencer</button>
        <p>{transcript}</p>
        </>
    )
}