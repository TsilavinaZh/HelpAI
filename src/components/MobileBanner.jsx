import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

export default function MobileBanner() {
    const [hold, setHold] = useState(false);
    const [time, setTime] = useState(null);
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    // Clean up interval on component unmount
    useEffect(() => {
        return () => {
            if (time) clearInterval(time);
        };
    }, [time]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Votre navigateur ne supporte pas la reconnaissance vocale.</span>;
    }

    // const speakText = (text) => {
    //     if (!text || text.trim() === '') {
    //         console.log("Nothing to speak - text is empty");
    //         return;
    //     }

    //     const synth = window.speechSynthesis;
    //     synth.cancel(); // Annuler toute lecture en cours
    //     const utterance = new SpeechSynthesisUtterance(text);
    //     utterance.lang = 'fr-FR';

    //     // Log before speaking
    //     console.log("Speaking text:", text);

    //     // Add event listeners for debugging
    //     utterance.onstart = () => console.log("Speech started");
    //     utterance.onend = () => console.log("Speech ended");
    //     utterance.onerror = (e) => console.error("Speech error:", e);

    //     synth.speak(utterance);
    // };
    // Fonction améliorée pour la synthèse vocale dans MobileBanner.js
    const speakText = (text) => {
        if (!text || text.trim() === '') {
            console.log("Nothing to speak - text is empty");
            return;
        }

        const synth = window.speechSynthesis;
        synth.cancel(); // Annuler toute lecture en cours

        // Créer l'objet d'énonciation
        const utterance = new SpeechSynthesisUtterance(text);

        // Configurer la langue et les paramètres de voix
        utterance.lang = 'fr-FR';
        utterance.rate = 1.0; // Vitesse normale (0.1 à 10)
        utterance.pitch = 1.0; // Hauteur normale (0 à 2)
        utterance.volume = 1.0; // Volume maximal (0 à 1)

        // Sélectionner une voix spécifique (si disponible)
        const voices = synth.getVoices();
        console.log("Voix disponibles:", voices);

        // Chercher une voix française
        const frenchVoice = voices.find(voice =>
            voice.lang.includes('fr') && voice.name.includes('Google') // Préférer les voix Google si disponibles
        ) || voices.find(voice => voice.lang.includes('fr')); // Sinon n'importe quelle voix française

        if (frenchVoice) {
            console.log("Utilisation de la voix:", frenchVoice.name);
            utterance.voice = frenchVoice;
        }

        // Événements pour le monitoring et le débogage
        utterance.onstart = () => console.log("Lecture commencée");
        utterance.onend = () => console.log("Lecture terminée");
        utterance.onerror = (e) => console.error("Erreur de lecture:", e);

        // Lancer la synthèse vocale
        synth.speak(utterance);

        // Retourner l'objet utterance pour pouvoir l'annuler si nécessaire
        return utterance;
    };

    const sendPrompt = async (prompt) => {
        setError(null);
        console.log("Sending prompt:", prompt);

        try {
            setLoading(true);

            // Configure axios with timeout
            const res = await axios.post('http://localhost:3000/api/prompt', { prompt }, {
                timeout: 30000, // 30 second timeout
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Full API response:", res);

            // Check if response exists and has the expected structure
            if (res.data && res.data.response) {
                const answer = res.data.response;
                console.log("Response received:", answer);

                setResponse(answer);

                // Only speak if we have text
                if (answer && answer.trim() !== '') {
                    speakText(answer);
                } else {
                    console.log("Empty response received from API");
                    setResponse("Aucune réponse reçue du serveur.");
                    speakText("Aucune réponse reçue du serveur.");
                }
            } else {
                console.log("Invalid response structure:", res.data);
                setResponse("Format de réponse invalide.");
                speakText("Format de réponse invalide.");
            }
        } catch (error) {
            console.error("API call error:", error);

            // Get detailed error information
            let errorMessage = "Erreur lors de la communication avec l'API.";

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                errorMessage = `Erreur ${error.response.status}: ${error.response.data.error || 'Erreur serveur'}`;
                console.error("Error response:", error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = "Aucune réponse reçue du serveur. Vérifiez votre connexion.";
                console.error("No response received:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                errorMessage = `Erreur: ${error.message}`;
            }

            if (error.code === 'ECONNABORTED') {
                errorMessage = "La requête a pris trop de temps. Veuillez réessayer.";
            }

            setError(errorMessage);
            setResponse(errorMessage);
            speakText(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const startListening = () => {
        setHold(true);
        const timer = setInterval(() => {
            console.log('Enregistrement en cours...');
        }, 1000);
        setTime(timer);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
    };

    const stopListening = () => {
        setHold(false);
        if (time) clearInterval(time);
        setTime(null);
        SpeechRecognition.stopListening();

        const trimmedTranscript = transcript.trim();
        if (trimmedTranscript) {
            console.log("Transcript captured:", trimmedTranscript);
            sendPrompt(trimmedTranscript);
        } else {
            console.log("No transcript to send");
        }
    };
    // const stopListening = () => {
    //     setHold(false);
    //     if (time) clearInterval(time);
    //     setTime(null);

    //     const spokenText = transcript.trim(); // capture ici AVANT d'arrêter
    //     SpeechRecognition.stopListening();

    //     if (spokenText) {
    //         console.log("Transcript captured:", spokenText);
    //         sendPrompt(spokenText);
    //     } else {
    //         console.log("No transcript to send");
    //     }
    // };


    return (
        <>
            <div className="container">
  <a className="navbar-brand" href="#">Help IA</a>
  <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1">
    <span className="sr-only">Toggle navigation</span>
    <span className="navbar-toggler-icon"></span>
  </button>
</div>

<div style={{
  backgroundColor: '#f0f0f0',
  padding: '1rem',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  flexDirection: 'column'
}}>
  <style>{`
    @media (max-width: 768px) {
      .mic-button {
        width: 120px !important;
        height: 120px !important;
      }

      .response-box,
      .transcript-box {
        font-size: 14px !important;
        padding: 8px !important;
      }

      h2 {
        font-size: 20px !important;
        text-align: center;
      }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `}</style>

  <FontAwesomeIcon
    icon={faTimes}
    style={{
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#333',
    }}
    onClick={() => window.location.href = '/chat'}
  />

  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    maxWidth: '600px'
  }}>
    <h2 style={{ marginBottom: '1rem', fontSize: '24px', color: '#007660' }}>
      Bonjour, bienvenue chez Help IA
    </h2>

    <FontAwesomeIcon
      icon={faCircle}
      style={{
        color: listening ? 'green' : 'red',
        fontSize: '30px',
        marginBottom: '0.5rem',
      }}
    />

    <button
      onMouseDown={startListening}
      onMouseUp={stopListening}
      onTouchStart={startListening}
      onTouchEnd={stopListening}
      className="mic-button"
      style={{
        width: '175px',
        height: '175px',
        backgroundColor: hold ? '#007660' : '#333',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
      }}
    >
      <FontAwesomeIcon icon={faMicrophone} style={{ fontSize: '50px', color: '#fff' }} />
    </button>

    <div className="transcript-box" style={{
      paddingTop: '20px',
      fontSize: '18px',
      width: '100%',
      textAlign: 'center',
      minHeight: '80px',
      maxHeight: '120px',
      overflowY: 'auto',
      margin: '10px 0',
      padding: '10px',
      backgroundColor: listening ? '#eef8ff' : 'transparent',
      borderRadius: '8px',
      transition: 'background-color 0.3s'
    }}>
      {transcript ? transcript : listening ? "Parlez maintenant..." : "Appuyez et maintenez pour parler"}
    </div>

    {loading ? (
      <div style={{
        marginTop: '10px',
        color: '#888',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '20px',
          height: '20px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #007660',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginRight: '10px'
        }}></div>
        Chargement...
      </div>
    ) : (
      <div className="response-box" style={{
        marginTop: '20px',
        color: error ? '#d32f2f' : '#333',
        fontWeight: 'normal',
        width: '100%',
        maxHeight: '200px',
        overflowY: 'auto',
        padding: '15px',
        backgroundColor: response ? '#f5f5f5' : 'transparent',
        borderRadius: '8px',
        boxShadow: response ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
      }}>
        {response}
      </div>
    )}
  </div>
</div>

        </>

    );
}