import React, { useState, useEffect } from 'react';
import { 
  Volume2, VolumeX, Sparkles, RefreshCw, RotateCcw, Lightbulb, 
  Trophy, HelpCircle, Play, ShieldAlert, Award, Star, CheckCircle2, 
  Lock, ArrowRight, Layers, Box, Cpu, ChevronRight, Zap
} from 'lucide-react';

// --- Web Audio API Sound Synthesizer ---
class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playUnscrew() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  playPlace() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  playDrop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  playWin() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.09;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    });
  }

  playError() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }
}

const sounds = new SoundController();

// --- Level Configuration Data ---
const LEVEL_DATA = [
  {
    id: 1,
    name: "Craftsman Basics",
    timeLimit: 90,
    storageSlots: 3,
    boardHoles: [
      { id: 'h1', x: 25, y: 25 },
      { id: 'h2', x: 75, y: 25 },
      { id: 'h3', x: 50, y: 70 },
      { id: 'h4', x: 25, y: 70 },
      { id: 'h5', x: 75, y: 70 }
    ],
    plates: [
      {
        id: 'p1',
        color: '#D97706',
        label: 'Oak Plank',
        points: [{ x: 15, y: 20 }, { x: 85, y: 20 }, { x: 85, y: 30 }, { x: 15, y: 30 }],
        screwHoleIds: ['h1', 'h2'],
        holes: [ { id: 'h1', x: 25, y: 25 }, { id: 'h2', x: 75, y: 25 } ]
      }
    ],
    screws: [
      { id: 's1', color: 'brass', headType: 'phillips', currentHoleId: 'h1' },
      { id: 's2', color: 'brass', headType: 'phillips', currentHoleId: 'h2' }
    ]
  },
  {
    id: 2,
    name: "Dual Plank Cross",
    timeLimit: 120,
    storageSlots: 3,
    boardHoles: [
      { id: 'h1', x: 20, y: 25 },
      { id: 'h2', x: 80, y: 25 },
      { id: 'h3', x: 50, y: 50 },
      { id: 'h4', x: 20, y: 75 },
      { id: 'h5', x: 80, y: 75 }
    ],
    plates: [
      {
        id: 'p1',
        color: '#B45309',
        label: 'Mahogany Bar',
        points: [{ x: 15, y: 20 }, { x: 85, y: 20 }, { x: 85, y: 30 }, { x: 15, y: 30 }],
        screwHoleIds: ['h1', 'h2'],
        holes: [ { id: 'h1', x: 20, y: 25 }, { id: 'h2', x: 80, y: 25 } ]
      },
      {
        id: 'p2',
        color: '#059669',
        label: 'Emerald Glass',
        points: [{ x: 45, y: 15 }, { x: 55, y: 15 }, { x: 55, y: 85 }, { x: 45, y: 85 }],
        screwHoleIds: ['h3'],
        holes: [ { id: 'h3', x: 50, y: 50 } ]
      }
    ],
    screws: [
      { id: 's1', color: 'steel', headType: 'torx', currentHoleId: 'h1' },
      { id: 's2', color: 'steel', headType: 'torx', currentHoleId: 'h2' },
      { id: 's3', color: 'copper', headType: 'hex', currentHoleId: 'h3' }
    ]
  },
  {
    id: 3,
    name: "Overlapping Triangle",
    timeLimit: 150,
    storageSlots: 4,
    boardHoles: [
      { id: 'h1', x: 50, y: 20 },
      { id: 'h2', x: 20, y: 75 },
      { id: 'h3', x: 80, y: 75 },
      { id: 'h4', x: 50, y: 50 },
      { id: 'h5', x: 50, y: 80 }
    ],
    plates: [
      {
        id: 'p1',
        color: '#92400E',
        label: 'Walnut Deck',
        points: [{ x: 40, y: 15 }, { x: 85, y: 70 }, { x: 75, y: 80 }, { x: 30, y: 25 }],
        screwHoleIds: ['h1', 'h3'],
        holes: [ { id: 'h1', x: 50, y: 20 }, { id: 'h3', x: 80, y: 75 } ]
      },
      {
        id: 'p2',
        color: '#3B82F6',
        label: 'Cobalt Plate',
        points: [{ x: 15, y: 70 }, { x: 60, y: 15 }, { x: 70, y: 25 }, { x: 25, y: 80 }],
        screwHoleIds: ['h1', 'h2'],
        holes: [ { id: 'h1', x: 50, y: 20 }, { id: 'h2', x: 20, y: 75 } ]
      },
      {
        id: 'p3',
        color: '#D97706',
        label: 'Teak Support',
        points: [{ x: 15, y: 70 }, { x: 85, y: 70 }, { x: 85, y: 80 }, { x: 15, y: 80 }],
        screwHoleIds: ['h2', 'h3'],
        holes: [ { id: 'h2', x: 20, y: 75 }, { id: 'h3', x: 80, y: 75 } ]
      }
    ],
    screws: [
      { id: 's1', color: 'gold', headType: 'phillips', currentHoleId: 'h1' },
      { id: 's2', color: 'brass', headType: 'torx', currentHoleId: 'h2' },
      { id: 's3', color: 'steel', headType: 'hex', currentHoleId: 'h3' },
      { id: 's4', color: 'copper', headType: 'phillips', currentHoleId: 'h4' }
    ]
  },
  {
    id: 4,
    name: "Master Workshop",
    timeLimit: 180,
    storageSlots: 4,
    boardHoles: [
      { id: 'h1', x: 20, y: 20 },
      { id: 'h2', x: 80, y: 20 },
      { id: 'h3', x: 50, y: 35 },
      { id: 'h4', x: 20, y: 80 },
      { id: 'h5', x: 80, y: 80 },
      { id: 'h6', x: 50, y: 65 }
    ],
    plates: [
      {
        id: 'p1',
        color: '#7C2D12',
        label: 'Redwood Frame',
        points: [{ x: 15, y: 15 }, { x: 85, y: 15 }, { x: 85, y: 25 }, { x: 15, y: 25 }],
        screwHoleIds: ['h1', 'h2'],
        holes: [ { id: 'h1', x: 20, y: 20 }, { id: 'h2', x: 80, y: 20 } ]
      },
      {
        id: 'p2',
        color: '#475569',
        label: 'Carbon Armor',
        points: [{ x: 15, y: 75 }, { x: 85, y: 75 }, { x: 85, y: 85 }, { x: 15, y: 85 }],
        screwHoleIds: ['h4', 'h5'],
        holes: [ { id: 'h4', x: 20, y: 80 }, { id: 'h5', x: 80, y: 80 } ]
      },
      {
        id: 'p3',
        color: '#EAB308',
        label: 'Brass Shield',
        points: [{ x: 45, y: 30 }, { x: 55, y: 30 }, { x: 55, y: 70 }, { x: 45, y: 70 }],
        screwHoleIds: ['h3', 'h6'],
        holes: [ { id: 'h3', x: 50, y: 35 }, { id: 'h6', x: 50, y: 65 } ]
      }
    ],
    screws: [
      { id: 's1', color: 'brass', headType: 'phillips', currentHoleId: 'h1' },
      { id: 's2', color: 'steel', headType: 'torx', currentHoleId: 'h2' },
      { id: 's3', color: 'copper', headType: 'hex', currentHoleId: 'h3' },
      { id: 's4', color: 'gold', headType: 'phillips', currentHoleId: 'h4' },
      { id: 's5', color: 'steel', headType: 'torx', currentHoleId: 'h5' }
    ]
  }
];

