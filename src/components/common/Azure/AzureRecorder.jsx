

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import CongratsBox from '../CongratsBox';


const AzureRecorder = ({ letter, levelArray, userid, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizer, setRecognizer] = useState(null);
  const [transcribedText, setTranscribedText] = useState('');
  const [accuracyScore, setAccuracyScore] = useState(null);
  const [pronunciationScore, setPronunciation] = useState(null);
  const [completenessScore, setCompleteness] = useState(null);
  const [fluencyScore, setFluency] = useState(null);
  const [completeScore, setComplete] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    const speechConfig = sdk.SpeechConfig.fromSubscription("39f18a300bc84e90a00f69946bae448f", "eastus");
    speechConfig.speechRecognitionLanguage = "en-US";
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

    const pronunciationAssessmentConfig = new sdk.PronunciationAssessmentConfig(
      letter,
      sdk.PronunciationAssessmentGradingSystem.HundredMark,
      sdk.PronunciationAssessmentGranularity.Word
    );

    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    pronunciationAssessmentConfig.applyTo(recognizer);

    recognizer.recognizing = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizingSpeech) {
        setTranscribedText(e.result.text);
      }
    };

    recognizer.recognized = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        setTranscribedText(e.result.text);

        const pronunciationAssessmentResult = sdk.PronunciationAssessmentResult.fromResult(e.result);
        const a = pronunciationAssessmentResult.pronunciationScore;
        const b = pronunciationAssessmentResult.accuracyScore;
        const c = pronunciationAssessmentResult.fluencyScore;
        const d = pronunciationAssessmentResult.completenessScore;

        setPronunciation(a);
        setCompleteness(d);
        setFluency(c);
        setAccuracyScore(b);
        setComplete((a + b + c + d) / 4);
      } else if (e.result.reason === sdk.ResultReason.NoMatch) {
        console.log('No speech recognized.');
      }
    };

    recognizer.canceled = (s, e) => {
      console.error('Recognition canceled:', e);
    };

    setRecognizer(recognizer);

    return () => {
      recognizer.close();
    };
  }, [letter]);

  const startRecording = () => {
    setIsRecording(true);
    recognizer?.startContinuousRecognitionAsync();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognizer?.stopContinuousRecognitionAsync();
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://localhost:4080/api/v1/test/test-attempt", {
        total_score: parseFloat((completeScore / 11).toFixed(2)),
        pronunciation: parseFloat((pronunciationScore / 10).toFixed(2)),
        completeness: parseFloat((completenessScore / 11).toFixed(2)),
        fluency: parseFloat((fluencyScore / 11).toFixed(2)),
        levelId: levelArray[0].subLevel,
        sublevelNo: levelArray[0].level,
        studentId: parseInt(userid)
      });
      console.log("RESPONSE");

      if (completeScore !== null && parseFloat((completeScore / 11).toFixed(2)) >= 8.5) {
        setShowCongrats(true);
        setShowRetry(false);
      } else {
        setShowCongrats(false);
        setShowRetry(true);
      }

    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  useEffect(() => {
    if (showCongrats || showRetry) {
      const timer = setTimeout(() => {
        setShowCongrats(false);
        setShowRetry(false);
        onClose();
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [showCongrats, showRetry, onClose]);

  return (
    <div>
      <h1 className='text-[18px] mt-2 font-semibold'>Real-Time Speech-to-Text with Pronunciation Accuracy</h1>
      <div className='flex mt-3'>
        <p className='text-red-500 font-bold text-[24px]'>{letter}</p>
      </div>
      <div className='flex justify-center mt-4'>
        <button onClick={isRecording ? stopRecording : startRecording} className='bg-gradient-to-br font-bold from-[#3B82F6] to-[#D1C4E9] px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105'>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>
      <div>
        <h2 className='text-sm mt-2 mb-2'>Transcribed Text: <span className='text-base font-bold ml-2'>{transcribedText}</span></h2>
        {accuracyScore !== null && (
          <div>
            <div className='flex flex-col gap-3 px-3 py-3 rounded-xl border-[1px] shadow-2xl justify-center'>
              <h2 className='text-sm'>Accuracy Score: <span className='text-base font-bold ml-2'>{(accuracyScore / 10).toFixed(2)}</span></h2>
              <h2 className='text-sm'>Pronunciation Score: <span className='text-base font-bold ml-2'>{(pronunciationScore / 10).toFixed(2)}</span></h2>
              <h2 className='text-sm'>Completeness Score: <span className='text-base font-bold ml-2'>{(completenessScore / 11).toFixed(2)}</span></h2>
              <h2 className='text-sm'>Fluency Score: <span className='text-base font-bold ml-2'>{(fluencyScore / 11).toFixed(2)}</span></h2>
              <h2 className='text-sm'>Complete Score: <span className='text-base font-bold ml-2'>{(completeScore / 11).toFixed(2)}</span></h2>
            </div>
            <br />
            <button className="text-base font-bold px-4 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600" onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </div>

      {(showCongrats || showRetry) && (
        <CongratsBox
          showCongrats={showCongrats}
          onClose={() => {
            setShowCongrats(false);
            setShowRetry(false);
            onClose();
          }}
          fullscreen={true}
        />
      )}
    </div>
  );
};

export default AzureRecorder;
