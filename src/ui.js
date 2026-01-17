/**
 * UI MODULE - FINAL STABLE EDITION
 * Features: Cyber Terminal + Manual Audio Override + Robust Voice Loading
 */

const UI_TEXT = {
  'english': { title: "Drishti AI", btn: "INITIATE SCAN", input: "Enter intercepted message...", audio: "PLAY AUDIO" },
  'hindi': { title: "दृष्टि AI", btn: "स्कैन शुरू करें", input: "संदेहास्पद संदेश दर्ज करें...", audio: "आवाज़ सुनें" },
  'tamil': { title: "த்ரிஷ்டி AI", btn: "ஸ்கேன் செய்", input: "சந்தேகம் உள்ள செய்தியை இடுங்கள்...", audio: "ஒலி வடிவம்" },
  'telugu': { title: "దృష్టి AI", btn: "స్కాన్ ప్రారంభించు", input: "సందేశాన్ని ఇక్కడ నమోదు చేయండి...", audio: "ఆడియో ప్లే" },
  'kannada': { title: "ದೃಷ್ಟಿ AI", btn: "ಸ್ಕ್ಯಾನ್ ಮಾಡಿ", input: "ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ನಮೂದಿಸಿ...", audio: "ಆಡಿಯೋ ಪ್ಲೇ" }
};

