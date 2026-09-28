import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, AlertCircle, Headphones, Radio, Play, Square, MessageSquare } from 'lucide-react';

interface VoiceSessionMessage {
  speaker: 'user' | 'gemini';
  text: string;
  time: string;
}

export const GeminiLiveVoice: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('admissions-interview');
  const [transcript, setTranscript] = useState<VoiceSessionMessage[]>([
    {
      speaker: 'gemini',
      text: "Welcome to GlobalPath Live Voice Counselor powered by gemini-3.8-live. Click 'Start Live Conversation' and speak freely into your microphone.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [statusMessage, setStatusMessage] = useState<string>('Ready to connect with gemini-3.8-live');

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const recognitionRef = useRef<any>(null);

  const topics = [
    {
      id: 'admissions-interview',
      title: 'University Admissions Mock Interview',
      desc: 'Simulate a live interview with an Ivy League / Oxford international admissions officer.',
      instruction: 'Conduct a realistic college admissions interview. Ask thoughtful questions about my academic interests, leadership projects, and why I chose this field.'
    },
    {
      id: 'visa-interview',
      title: 'F-1 Visa Consulate Interview',
      desc: 'Practice answering tough US Embassy consular questions about funding, ties to home country, and study plans.',
      instruction: 'Act as a US Visa Consular Officer conducting an F-1 student visa interview. Be polite, formal, and test my funding and intent to return.'
    },
    {
      id: 'toefl-speaking',
      title: 'TOEFL iBT Speaking Practice',
      desc: 'Practice 45-second and 60-second spoken responses with real-time feedback on delivery and grammar.',
      instruction: 'Act as a TOEFL iBT speaking evaluator. Present a speaking prompt, listen to my answer, and evaluate my fluency, vocabulary, and cohesion.'
    },
    {
      id: 'sat-strategy',
      title: 'SAT Tactics & Math Discussion',
      desc: 'Talk through complex math question approaches, Desmos graphing tricks, and reading traps.',
      instruction: 'Act as a master SAT coach. Discuss test-taking tactics, Desmos calculator shortcuts, and how to manage the 2-stage adaptive digital exam.'
    }
  ];

  // Clean up audio & socket when unmounting
  useEffect(() => {
    return () => {
      stopLiveSession();
    };
  }, []);

  const playPcmAudioChunk = (base64Audio: string) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: 24000
        });
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Convert base64 to binary ArrayBuffer
      const binaryString = window.atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Live API returns 16-bit PCM (little-endian) at 24kHz
      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
      }

      const audioBuffer = ctx.createBuffer(1, float32Array.length, 24000);
      audioBuffer.getChannelData(0).set(float32Array);

      const sourceNode = ctx.createBufferSource();
      sourceNode.buffer = audioBuffer;
      sourceNode.connect(ctx.destination);

      // Gapless scheduling
      const currentTime = ctx.currentTime;
      if (nextStartTimeRef.current < currentTime) {
        nextStartTimeRef.current = currentTime;
      }
      sourceNode.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;

      setIsSpeaking(true);
      sourceNode.onended = () => {
        if (ctx.currentTime >= nextStartTimeRef.current - 0.05) {
          setIsSpeaking(false);
        }
      };
    } catch (err) {
      console.warn('PCM Audio playback error:', err);
    }
  };

  const startLiveSession = async () => {
    setIsConnecting(true);
    setStatusMessage('Connecting to gemini-3.8-live...');

    try {
      // 1. Establish Audio Context & Mic Stream
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      mediaStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000
      });
      audioContextRef.current = audioCtx;

      // 2. Open WebSocket
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live-stream`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnecting(false);
        setIsActive(true);
        setStatusMessage('Live with gemini-3.8-live. Speak now.');

        // Send initial scenario instruction
        const currentTopic = topics.find(t => t.id === selectedTopic);
        if (currentTopic) {
          ws.send(JSON.stringify({ text: `Hello! Let's start: ${currentTopic.instruction}` }));
        }

        // Set up microphone audio capture
        const source = audioCtx.createMediaStreamSource(stream);
        const processor = audioCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        processor.onaudioprocess = (e) => {
          if (ws.readyState !== WebSocket.OPEN) return;
          const inputData = e.inputBuffer.getChannelData(0);

          // Convert Float32 to Int16 PCM
          const pcm16 = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            const s = Math.max(-1, Math.min(1, inputData[i]));
            pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
          }

          // Convert to base64
          let binary = '';
          const bytes = new Uint8Array(pcm16.buffer);
          const chunkLen = bytes.byteLength;
          for (let i = 0; i < chunkLen; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          const base64Audio = window.btoa(binary);

          ws.send(JSON.stringify({ audio: base64Audio }));
        };

        source.connect(processor);
        processor.connect(audioCtx.destination);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.audio) {
            playPcmAudioChunk(data.audio);
          }
          if (data.text) {
            setTranscript(prev => [
              ...prev,
              {
                speaker: 'gemini',
                text: data.text,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }
          if (data.interrupted) {
            // User interrupted model speech
            if (audioContextRef.current) {
              nextStartTimeRef.current = audioContextRef.current.currentTime;
            }
            setIsSpeaking(false);
          }
          if (data.error) {
            setStatusMessage(`Notice: ${data.error}`);
          }
        } catch (e) {
          // ignore
        }
      };

      ws.onerror = () => {
        handleFallbackVoice();
      };

      ws.onclose = () => {
        setIsActive(false);
        setIsConnecting(false);
        setStatusMessage('Session ended.');
      };
    } catch (err: any) {
      console.warn('Could not start live websocket or microphone:', err);
      handleFallbackVoice();
    }
  };

  // Graceful browser Web Speech fallback if server WS is unavailable
  const handleFallbackVoice = () => {
    setIsConnecting(false);
    setIsActive(true);
    setStatusMessage('Live Voice mode active (Browser Speech Engine with Gemini)');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = async (event: any) => {
        const last = event.results.length - 1;
        const spokenText = event.results[last][0].transcript;
        if (!spokenText.trim()) return;

        setTranscript(prev => [
          ...prev,
          {
            speaker: 'user',
            text: spokenText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);

        try {
          setIsSpeaking(true);
          const currentTopic = topics.find(t => t.id === selectedTopic);
          const res = await fetch('/api/gemini/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: [{ role: 'user', content: `[Live Voice Session: ${currentTopic?.title}] ${spokenText}` }],
              role: 'general-advisor',
              searchGrounded: true
            })
          });
          const data = await res.json();
          const reply = data.reply || "I heard your question. Let's explore that further.";

          setTranscript(prev => [
            ...prev,
            {
              speaker: 'gemini',
              text: reply,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);

          if ('speechSynthesis' in window) {
            const utter = new SpeechSynthesisUtterance(reply.replace(/[*#_`]/g, ''));
            utter.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utter);
          } else {
            setIsSpeaking(false);
          }
        } catch {
          setIsSpeaking(false);
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    }
  };

  const stopLiveSession = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsActive(false);
    setIsConnecting(false);
    setIsSpeaking(false);
    setStatusMessage('Live conversation stopped.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              Live API • gemini-3.8-live
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif-display">
              Real-Time Voice Admissions Counselor
            </h1>
            <p className="text-sm text-stone-300 mt-2 max-w-xl">
              Talk directly with Gemini 3.8 Live with low-latency audio. Practice college interviews, simulate consular visa checks, or talk through tricky SAT questions.
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center">
            {isActive ? (
              <button
                onClick={stopLiveSession}
                className="px-6 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl shadow-xl flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer"
              >
                <Square className="w-5 h-5 fill-current" />
                <span>End Conversation</span>
              </button>
            ) : (
              <button
                onClick={startLiveSession}
                disabled={isConnecting}
                className="px-7 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-stone-950 font-bold rounded-2xl shadow-xl flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer disabled:opacity-50"
              >
                {isConnecting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>Start Live Conversation</span>
                  </>
                )}
              </button>
            )}
            <span className="text-[11px] text-stone-400 mt-2 font-mono">{statusMessage}</span>
          </div>
        </div>

        {/* Live Visualizer Stage */}
        <div className="mt-8 pt-8 border-t border-stone-800 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center w-36 h-36">
            {/* Outer animated rings */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-700 ${
                isSpeaking
                  ? 'bg-amber-500/20 scale-125 animate-ping'
                  : isActive
                  ? 'bg-blue-500/20 scale-110 animate-pulse'
                  : 'bg-stone-800/40'
              }`}
            />
            <div
              className={`absolute inset-2 rounded-full transition-all duration-500 ${
                isSpeaking
                  ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 shadow-lg shadow-amber-500/50'
                  : isActive
                  ? 'bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-lg shadow-blue-500/50'
                  : 'bg-stone-800'
              }`}
            />

            {/* Core Icon */}
            <div className="relative z-10 text-white flex flex-col items-center">
              {isSpeaking ? (
                <Volume2 className="w-10 h-10 animate-bounce" />
              ) : isActive ? (
                <Mic className="w-10 h-10 animate-pulse" />
              ) : (
                <Headphones className="w-10 h-10 text-stone-500" />
              )}
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-sm font-semibold text-stone-200">
              {isSpeaking ? 'Gemini 3.8 Live is Speaking...' : isActive ? 'Listening to your microphone...' : 'Microphone Inactive'}
            </span>
            <p className="text-xs text-stone-500 mt-0.5">
              16kHz PCM Input • 24kHz Audio Playback • Real-Time Bi-Directional
            </p>
          </div>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Select Counseling Scenario
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTopic(t.id);
                if (isActive) {
                  stopLiveSession();
                }
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedTopic === t.id
                  ? 'bg-amber-950/30 border-amber-500/80 ring-1 ring-amber-500/40'
                  : 'bg-stone-900 border-stone-800 hover:border-stone-700 text-stone-400'
              }`}
            >
              <h4 className="text-sm font-bold text-white mb-1">{t.title}</h4>
              <p className="text-xs text-stone-300 leading-relaxed">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Live Conversation Transcript */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Transcript</h3>
          </div>
          <span className="text-xs text-stone-500">{transcript.length} turns recorded</span>
        </div>

        <div className="space-y-3.5 max-h-72 overflow-y-auto pr-2">
          {transcript.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                item.speaker === 'gemini'
                  ? 'bg-stone-950 border border-stone-800 text-stone-200'
                  : 'bg-amber-500/10 border border-amber-500/20 text-amber-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1 text-[10px] text-stone-400 font-mono">
                <span className="font-bold uppercase tracking-wider text-stone-300">
                  {item.speaker === 'gemini' ? 'Gemini 3.8 Live' : 'You (Microphone)'}
                </span>
                <span>{item.time}</span>
              </div>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
