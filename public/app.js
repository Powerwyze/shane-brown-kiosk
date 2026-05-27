// --- i18n Configuration ---
const I18N = {
    en: {
        slides: [
            {
                title: "Problem",
                body: "Event teams spend heavily on booth presence, but most activations still lose revenue in the handoff:",
                bullets: [
                    "Ultimately, booths are boring and passive.",
                    "Lead data is incomplete or low quality.",
                    "Conversations are not captured as usable CRM context.",
                    "Teams cannot clearly tie booth activity to pipeline outcomes."
                ]
            },
            {
                title: "Solution",
                body: "PowerWyze delivers an integrated event stack:",
                bullets: [
                    "RoboKiosk for high-engagement front-of-booth interaction.",
                    "Wize Pin for real-time conversation capture.",
                    "AI lead insights for structured follow-up and reporting."
                ]
            },
            {
                title: "Product Suite",
                body: "Day-rate options below are secondary to our annual contract model.",
                bullets: [
                    "<b>RoboKiosk + Photo Booth:</b> Combined interactive kiosk and branded photo booth experience for high engagement activations.<br>Day-rate options: $600/5-hr, $1,000/full-day, $1,200/day bespoke.",
                    "<b>RoboKiosk + Print Production:</b> Kiosk paired with a print production lane for personalized output.<br>Starting at $1,200/day.",
                    "<b>Wize Pin:</b> Wearable conversation capture for stronger follow-up quality.<br>$50 per pin/day."
                ]
            },
            {
                title: "Traction / Proof",
                body: "Live Performance Metrics:",
                bullets: [
                    "271 Leads captured",
                    "271 Images emailed",
                    "6 Events completed today",
                    "$9,000 Profit today (6 events, 1 kiosk)"
                ]
            },
            {
                title: "Business Model (Contract-Led)",
                body: "Primary: Annual Contract Model starting at $20,000/year for 2 kiosks.",
                bullets: [
                    "Unlimited events during the contract term.",
                    "Client handles shipping (+ $5k for managed).",
                    "Production Lane Upsell increases engagement.",
                    "Wearable Data Layer improves lead quality.",
                    "Target: Event hosts, agencies, convention centers."
                ]
            },
            {
                title: "Go-to-Market Strategy",
                body: "",
                bullets: [
                    "<b>ICP:</b> Event vendors, trade show teams, venues.",
                    "<b>Entry:</b> Single-event pilot designed for measurable ROI.",
                    "<b>Growth:</b> Multi-event partnerships via repeatable framework.",
                    "<b>Scale:</b> Long-term annual programs across regional calendars."
                ]
            }
        ]
    }
};

