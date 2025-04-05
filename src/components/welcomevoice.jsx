import React, { useEffect } from 'react';

const WelcomeVoice = () => {
    useEffect(() => {
        const txt = "Bienvenue sur notre application";
        const speech = new SpeechSynthesisUtterance(txt);
        speech.lang = 'fr-FR'; 
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    }, []);
    return (
        <div>
        </div>
    );
};

export default WelcomeVoice;