// --- Badges Initial Data ---
const INITIAL_BADGES = [
  { id: 'b1', title: 'First Unscrew', desc: 'Remove your first screw from any wooden board.', icon: Zap, target: 1, current: 0, reward: 50, claimed: false },
  { id: 'b2', title: 'Plank Dropper', desc: 'Drop 5 wooden or acrylic plates off the board.', icon: Layers, target: 5, current: 0, reward: 100, claimed: false },
  { id: 'b3', title: 'Craft Master', desc: 'Clear 3 levels with full star ratings.', icon: Star, target: 3, current: 0, reward: 250, claimed: false },
  { id: 'b4', title: 'Screw Hoarder', desc: 'Fill all upper storage tray slots in a single round.', icon: Box, target: 1, current: 0, reward: 150, claimed: false },
  { id: 'b5', title: 'Speed Demon', desc: 'Complete any level in under 30 seconds.', icon: Trophy, target: 1, current: 0, reward: 300, claimed: false }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('puzzle');
  const [levelIndex, setLevelIndex] = useState(0);
  const [coins, setCoins] = useState(250);
  const [stars, setStars] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(LEVEL_DATA[0].timeLimit);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  
  const [screws, setScrews] = useState([]);
  const [plates, setPlates] = useState([]);
  const [droppedPlateIds, setDroppedPlateIds] = useState([]);
  const [storageTray, setStorageTray] = useState([]);
  const [selectedScrewId, setSelectedScrewId] = useState(null);
  const [historyStack, setHistoryStack] = useState([]);
  const [particles, setParticles] = useState([]);
  
  const [badges, setBadges] = useState(INITIAL_BADGES);

  const currentLevel = LEVEL_DATA[levelIndex] || LEVEL_DATA[0];

  useEffect(() => {
    sounds.muted = !soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    resetLevelData(levelIndex);
  }, [levelIndex]);

  useEffect(() => {
    if (isGameOver || isVictory || activeTab !== 'puzzle') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          sounds.playError();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver, isVictory, activeTab]);

  useEffect(() => {
    if (plates.length === 0) return;

    const newDropped = [];
    const updatedPlates = plates.map(plate => {
      const activeScrewCount = screws.filter(s => 
        s.currentHoleId && plate.screwHoleIds.includes(s.currentHoleId)
      ).length;

      if (activeScrewCount === 0) {
        newDropped.push(plate.id);
      }
      return { ...plate, activeScrewCount };
    });

    const newlyDropped = newDropped.filter(id => !droppedPlateIds.includes(id));
    if (newlyDropped.length > 0) {
      setDroppedPlateIds(prev => [...prev, ...newlyDropped]);
      sounds.playDrop();
      updateBadgeProgress('b2', newlyDropped.length);
    }

    if (newDropped.length === plates.length && plates.length > 0 && !isVictory) {
      setTimeout(() => {
        setIsVictory(true);
        sounds.playWin();
        const bonusStars = timeLeft > 30 ? 3 : timeLeft > 10 ? 2 : 1;
        setStars(prev => prev + bonusStars);
        setCoins(prev => prev + 100);
        updateBadgeProgress('b3', 1);

        if (currentLevel.timeLimit - timeLeft <= 30) {
          updateBadgeProgress('b5', 1);
        }
      }, 400);
    }
  }, [screws, plates]);

  const resetLevelData = (idx) => {
    const lvl = LEVEL_DATA[idx] || LEVEL_DATA[0];
    setScrews(JSON.parse(JSON.stringify(lvl.screws)));
    setPlates(JSON.parse(JSON.stringify(lvl.plates)));
    setDroppedPlateIds([]);
    setStorageTray(Array(lvl.storageSlots).fill(null));
    setSelectedScrewId(null);
    setTimeLeft(lvl.timeLimit);
    setIsGameOver(false);
    setIsVictory(false);
    setHistoryStack([]);
  };

  const updateBadgeProgress = (badgeId, amount) => {
    setBadges(prev => prev.map(b => {
      if (b.id === badgeId) {
        const nextVal = Math.min(b.target, b.current + amount);
        return { ...b, current: nextVal };
      }
      return b;
    }));
  };

  const handleScrewClick = (screwId, e) => {
    e.stopPropagation();
    if (isGameOver || isVictory) return;

    sounds.playUnscrew();
    createSparkParticles(e.clientX, e.clientY);

    saveHistoryState();

    if (selectedScrewId === screwId) {
      setSelectedScrewId(null);
      return;
    }
    setSelectedScrewId(screwId);
    updateBadgeProgress('b1', 1);
  };

  const handleEmptyHoleClick = (targetHoleId) => {
    if (!selectedScrewId || isGameOver || isVictory) return;

    const isOccupied = screws.some(s => s.currentHoleId === targetHoleId);
    if (isOccupied) {
      sounds.playError();
      return;
    }

    sounds.playPlace();
    saveHistoryState();

    setScrews(prev => prev.map(s => {
      if (s.id === selectedScrewId) {
        return { ...s, currentHoleId: targetHoleId, inTrayIndex: null };
      }
      return s;
    }));

    setStorageTray(prev => prev.map(item => (item && item.id === selectedScrewId ? null : item)));
    setSelectedScrewId(null);
  };

  const handleStorageSlotClick = (slotIdx) => {
    if (!selectedScrewId || isGameOver || isVictory) return;

    if (storageTray[slotIdx] !== null) {
      sounds.playError();
      return;
    }

    const screwToMove = screws.find(s => s.id === selectedScrewId);
    if (!screwToMove) return;

    sounds.playPlace();
    saveHistoryState();

    const newTray = [...storageTray];
    newTray[slotIdx] = screwToMove;
    setStorageTray(newTray);

    setScrews(prev => prev.map(s => {
      if (s.id === selectedScrewId) {
        return { ...s, currentHoleId: null, inTrayIndex: slotIdx };
      }
      return s;
    }));

    setSelectedScrewId(null);

    if (newTray.every(item => item !== null)) {
      updateBadgeProgress('b4', 1);
    }
  };

  const handleTrayScrewClick = (screw, slotIdx, e) => {
    e.stopPropagation();
    if (isGameOver || isVictory) return;

    sounds.playUnscrew();
    if (selectedScrewId === screw.id) {
      setSelectedScrewId(null);
    } else {
      setSelectedScrewId(screw.id);
    }
  };

  const saveHistoryState = () => {
    setHistoryStack(prev => [
      ...prev.slice(-5),
      {
        screws: JSON.parse(JSON.stringify(screws)),
        storageTray: JSON.parse(JSON.stringify(storageTray)),
        droppedPlateIds: [...droppedPlateIds]
      }
    ]);
  };

  const handleUndo = () => {
    if (historyStack.length === 0 || isGameOver || isVictory) return;
    sounds.playPlace();
    const lastState = historyStack[historyStack.length - 1];
    setScrews(lastState.screws);
    setStorageTray(lastState.storageTray);
    setDroppedPlateIds(lastState.droppedPlateIds);
    setHistoryStack(prev => prev.slice(0, -1));
    setSelectedScrewId(null);
  };

  const handleHint = () => {
    if (coins < 20 || isGameOver || isVictory) {
      sounds.playError();
      return;
    }
    sounds.playPlace();
    setCoins(prev => prev - 20);

    const activeScrew = screws.find(s => s.currentHoleId !== null);
    if (activeScrew) {
      setSelectedScrewId(activeScrew.id);
    }
  };

  const claimBadgeReward = (badgeId) => {
    setBadges(prev => prev.map(b => {
      if (b.id === badgeId && b.current >= b.target && !b.claimed) {
        sounds.playWin();
        setCoins(c => c + b.reward);
        return { ...b, claimed: true };
      }
      return b;
    }));
  };

  const createSparkParticles = (x, y) => {
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: Math.random(),
      x,
      y,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      size: Math.random() * 4 + 2,
      opacity: 1
    }));
    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 400);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950 font-sans text-slate-100 p-1 md:p-3 select-none">
      <svg className="hidden">
        <defs>
          <filter id="wood-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.15" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="0.8 0 0 0 0  0.5 0 0 0 0  0.2 0 0 0 0  0 0 0 0.15 0" />
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
          <filter id="metallic-bevel">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.6" />
          </filter>
        </defs>
      </svg>

      <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[96vh] max-h-[850px] relative">
        <header className="bg-stone-950/90 backdrop-blur border-b border-stone-800 px-3 py-2 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="bg-amber-600/20 border border-amber-500/40 text-amber-400 font-black px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 shadow-inner">
              <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>LVL {currentLevel.id}</span>
            </div>
            <div className="bg-amber-950/50 border border-amber-700/30 px-2 py-0.5 rounded-full flex items-center gap-1 text-xs text-amber-300 font-bold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{stars}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`font-mono text-sm font-bold px-2.5 py-0.5 rounded-md border ${timeLeft < 20 ? 'bg-red-950/80 border-red-500 text-red-400 animate-pulse' : 'bg-stone-800 border-stone-700 text-stone-200'}`}>
              {formatTime(timeLeft)}
            </div>

            <div className="bg-yellow-950/60 border border-yellow-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-xs text-yellow-300 font-black shadow-sm">
              <span className="text-yellow-400 font-bold">🪙</span>
              <span>{coins}</span>
            </div>

            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 active:scale-95 transition"
              title="Toggle Audio"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
            </button>
          </div>
        </header>

        <nav className="bg-stone-900 border-b border-stone-800 grid grid-cols-3 p-1 gap-1 z-10">
          <button
            onClick={() => setActiveTab('puzzle')}
            className={`py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'puzzle'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Puzzle</span>
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'badges'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Badges</span>
            {badges.some(b => b.current >= b.target && !b.claimed) && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'rules'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Rules</span>
          </button>
        </nav>

        <main className="flex-1 overflow-hidden relative flex flex-col bg-stone-950">
          {activeTab === 'puzzle' && (
            <div className="flex-1 flex flex-col p-2 overflow-hidden justify-between">
              <div className="bg-stone-900 border border-stone-800 rounded-xl p-2 mb-2 shadow-inner">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500/80 flex items-center gap-1">
                    <Box className="w-3 h-3" /> Screw Storage Hold
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {storageTray.filter(Boolean).length}/{storageTray.length} Used
                  </span>
                </div>
                <div className="grid grid-flow-col auto-cols-fr gap-2 justify-center">
                  {storageTray.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => slot ? handleTrayScrewClick(slot, idx, e) : handleStorageSlotClick(idx)}
                      className={`h-11 rounded-lg border-2 border-dashed flex items-center justify-center transition-all relative ${
                        slot 
                          ? 'border-amber-500/50 bg-stone-800/90 shadow-md scale-100' 
                          : 'border-stone-700/60 bg-stone-950/40 hover:border-amber-600/40'
                      } ${selectedScrewId && !slot ? 'ring-2 ring-amber-400/40 animate-pulse' : ''}`}
                    >
                      {slot ? (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${selectedScrewId === slot.id ? 'scale-110 ring-4 ring-amber-400 animate-bounce' : ''}`}>
                          <ScrewGraphic color={slot.color} headType={slot.headType} />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-stone-950/60 border border-stone-800" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div 
                className="flex-1 relative rounded-2xl border-4 border-amber-950/80 shadow-2xl overflow-hidden flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, #78350F 0%, #451A03 70%, #270E02 100%)',
                  boxShadow: 'inset 0 0 35px rgba(0,0,0,0.85), 0 10px 25px rgba(0,0,0,0.5)'
                }}
              >
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 4px)',
                    mixBlendMode: 'overlay'
                  }}
                />

                {currentLevel.boardHoles.map(hole => {
                  const isOccupied = screws.some(s => s.currentHoleId === hole.id);
                  return (
                    <div
                      key={hole.id}
                      onClick={() => handleEmptyHoleClick(hole.id)}
                      style={{ left: `${hole.x}%`, top: `${hole.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-transform cursor-pointer ${
                        selectedScrewId && !isOccupied ? 'scale-110 ring-2 ring-emerald-400 ring-offset-2 ring-offset-amber-950 animate-pulse' : ''
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-stone-950 border-2 border-stone-900 shadow-inner flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-black/90 shadow-2xl" />
                      </div>
                    </div>
                  );
                })}

                {plates.map(plate => {
                  const isDropped = droppedPlateIds.includes(plate.id);
                  const activeScrewCount = screws.filter(s => s.currentHoleId && plate.screwHoleIds.includes(s.currentHoleId)).length;
                  let rotationDegree = 0;
                  if (activeScrewCount === 1) rotationDegree = 18;

                  return (
                    <div
                      key={plate.id}
                      style={{
                        transform: isDropped 
                          ? 'translateY(350px) rotate(45deg) scale(0.7)' 
                          : `rotate(${rotationDegree}deg)`,
                        opacity: isDropped ? 0 : 1,
                        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-out',
                        pointerEvents: isDropped ? 'none' : 'auto'
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon
                          points={plate.points.map(p => `${p.x},${p.y}`).join(' ')}
                          fill={plate.color}
                          stroke="#1c1917"
                          strokeWidth="0.8"
                          filter="url(#metallic-bevel)"
                          style={{
                            opacity: 0.92,
                            boxShadow: '0 8px 16px rgba(0,0,0,0.4)'
                          }}
                        />
                        {plate.holes.map((h, i) => (
                          <circle
                            key={i}
                            cx={h.x}
                            cy={h.y}
                            r="4"
                            fill="#09090b"
                            stroke="#ffffff"
                            strokeWidth="0.3"
                            strokeOpacity="0.4"
                          />
                        ))}
                      </svg>

                      <div 
                        className="absolute text-[9px] font-black tracking-widest text-white/70 uppercase pointer-events-none drop-shadow"
                        style={{
                          left: `${(plate.points[0].x + plate.points[1].x) / 2}%`,
                          top: `${(plate.points[0].y + plate.points[2].y) / 2}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {plate.label}
                      </div>
                    </div>
                  );
                })}

                {screws.map(screw => {
                  if (!screw.currentHoleId) return null;
                  const hole = currentLevel.boardHoles.find(h => h.id === screw.currentHoleId);
                  if (!hole) return null;

                  const isSelected = selectedScrewId === screw.id;

                  return (
                    <div
                      key={screw.id}
                      onClick={(e) => handleScrewClick(screw.id, e)}
                      style={{ left: `${hole.x}%`, top: `${hole.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 transition-transform ${
                        isSelected ? 'scale-125 z-40' : 'hover:scale-105'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isSelected ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-stone-900 animate-bounce' : ''
                      }`}>
                        <ScrewGraphic color={screw.color} headType={screw.headType} />
                      </div>
                    </div>
                  );
                })}

                {particles.map(p => (
                  <div
                    key={p.id}
                    style={{
                      left: p.x,
                      top: p.y,
                      width: p.size,
                      height: p.size,
                      transform: `translate(${p.vx * 8}px, ${p.vy * 8}px)`,
                      opacity: p.opacity
                    }}
                    className="fixed rounded-full bg-amber-300 shadow-lg pointer-events-none transition-all duration-300"
                  />
                ))}
              </div>

              <div className="mt-2 grid grid-cols-3 gap-2">
                <button
                  onClick={handleUndo}
                  disabled={historyStack.length === 0}
                  className={`py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 ${
                    historyStack.length > 0 
                      ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700' 
                      : 'bg-stone-900/50 border-stone-800 text-stone-600 cursor-not-allowed'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
                  <span>Undo</span>
                </button>

                <button
                  onClick={() => resetLevelData(levelIndex)}
                  className="py-2 px-3 rounded-xl bg-stone-800 border border-stone-700 font-bold text-xs text-stone-200 hover:bg-stone-700 flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Restart</span>
                </button>

                <button
                  onClick={handleHint}
                  className="py-2 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 border border-amber-500/50 font-bold text-xs text-white flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Hint (20🪙)</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              <div className="flex items-center justify-between bg-stone-900 p-3 rounded-xl border border-stone-800">
                <div>
                  <h3 className="font-extrabold text-sm text-amber-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4" /> Craftsman Trophies
                  </h3>
                  <p className="text-[11px] text-stone-400">Complete challenges to earn coins and stars</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-amber-500">
                    {badges.filter(b => b.claimed).length}/{badges.length} Unlocked
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                {badges.map(badge => {
                  const Icon = badge.icon;
                  const isCompleted = badge.current >= badge.target;

                  return (
                    <div 
                      key={badge.id}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        badge.claimed
                          ? 'bg-stone-900/60 border-stone-800 opacity-80'
                          : isCompleted
                          ? 'bg-amber-950/30 border-amber-500/50 shadow-lg'
                          : 'bg-stone-900 border-stone-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border ${
                          isCompleted 
                            ? 'bg-amber-500/20 border-amber-400 text-amber-400' 
                            : 'bg-stone-800 border-stone-700 text-stone-500'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-stone-200">{badge.title}</h4>
                          <p className="text-[10px] text-stone-400 leading-tight">{badge.desc}</p>
                          
                          <div className="w-32 h-1.5 bg-stone-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-amber-500 transition-all duration-300" 
                              style={{ width: `${(badge.current / badge.target) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        {badge.claimed ? (
                          <span className="text-[10px] font-bold text-stone-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Claimed
                          </span>
                        ) : isCompleted ? (
                          <button
                            onClick={() => claimBadgeReward(badge.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md animate-bounce flex items-center gap-1"
                          >
                            <span>Claim</span>
                            <span className="text-[10px]">+{badge.reward}🪙</span>
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono text-stone-400">
                            {badge.current}/{badge.target}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              <div className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                <h3 className="font-extrabold text-sm text-amber-400 flex items-center gap-1.5 mb-1">
                  <HelpCircle className="w-4 h-4" /> Game Rules & Mechanics
                </h3>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Master the art of unscrewing wooden plates and dropping all attached planks.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="bg-stone-900 p-3 rounded-xl border border-stone-800 flex gap-3 items-start">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 font-black text-sm">1</div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-200">Tap to Unscrew</h4>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      Tap on any metallic screw head to unscrew it from its board slot.
                    </p>
                  </div>
                </div>

                <div className="bg-stone-900 p-3 rounded-xl border border-stone-800 flex gap-3 items-start">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 font-black text-sm">2</div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-200">Re-attach or Tray Hold</h4>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      Move screws into empty holes on the wood board or store them temporarily in the top storage tray slots.
                    </p>
                  </div>
                </div>

                <div className="bg-stone-900 p-3 rounded-xl border border-stone-800 flex gap-3 items-start">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 font-black text-sm">3</div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-200">Drop Wooden Planks</h4>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      When all screws anchoring a wooden or acrylic plate are removed, gravity will cause the plate to drop off the board!
                    </p>
                  </div>
                </div>

                <div className="bg-stone-900 p-3 rounded-xl border border-stone-800 flex gap-3 items-start">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 font-black text-sm">4</div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-200">Win Condition</h4>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      Clear all suspended plates from the board before the countdown timer runs out.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isVictory && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-xs bg-stone-900 border-2 border-amber-500/60 rounded-2xl p-4 text-center shadow-2xl space-y-3 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 bg-amber-500/20 rounded-full border border-amber-400 flex items-center justify-center mx-auto text-amber-400">
                  <Trophy className="w-8 h-8 animate-bounce" />
                </div>

                <div>
                  <h3 className="text-lg font-black text-amber-400">STAGE CLEARED!</h3>
                  <p className="text-xs text-stone-400">All wooden plates successfully dropped.</p>
                </div>

                <div className="flex justify-center gap-1">
                  {[1, 2, 3].map(st => (
                    <Star key={st} className="w-6 h-6 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="bg-stone-950 p-2 rounded-xl border border-stone-800 flex items-center justify-around text-xs font-bold">
                  <span className="text-stone-300">Reward:</span>
                  <span className="text-yellow-400">+100 🪙</span>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => resetLevelData(levelIndex)}
                    className="flex-1 py-2 rounded-xl bg-stone-800 border border-stone-700 text-xs font-bold text-stone-300 hover:bg-stone-700"
                  >
                    Replay
                  </button>
                  <button
                    onClick={() => {
                      if (levelIndex < LEVEL_DATA.length - 1) {
                        setLevelIndex(prev => prev + 1);
                      } else {
                        setLevelIndex(0);
                      }
                    }}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-xs font-bold text-white shadow-lg flex items-center justify-center gap-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {isGameOver && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-xs bg-stone-900 border-2 border-red-500/60 rounded-2xl p-4 text-center shadow-2xl space-y-3">
                <div className="w-14 h-14 bg-red-500/20 rounded-full border border-red-400 flex items-center justify-center mx-auto text-red-400">
                  <ShieldAlert className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-lg font-black text-red-400">TIME EXPIRED!</h3>
                  <p className="text-xs text-stone-400">Some wooden plates are still suspended.</p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => resetLevelData(levelIndex)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-xs font-bold text-white shadow-lg flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Try Again</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ScrewGraphic({ color = 'brass', headType = 'phillips' }) {
  const getColorGradient = () => {
    switch (color) {
      case 'steel':
        return { main: '#94A3B8', border: '#475569', inner: '#CBD5E1' };
      case 'copper':
        return { main: '#F97316', border: '#C2410C', inner: '#FDBA74' };
      case 'gold':
        return { main: '#EAB308', border: '#CA8A04', inner: '#FEF08A' };
      case 'brass':
      default:
        return { main: '#D97706', border: '#92400E', inner: '#FDE68A' };
    }
  };

  const palette = getColorGradient();

  return (
    <svg className="w-full h-full filter drop-shadow-md" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="16" fill={palette.border} />
      <circle cx="18" cy="18" r="14" fill={palette.main} />
      <circle cx="16" cy="16" r="12" fill={palette.inner} opacity="0.4" />

      {headType === 'phillips' && (
        <path
          d="M18 10 V26 M10 18 H26"
          stroke={palette.border}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      )}
      {headType === 'torx' && (
        <polygon
          points="18,10 22,14 26,18 22,22 18,26 14,22 10,18 14,14"
          fill={palette.border}
        />
      )}
      {headType === 'hex' && (
        <polygon
          points="18,11 24,14 24,22 18,25 12,22 12,14"
          fill={palette.border}
        />
      )}

      <circle cx="13" cy="13" r="3" fill="#FFFFFF" opacity="0.5" />
    </svg>
  );
}