const lang = localStorage.getItem('shane_brown_kiosk_lang') || 'en';
const t = I18N[lang];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Personalization
    const urlParams = new URLSearchParams(window.location.search);
    const investorName = urlParams.get('investor') || 'Shane';
    document.getElementById('welcomeGreeting').textContent = `Hello, ${investorName}.`;
    document.getElementById('nameInput').value = investorName === 'Shane' ? 'Shane Brown' : investorName;

    // Launch Screen to Main App
    document.getElementById('beginPitchBtn').addEventListener('click', () => {
        document.getElementById('launchScreen').classList.remove('active');
        document.getElementById('mainKiosk').classList.add('active');
        renderSlides();
        
        // Auto advance logic
        if(urlParams.get('auto') === '1') {
            setInterval(nextSlide, 12000);
        }
    });

    // Bottom Navigation
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabs = document.querySelectorAll('.tab-content');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // --- Pitch Deck Logic ---
    let currentSlideIndex = 0;
    
    function renderSlides() {
        const container = document.getElementById('slideContainer');
        container.innerHTML = ''; // clear
        
        // Add Cover (Slide 0)
        const coverSlide = document.createElement('div');
        coverSlide.className = 'slide active';
        coverSlide.innerHTML = `
            <div class="slide-num">01 / 07</div>
            <h2>PowerWyze</h2>
            <p style="color: var(--pw-gold); font-family: var(--font-heading); font-size: 20px; text-transform: uppercase;">Agentic intelligence for Live events</p>
            <p style="margin-top: 24px;">We combine intelligent kiosks, AI brand ambassadors, and automated engagement systems that transform booth traffic into follow-up ready pipeline.</p>
            <div class="slide-nav" onclick="nextSlide()"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"><path d="m9 18 6-6-6-6"/></svg></div>
        `;
        container.appendChild(coverSlide);

        // Add Remaining Slides
        t.slides.forEach((s, idx) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            let bulletsHtml = s.bullets ? `<ul>${s.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : '';
            
            slide.innerHTML = `
                <div class="slide-num">0${idx + 2} / 07</div>
                <h2>${s.title}</h2>
                <p>${s.body}</p>
                ${bulletsHtml}
                <div class="slide-nav" onclick="nextSlide()"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"><path d="m9 18 6-6-6-6"/></svg></div>
            `;
            container.appendChild(slide);
        });
        
        // Setup Swipe
        let touchstartX = 0;
        let touchendX = 0;
        
        container.addEventListener('touchstart', e => { touchstartX = e.changedTouches[0].screenX; });
        container.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchendX < touchstartX - 50) nextSlide();
            if (touchendX > touchstartX + 50) prevSlide();
        }
    }

    window.nextSlide = function() {
        const slides = document.querySelectorAll('.slide');
        if(currentSlideIndex < slides.length - 1) {
            slides[currentSlideIndex].classList.remove('active');
            currentSlideIndex++;
            slides[currentSlideIndex].classList.add('active');
        }
    }
    
    window.prevSlide = function() {
        const slides = document.querySelectorAll('.slide');
        if(currentSlideIndex > 0) {
            slides[currentSlideIndex].classList.remove('active');
            currentSlideIndex--;
            slides[currentSlideIndex].classList.add('active');
        }
    }

    // --- Form Submit Logic ---
    document.getElementById('leadForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.textContent = 'Submitting...';
        btn.disabled = true;
        
        const data = {
            name: document.getElementById('nameInput').value,
            email: document.getElementById('emailInput').value,
            checkSize: document.getElementById('checkSizeInput').value,
            nextStep: document.getElementById('nextStepInput').value,
            notes: document.getElementById('notesInput').value
        };

        try {
            const res = await fetch('/api/commit-interest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if(res.ok) {
                document.getElementById('leadForm').style.display = 'none';
                const successState = document.getElementById('successState');
                document.getElementById('successMessage').textContent = `Thanks, ${data.name.split(' ')[0]}. Stephanie or Bryan will follow up shortly. 🤝`;
                successState.style.display = 'block';
            } else {
                alert('Something went wrong. Please let Bryan know.');
                btn.textContent = 'Commit Interest →';
                btn.disabled = false;
            }
        } catch(err) {
            console.error(err);
            // Fallback for dev without backend
            document.getElementById('leadForm').style.display = 'none';
            document.getElementById('successState').style.display = 'block';
        }
    });

    // --- Voice Agent Logic ---
    const fab = document.getElementById('aiFab');
    const modal = document.getElementById('voiceModal');
    const closeBtn = document.getElementById('closeVoiceBtn');
    const endBtn = document.getElementById('endCallBtn');
    const orb = document.getElementById('voiceOrb');
    const transcript = document.getElementById('voiceTranscript');
    
    let conversation = null;

    fab.addEventListener('click', async () => {
        modal.classList.add('active');
        transcript.textContent = "Connecting to AI...";
        orb.classList.remove('speaking');
        
        try {
            // Fetch token/agent info
            const res = await fetch('/api/voice-token');
            const data = await res.json();
            
            if(data.agentId) {
                transcript.textContent = "Agent connected. Start speaking.";
                // Init ElevenLabs
                conversation = await window.elevenlabs.Conversation.startSession({
                    agentId: data.agentId,
                    onConnect: () => {
                        orb.classList.add('speaking');
                        transcript.textContent = "Listening...";
                    },
                    onDisconnect: () => {
                        orb.classList.remove('speaking');
                        transcript.textContent = "Call ended.";
                    },
                    onError: (err) => {
                        console.error("Agent error", err);
                        transcript.textContent = "Error connecting to voice agent.";
                    },
                    onModeChange: (mode) => {
                         if(mode === 'speaking') {
                             orb.style.background = 'radial-gradient(circle at 30% 30%, #fff, #4cd137)';
                             transcript.textContent = "Agent speaking...";
                         } else {
                             orb.style.background = 'radial-gradient(circle at 30% 30%, #fff, var(--pw-gold))';
                             transcript.textContent = "Listening...";
                         }
                    }
                });
            } else {
                transcript.textContent = data.message || "Voice agent not configured.";
            }
        } catch (e) {
            console.error(e);
            transcript.textContent = "Error loading voice agent.";
        }
    });

    function closeCall() {
        if(conversation) {
            conversation.endSession();
            conversation = null;
        }
        modal.classList.remove('active');
        orb.classList.remove('speaking');
    }

    closeBtn.addEventListener('click', closeCall);
    endBtn.addEventListener('click', closeCall);
});