export function getHtml() {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drishti AI | Audio Active</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
      body { background: #000; color: #00f3ff; font-family: 'Courier New', monospace; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
      .interface { width: 100%; max-width: 420px; padding: 25px; border: 1px solid #00f3ff; box-shadow: 0 0 30px rgba(0,243,255,0.15); border-radius: 12px; background: rgba(10,10,10,0.95); position: relative; }
      
      h1 { margin: 0 0 20px 0; font-size: 1.5rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid #333; padding-bottom: 10px; }
      
      select, textarea, button { width: 100%; background: #0a0a0a; color: #eee; border: 1px solid #333; padding: 12px; margin-bottom: 15px; box-sizing: border-box; font-family: inherit; font-size: 1rem; border-radius: 6px; }
      select:focus, textarea:focus { outline: none; border-color: #00f3ff; }
      textarea { height: 100px; resize: none; }
      
      /* Main Scan Button */
      .scan-btn { background: #00f3ff; color: #000; font-weight: 800; border: none; cursor: pointer; transition: all 0.2s; }
      .scan-btn:hover { background: #fff; box-shadow: 0 0 15px #00f3ff; }
      .scan-btn:disabled { background: #333; color: #666; cursor: wait; box-shadow: none; }

      /* Audio Button */
      .audio-btn { background: transparent; border: 1px solid #00f3ff; color: #00f3ff; display: none; margin-top: 15px; cursor: pointer; font-weight: bold; }
      .audio-btn:hover { background: rgba(0, 243, 255, 0.1); }

      /* Terminal & Results */
      .terminal { height: 120px; overflow-y: auto; font-size: 0.85rem; color: #0f0; margin-bottom: 15px; border: 1px dashed #333; padding: 10px; display:none; background: #000; }
      .badge { padding: 12px; text-align: center; font-weight: bold; margin-bottom: 15px; font-size: 1.2rem; display:none; border-radius: 4px; }
      .safe { background: rgba(0, 255, 65, 0.2); color: #00ff41; border: 1px solid #00ff41; }
      .danger { background: rgba(255, 0, 60, 0.2); color: #ff003c; border: 1px solid #ff003c; }
      
      .native-response { font-size: 1.1rem; color: #fff; line-height: 1.6; border-left: 3px solid #00f3ff; padding-left: 15px; white-space: pre-wrap; }
    </style>
  </head>
  <body>
    <div class="interface">
      <h1 id="uiTitle">Drishti AI</h1>
      
      <select id="langSelect" onchange="updateUI()">
        <option value="english">English</option>
        <option value="hindi">Hindi (हिंदी)</option>
        <option value="tamil">Tamil (தமிழ்)</option>
        <option value="telugu">Telugu (తెలుగు)</option>
        <option value="kannada">Kannada (ಕನ್ನಡ)</option>
      </select>

      <textarea id="input" placeholder="Enter message..."></textarea>
      
      <div id="terminal" class="terminal"></div>
      
      <button id="btn" class="scan-btn" onclick="analyze()">INITIATE SCAN</button>

      <div id="result" style="display:none;">
        <div id="badge" class="badge"></div>
        <div id="nativeResponse" class="native-response"></div>
        
        <button id="audioBtn" class="audio-btn" onclick="manualSpeak()">
          <i class="fa-solid fa-volume-high"></i> <span id="btnAudioText">PLAY AUDIO</span>
        </button>
      </div>
    </div>

    <script>
      const UI = ${JSON.stringify(UI_TEXT)};
      let lastText = "";
      let lastLang = "english";
      let availableVoices = [];

      // --- VOICE LOADER FIX ---
      // Ensures voices are actually loaded before we try to use them
      function loadVoices() {
        availableVoices = window.speechSynthesis.getVoices();
        console.log("Voices loaded:", availableVoices.length);
      }
      
      // Chrome loads voices asynchronously
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      // Trigger load immediately just in case
      loadVoices();

      function updateUI() {
        const lang = document.getElementById('langSelect').value;
        const t = UI[lang] || UI['english'];
        document.getElementById('uiTitle').innerText = t.title;
        document.getElementById('btn').innerText = t.btn;
        document.getElementById('input').placeholder = t.input;
        document.getElementById('btnAudioText').innerText = t.audio;
      }

      function log(msg) {
        const term = document.getElementById('terminal');
        term.style.display = 'block';
        term.innerHTML += "> " + msg + "<br>";
        term.scrollTop = term.scrollHeight;
      }

      async function analyze() {
        const text = document.getElementById('input').value;
        const lang = document.getElementById('langSelect').value;
        if(!text) return;

        // UI Reset
        document.getElementById('btn').disabled = true;
        document.getElementById('result').style.display = 'none';
        document.getElementById('terminal').innerHTML = '';
        document.getElementById('audioBtn').style.display = 'none';

        try {
          log("System Initialized...");
          log("Language Detected: " + lang.toUpperCase());
          log("Processing via Cloudflare Workers AI...");
          
          const req = await fetch('/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ text, source_lang: lang })
          });
          
          log("Analysis Complete.");
          log("Generating Audio Response...");

          const data = await req.json();
          if(data.error) throw new Error(data.error);

          render(data, lang);

        } catch(e) {
          log("ERROR: " + e.message);
        } finally {
          document.getElementById('btn').disabled = false;
        }
      }

      function render(data, lang) {
        document.getElementById('terminal').style.display = 'none';
        const res = document.getElementById('result');
        const badge = document.getElementById('badge');
        const audioBtn = document.getElementById('audioBtn');
        
        res.style.display = 'block';
        badge.style.display = 'block';
        audioBtn.style.display = 'block'; 

        // 1. Badge Logic
        if(data.risk_level === 'High') {
          badge.className = 'badge danger';
          badge.innerText = "THREAT DETECTED";
        } else {
          badge.className = 'badge safe';
          badge.innerText = "SAFE MESSAGE";
        }

        // 2. Text Logic
        const finalText = data.action_translated;
        document.getElementById('nativeResponse').innerText = finalText;

        // 3. Audio Logic
        lastText = finalText;
        lastLang = lang;

        // Small delay to ensure UI renders before audio starts
        setTimeout(() => speak(finalText, lang), 500);
      }

      function manualSpeak() {
        speak(lastText, lastLang);
      }

      function speak(text, lang) {
        // Cancel previous speech to prevent overlap/errors
        window.speechSynthesis.cancel();
        
        const u = new SpeechSynthesisUtterance(text);
        
        // Map UI selection to BCP-47 codes
        const langMap = { 
          'hindi': 'hi-IN', 
          'tamil': 'ta-IN', 
          'telugu': 'te-IN', 
          'kannada': 'kn-IN', 
          'english': 'en-US' 
        };
        const targetLang = langMap[lang] || 'en-US';

        // --- SMART VOICE SELECTION ---
        // 1. Try to find an exact match (e.g., 'ta-IN')
        let voice = availableVoices.find(v => v.lang === targetLang);
        
        // 2. If not found, try finding ANY voice for that language (e.g., 'ta')
        if (!voice) {
             const shortCode = targetLang.split('-')[0]; // 'ta', 'hi'
             voice = availableVoices.find(v => v.lang.startsWith(shortCode));
        }

        // 3. Fallback Logic to prevent 'SpeechSynthesisErrorEvent'
        if (voice) {
            u.voice = voice;
            u.lang = targetLang;
        } else {
            // Only warn, don't crash. Fallback to English/Default if native voice is missing.
            console.warn("Native voice not found for " + lang + ". Using system default.");
            // We intentionally do NOT set u.lang if we can't find it, 
            // letting the browser pick its best default rather than failing.
        }

        u.rate = 0.9; // Slightly slower for clarity
        u.volume = 1.0;
        
        u.onend = function() { console.log("Audio finished"); };
        
        u.onerror = function(e) { 
            console.error("Audio Error:", e);
            // Final safety net: If it fails, try speaking in English (or default)
            if (u.lang !== 'en-US') {
                console.log("Retrying with default voice...");
                const fallback = new SpeechSynthesisUtterance(text);
                fallback.lang = 'en-US'; 
                window.speechSynthesis.speak(fallback);
            }
        };

        window.speechSynthesis.speak(u);
      }
    </script>
  </body>
  </html>
  `;
}