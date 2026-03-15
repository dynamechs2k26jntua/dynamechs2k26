/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Info, 
  Calendar, 
  Image as ImageIcon, 
  Phone, 
  Trophy, 
  Cpu, 
  Zap, 
  Users, 
  MapPin, 
  Mail, 
  ChevronRight, 
  Menu, 
  X,
  Clock,
  ExternalLink,
  Wrench,
  Lightbulb,
  Rocket
} from 'lucide-react';

// --- Data ---

const EVENTS = [
  {
    id: 'tecnion',
    name: 'TECNION',
    icon: Lightbulb,
    shortDesc: 'Paper Presentation competition showcasing innovative engineering ideas.',
    fullDesc: 'TECNION is the flagship paper presentation event of DYNAMECHS 2K26. It provides a platform for budding engineers to present their research, innovative ideas, and technical findings in the field of Mechanical Engineering.',
    date: '24 March 2026',
    venue: 'Seminar Hall, ME Dept',
    prize: 'Winner: ₹5000 | Runner: ₹3000',
    coordinator: 'K. Praveen (9035454159)',
    rules: [
      'Maximum 2 authors per paper.',
      'Abstract should not exceed 300 words.',
      'Presentation time: 8 mins + 2 mins Q&A.',
      'Soft copy must be submitted 3 days prior.'
    ]
  },
  {
    id: 'projectexpo',
    name: 'PROJECT EXPO',
    icon: Rocket,
    shortDesc: 'Demonstrate your working models and technical projects.',
    fullDesc: 'Showcase your engineering prowess by presenting working models or prototypes. This event highlights practical applications of theoretical knowledge.',
    date: '24 March 2026',
    venue: 'Main Porch, ME Dept',
    prize: 'Winner: ₹7000 | Runner: ₹4000',
    coordinator: 'G. Rohith Kumar (9392409591)',
    rules: [
      'Team size: Max 3 members.',
      'Working models are preferred.',
      'Bring all necessary components/extensions.',
      'Project description chart is mandatory.'
    ]
  },
  {
    id: 'tecrity',
    name: 'TECRITY',
    icon: Zap,
    shortDesc: 'Technical quiz and rapid-fire engineering challenges.',
    fullDesc: 'Test your fundamental knowledge and quick thinking in this multi-round technical challenge covering all core mechanical subjects.',
    date: '24 March 2026',
    venue: 'Room 201, ME Dept',
    prize: 'Winner: ₹3000 | Runner: ₹1500',
    coordinator: 'A. Alekhya (9866691400)',
    rules: [
      'Individual or team of 2.',
      'Round 1: Written prelims.',
      'Round 2: Rapid fire.',
      'Round 3: Visual round.'
    ]
  },
  {
    id: 'tecwiz',
    name: 'TECWIZ',
    icon: Cpu,
    shortDesc: 'CAD design and modeling competition.',
    fullDesc: 'A competition for the masters of CAD. Design complex mechanical components under time pressure using industry-standard software.',
    date: '24 March 2026',
    venue: 'CAD Lab',
    prize: 'Winner: ₹4000 | Runner: ₹2000',
    coordinator: 'K. Praveen (9035454159)',
    rules: [
      'Software: AutoCAD / SolidWorks / CATIA.',
      'Time limit: 60 minutes.',
      'Accuracy and time taken are key factors.',
      'Problem statement will be given on spot.'
    ]
  },
  {
    id: 'tecwar',
    name: 'TECWAR',
    icon: Wrench,
    shortDesc: 'Mechanical assembly and disassembly race.',
    fullDesc: 'Get your hands dirty! A race against time to assemble or disassemble mechanical components with precision.',
    date: '24 March 2026',
    venue: 'Workshop Area',
    prize: 'Winner: ₹3500 | Runner: ₹1500',
    coordinator: 'G. Rohith Kumar (9392409591)',
    rules: [
      'Individual participation.',
      'Safety gear (gloves) will be provided.',
      'Proper tool usage is monitored.',
      'Fastest completion with zero errors wins.'
    ]
  },
  {
    id: 'spotevents',
    name: 'SPOT EVENTS',
    icon: Zap,
    shortDesc: 'Instant technical challenges and fun spot competitions.',
    fullDesc: 'A series of quick, on-the-spot challenges designed to test your spontaneous engineering skills and creativity.',
    date: '24 March 2026',
    venue: 'ME Dept Corridor',
    prize: 'Instant Prizes',
    coordinator: 'K. Praveen (9035454159)',
    rules: [
      'Open for all registered participants.',
      'Registration on the spot.',
      'Limited time per challenge.',
      'Decisions of spot judges are final.'
    ]
  },
  {
    id: 'funstalls',
    name: 'FUNSTALLS',
    icon: Users,
    shortDesc: 'Engaging non-technical games and food stalls.',
    fullDesc: 'Take a break from the technical intensity with fun games, food, and interactive stalls organized by our students.',
    date: '24 March 2026',
    venue: 'Open Grounds',
    prize: 'Exciting Goodies',
    coordinator: 'A. Alekhya (9866691400)',
    rules: [
      'Open for all participants.',
      'Registration on spot.',
      'Fair play is expected.',
      'Enjoy the spirit of the symposium!'
    ]
  },
  {
    id: 'workshop',
    name: 'WORKSHOP',
    icon: Settings,
    shortDesc: 'Electric Vehicle Technology Trends.',
    fullDesc: 'A comprehensive workshop on the latest trends in EV technology, battery management, and the future of sustainable mobility.',
    date: '24 March 2026',
    venue: 'E-Classroom',
    prize: 'Participation Certificates',
    coordinator: 'Dr. B. Chandra Mohana Reddy',
    rules: [
      'Pre-registration is mandatory.',
      'Bring your own laptop (optional).',
      'Certificate issued after full attendance.',
      'Q&A session at the end.'
    ]
  }
];

// --- Components ---

const Particles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const p = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(p);
  }, []);

  return (
    <div className="particle-container">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="particle"
          initial={{ opacity: 0, y: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            y: [-100, -500],
            x: [0, (Math.random() - 0.5) * 100]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            bottom: "-10%",
          }}
        />
      ))}
    </div>
  );
};

const BlueprintBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-gradient-to-b from-[#f4f6f8] via-[#f4f6f8] to-white" 
    />
    <div className="absolute inset-0 blueprint-grid opacity-[0.1]" />
    <div className="absolute inset-0 blueprint-grid-fine opacity-[0.05]" />
    <div className="absolute inset-0 blueprint-overlay opacity-[0.2]" />
    
    {/* Animated Light Sweeps */}
    <motion.div
      animate={{
        x: ['-100%', '200%'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2 skew-x-12"
    />

    {/* Large Rotating Gears */}
    <div className="absolute -top-20 -right-20 text-slate-200/40 animate-spin-slow">
      <Settings size={400} />
    </div>
    <div className="absolute -bottom-40 -left-20 text-slate-200/40 animate-spin-reverse">
      <Settings size={500} />
    </div>
    <div className="absolute top-1/2 left-1/4 text-slate-200/20 animate-spin-slow hidden md:block">
      <Settings size={200} />
    </div>
    
    <Particles />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-[100] glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 bg-[#ff7a00] rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:rotate-90 transition-transform duration-500">
                <Settings className="animate-spin-slow" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 leading-none">
                  DYNAMECHS <span className="text-[#ff7a00]">2K26</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-1 hidden sm:block">
                  National Level Symposium
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-[#ff7a00] relative group ${
                  location.pathname === link.path ? 'text-[#ff7a00]' : 'text-slate-600'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#ff7a00] transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="nav-glow"
                    className="absolute -inset-x-4 -inset-y-2 bg-[#ff7a00]/5 rounded-lg -z-10 orange-glow"
                  />
                )}
              </Link>
            ))}
            <Link
              to="/events"
              className="bg-slate-900 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#ff7a00] transition-all shadow-xl shadow-slate-900/10 btn-glow"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center text-slate-900 focus:outline-none bg-slate-50 rounded-full"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-white md:hidden flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-slate-100">
              <span className="text-xl font-black tracking-tighter">
                DYNAMECHS <span className="text-[#ff7a00]">2K26</span>
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`text-4xl font-black uppercase tracking-tighter ${
                      location.pathname === link.path ? 'text-[#ff7a00]' : 'text-slate-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="p-8 border-t border-slate-100">
              <Link
                to="/events"
                className="block w-full text-center bg-[#ff7a00] text-white py-5 rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-orange-500/30"
              >
                Register Now
              </Link>
            </div>
            
            {/* Background Gears for Mobile Menu */}
            <div className="absolute bottom-0 right-0 text-slate-50 -z-10 animate-spin-slow">
              <Settings size={300} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white pt-24 pb-12 relative overflow-hidden">
    <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
        <div className="md:col-span-5">
          <Link to="/" className="flex items-center space-x-4 mb-8 group">
            <div className="w-14 h-14 bg-[#ff7a00] rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-orange-500/20 group-hover:rotate-90 transition-transform duration-500">
              <Settings className="animate-spin-slow" size={32} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white leading-none">
                DYNAMECHS <span className="text-[#ff7a00]">2K26</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mt-2">
                National Level Symposium
              </span>
            </div>
          </Link>
          <p className="text-slate-400 leading-relaxed text-lg font-medium max-w-md">
            A National Level Technical Symposium organized by the Department of Mechanical Engineering, JNTUACEA. 
            Fostering innovation and excellence in engineering for the next generation.
          </p>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-[#ff7a00]">Quick Links</h4>
          <ul className="space-y-4">
            {[
              { name: 'About Us', path: '/about' },
              { name: 'Technical Events', path: '/events' },
              { name: 'Event Schedule', path: '/schedule' },
              { name: 'Contact Support', path: '/contact' },
            ].map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="text-slate-400 hover:text-white transition-colors font-bold flex items-center group">
                  <ChevronRight size={14} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-4">
          <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-[#ff7a00]">Contact Info</h4>
          <ul className="space-y-6">
            <li className="flex items-start group">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mr-4 group-hover:bg-[#ff7a00]/20 transition-colors shrink-0">
                <MapPin className="text-[#ff7a00]" size={20} />
              </div>
              <span className="text-slate-400 font-medium leading-relaxed">JNTUA College of Engineering, Anantapur, Andhra Pradesh - 515002</span>
            </li>
            <li className="flex items-center group">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mr-4 group-hover:bg-[#ff7a00]/20 transition-colors shrink-0">
                <Mail className="text-[#ff7a00]" size={20} />
              </div>
              <span className="text-slate-400 font-medium">dynamechs2k26.jntua@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-slate-500 font-bold text-sm">© 2026 DYNAMECHS 2K26 – All Rights Reserved.</p>
        <div className="flex space-x-8">
          {['Facebook', 'Instagram', 'Twitter'].map((social) => (
            <span key={social} className="text-slate-500 hover:text-[#ff7a00] cursor-pointer font-black text-xs uppercase tracking-widest transition-colors">
              {social}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-03-24T09:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-3 sm:gap-6">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-24 sm:h-24 glass-card rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg border-slate-100">
            <span className="text-2xl sm:text-4xl font-black text-slate-900">
              {String(item.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 mt-3">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// --- Sections ---

const HeroSection = () => (
  <section className="relative min-h-[95vh] flex items-center bg-white pt-20 overflow-hidden">
    <BlueprintBackground />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-6 py-2 rounded-full bg-white/40 backdrop-blur-md text-[#ff7a00] text-[10px] font-black uppercase tracking-[0.4em] mb-10 border border-white/60 shadow-xl"
          >
            <Calendar size={14} className="mr-3" />
            24 MARCH 2026
          </motion.div>
          
          <div className="relative inline-block mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-8xl md:text-[10rem] font-black text-slate-900 leading-[0.8] tracking-tighter"
            >
              DYNA<br />
              <span className="text-[#ff7a00] orange-glow-text">MECHS</span>
            </motion.h1>
            
            {/* Floating Gear Outline */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 md:-top-20 md:-right-20 w-32 h-32 md:w-56 md:h-56 border border-slate-200 rounded-full flex items-center justify-center opacity-30"
            >
              <Settings size={80} className="text-slate-400" />
            </motion.div>
          </div>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-3xl font-black text-slate-500 uppercase tracking-[0.4em] mb-10 leading-tight"
          >
            National Level <br />Technical Symposium
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3 mb-12 text-slate-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em]"
          >
            <p className="flex items-center justify-center lg:justify-start"><Cpu size={14} className="mr-3 text-[#ff7a00]" /> Department of Mechanical Engineering</p>
            <p className="flex items-center justify-center lg:justify-start"><Settings size={14} className="mr-3 text-[#ff7a00]" /> JNTU College of Engineering Anantapur</p>
            <p className="italic text-[#ff7a00] mt-6 text-lg tracking-[0.1em]">"Set the Trail Blazing"</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-14 flex justify-center lg:justify-start"
          >
            <CountdownTimer />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
          >
            <Link to="/events" className="group bg-[#ff7a00] text-white px-12 py-6 rounded-2xl text-xs font-black uppercase tracking-[0.3em] hover:bg-slate-900 transition-all shadow-2xl shadow-orange-500/40 btn-glow flex items-center justify-center">
              Explore Events <ChevronRight className="ml-3 group-hover:translate-x-2 transition-transform" size={20} />
            </Link>
            <Link to="/contact" className="bg-white/60 backdrop-blur-md text-slate-900 border-2 border-white/80 px-12 py-6 rounded-2xl text-xs font-black uppercase tracking-[0.3em] hover:border-[#ff7a00] hover:text-[#ff7a00] transition-all shadow-xl flex items-center justify-center btn-glow">
              Register Now
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-20 hidden lg:flex items-center space-x-4 text-slate-400"
          >
            <div className="w-12 h-px bg-slate-200" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Scroll to explore</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="hidden lg:block relative"
        >
          <div className="relative z-10 bg-white/40 backdrop-blur-2xl p-6 rounded-[60px] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.2)] border border-white/60">
            <div className="overflow-hidden rounded-[48px] relative group">
              <img 
                src="https://picsum.photos/seed/mechanical-innovation/1200/1200" 
                alt="Mechanical Engineering Innovation" 
                className="w-full h-auto object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-12 -left-12 bg-slate-900 text-white p-10 rounded-[40px] shadow-3xl border-8 border-white/10 backdrop-blur-xl"
            >
              <div className="text-6xl font-black text-[#ff7a00] tracking-tighter">15+</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-black opacity-60 mt-3">Technical Events</div>
            </motion.div>
            
            {/* Floating Glass Panel */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-12 -right-12 glass-card p-8 rounded-[32px] border-white/60 shadow-2xl max-w-[200px]"
            >
              <div className="flex items-center text-[#ff7a00] mb-3">
                <Zap size={20} className="mr-2" />
                <span className="text-[10px] font-black uppercase tracking-widest">Innovation</span>
              </div>
              <p className="text-slate-600 text-[10px] font-bold leading-relaxed uppercase tracking-wider">Pioneering the future of mechanical systems.</p>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute top-1/2 -right-20 w-32 h-32 border-8 border-[#ff7a00]/10 rounded-full animate-spin-slow" />
        </motion.div>
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          { label: 'Participants', value: '1000+', icon: Users },
          { label: 'Colleges', value: '50+', icon: MapPin },
          { label: 'Prize Pool', value: '₹50K+', icon: Trophy },
          { label: 'Workshops', value: '02', icon: Settings },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ y: -15, rotate: idx % 2 === 0 ? 2 : -2 }}
            className="p-12 rounded-[50px] metallic-card text-center transition-all duration-500 group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff7a00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[50px]" />
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-900 text-[#ff7a00] mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl relative z-10">
              <stat.icon size={40} />
            </div>
            <div className="text-5xl font-black text-slate-900 mb-3 tracking-tighter relative z-10 group-hover:text-[#ff7a00] transition-colors">{stat.value}</div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] relative z-10">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Pages ---

const LandingPage = () => (
  <div className="overflow-hidden">
    <HeroSection />
    <StatsSection />
    <AboutPage />
    <EventsPage />
    <SchedulePage />
    <GalleryPage />
    <ContactPage />
  </div>
);

const HomePage = LandingPage;

const AboutPage = () => (
  <div className="py-24 bg-white relative overflow-hidden">
    <BlueprintBackground />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
            About <span className="text-[#ff7a00]">DYNAMECHS</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg">Engineering excellence through innovation and collaboration.</p>
          <div className="w-24 h-1 bg-[#ff7a00] mx-auto mt-8 rounded-full" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 tracking-tight uppercase">The Spirit of Innovation</h3>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 font-medium">
            DYNAMECHS is more than just a symposium; it's a celebration of mechanical engineering excellence. 
            Established with the vision of bridging the gap between theoretical concepts and practical innovation, 
            it has grown into one of the most prestigious national-level technical fests in the region.
          </p>
          <p className="text-xl text-slate-500 leading-relaxed font-medium">
            Our mission is to provide a platform for students across the nation to showcase their technical prowess, 
            engage in healthy competition, and learn from industry experts through workshops and interactive sessions.
          </p>
        </motion.div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-[#ff7a00]/10 rounded-[48px] blur-2xl group-hover:bg-[#ff7a00]/20 transition-colors" />
          <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://picsum.photos/seed/engineering/1000/800" 
              alt="Engineering Innovation" 
              className="w-full h-auto object-cover hover:scale-110 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute -bottom-10 -left-10 bg-slate-900 p-8 rounded-[32px] shadow-2xl border-4 border-white max-w-xs"
          >
            <div className="flex items-center text-[#ff7a00] mb-3">
              <Trophy size={24} className="mr-3" />
              <span className="text-xs font-black uppercase tracking-widest">Excellence</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">Recognizing the best engineering minds since our inception.</p>
          </motion.div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-[64px] p-12 md:p-24 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 text-slate-200/50 -z-0">
          <Wrench size={300} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-10 tracking-tight uppercase">Department of Mechanical Engineering</h3>
          <p className="text-xl text-slate-500 leading-relaxed mb-16 font-medium">
            The Department of Mechanical Engineering at JNTUACEA is one of the oldest and most distinguished departments 
            in the institution. With state-of-the-art laboratories, experienced faculty, and a rich history of research, 
            the department continues to produce engineers who lead in various sectors globally.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { value: '50+ Years', label: 'Legacy' },
              { value: '20+ Labs', label: 'Infrastructure' },
              { value: '1000+', label: 'Alumni Network' },
            ].map((item, idx) => (
              <div key={idx} className="p-10 bg-white rounded-[32px] shadow-xl shadow-slate-900/5 border border-slate-100">
                <div className="text-[#ff7a00] font-black text-3xl mb-2 tracking-tighter">{item.value}</div>
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const EventsPage = () => (
  <div className="py-24 relative overflow-hidden">
    <BlueprintBackground />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
            Technical <span className="text-[#ff7a00] orange-glow-text">Events</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-bold text-lg uppercase tracking-wide">
            Challenge your limits and showcase your skills in our diverse range of technical competitions.
          </p>
          <div className="w-32 h-1.5 bg-[#ff7a00] mx-auto mt-10 rounded-full orange-glow" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {EVENTS.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ y: -15 }}
            className="group metallic-card rounded-[40px] p-10 transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-[0.15] transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
              <event.icon size={140} />
            </div>
            
            <div className="w-20 h-20 bg-white rounded-3xl text-slate-900 flex items-center justify-center mb-10 group-hover:bg-[#ff7a00] group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-orange-500/40 relative z-10">
              <event.icon size={40} />
            </div>
            
            <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight group-hover:text-[#ff7a00] transition-colors relative z-10">{event.name}</h3>
            <p className="text-slate-500 mb-10 line-clamp-2 font-bold leading-relaxed text-sm uppercase tracking-wide relative z-10">{event.shortDesc}</p>
            
            <Link 
              to={`/events/${event.id}`}
              className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 hover:text-[#ff7a00] transition-all group/btn relative z-10"
            >
              View Details <ChevronRight size={18} className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
            </Link>
            
            {/* Hover Glow Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ff7a00]/30 rounded-[40px] transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const EventDetailPage = () => {
  const { id } = useParams();
  const event = EVENTS.find(e => e.id === id);

  if (!event) return <div className="py-40 text-center font-black uppercase tracking-[0.4em]">Event not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-24 relative overflow-hidden"
    >
      <BlueprintBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link to="/events" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-[#ff7a00] mb-16 transition-colors group">
          <ChevronRight className="mr-3 rotate-180 group-hover:-translate-x-2 transition-transform" size={18} /> Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
                {event.name}
              </h1>
              <div className="flex flex-wrap gap-4 mb-12">
                <span className="px-6 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em]">Technical</span>
                <span className="px-6 py-2 rounded-full bg-[#ff7a00]/10 text-[#ff7a00] text-[10px] font-black uppercase tracking-[0.3em] border border-[#ff7a00]/20">National Level</span>
              </div>
              
              <div className="prose prose-xl prose-slate max-w-none">
                <p className="text-slate-600 font-medium leading-relaxed text-xl mb-10">
                  {event.fullDesc}
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="metallic-card rounded-[40px] p-12 mb-16"
            >
              <h3 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-[0.3em] flex items-center">
                <Settings className="mr-4 text-[#ff7a00] animate-spin-slow" size={24} /> Rules & Guidelines
              </h3>
              <ul className="space-y-6">
                {event.rules.map((rule, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center mr-6 group-hover:bg-[#ff7a00] group-hover:text-white transition-all shrink-0 font-black text-xs">
                      {idx + 1}
                    </div>
                    <p className="text-slate-600 font-bold uppercase tracking-wider text-sm pt-2">{rule}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="metallic-card rounded-[40px] p-10 sticky top-32"
            >
              <div className="space-y-8 mb-12">
                <div className="flex items-center group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center mr-6 group-hover:bg-[#ff7a00] group-hover:text-white transition-all shadow-lg">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Date</p>
                    <p className="text-lg font-black text-slate-900 uppercase tracking-tight">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center mr-6 group-hover:bg-[#ff7a00] group-hover:text-white transition-all shadow-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Venue</p>
                    <p className="text-lg font-black text-slate-900 uppercase tracking-tight">{event.venue}</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center mr-6 group-hover:bg-[#ff7a00] group-hover:text-white transition-all shadow-lg">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Prize Pool</p>
                    <p className="text-lg font-black text-[#ff7a00] uppercase tracking-tight">{event.prize}</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center mr-6 group-hover:bg-[#ff7a00] group-hover:text-white transition-all shadow-lg">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Coordinator</p>
                    <p className="text-lg font-black text-slate-900 uppercase tracking-tight">{event.coordinator}</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#ff7a00] text-white py-6 rounded-2xl text-xs font-black uppercase tracking-[0.4em] hover:bg-slate-900 transition-all shadow-2xl shadow-orange-500/40 btn-glow">
                Register Now
              </button>
              
              <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest mt-6">
                Limited slots available
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SchedulePage = () => {
  const schedule = [
    { time: '09:00 AM', title: 'Opening Ceremony', desc: 'Inauguration of DYNAMECHS 2K26 by Chief Guest.', type: 'General' },
    { time: '10:30 AM', title: 'Technical Events Begin', desc: 'TECNION, TECWIZ, and TECRITY rounds start simultaneously.', type: 'Technical' },
    { time: '12:30 PM', title: 'Lunch Break', desc: 'Networking and refreshment break for all participants.', type: 'General' },
    { time: '01:30 PM', title: 'Project Expo', desc: 'Exhibition of innovative projects and working models.', type: 'Technical' },
    { time: '02:30 PM', title: 'EV Workshop', desc: 'Special session on Electric Vehicle Technology Trends.', type: 'Workshop' },
    { time: '04:30 PM', title: 'Prize Distribution', desc: 'Awarding winners and closing remarks.', type: 'General' },
  ];

  return (
    <div className="py-24 relative overflow-hidden">
      <BlueprintBackground />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
              Event <span className="text-[#ff7a00] orange-glow-text">Timeline</span>
            </h2>
            <p className="text-slate-500 font-bold text-lg uppercase tracking-wide">
              Plan your day at DYNAMECHS 2K26.
            </p>
            <div className="w-32 h-1.5 bg-[#ff7a00] mx-auto mt-10 rounded-full orange-glow" />
          </motion.div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-slate-100 rounded-full" />

          <div className="space-y-16">
            {schedule.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-[#ff7a00] z-20 shadow-xl orange-glow" />

                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-16">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="metallic-card p-10 rounded-[40px] relative group"
                  >
                    <div className="text-[#ff7a00] text-sm font-black uppercase tracking-[0.4em] mb-4">{item.time}</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-[#ff7a00] transition-colors">{item.title}</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{item.desc}</p>
                  </motion.div>
                </div>
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    'https://picsum.photos/seed/mech1/800/600',
    'https://picsum.photos/seed/mech2/600/800',
    'https://picsum.photos/seed/mech3/800/800',
    'https://picsum.photos/seed/mech4/800/600',
    'https://picsum.photos/seed/mech5/600/800',
    'https://picsum.photos/seed/mech6/800/800',
  ];

  return (
    <div className="py-24 relative overflow-hidden">
      <BlueprintBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
              Event <span className="text-[#ff7a00] orange-glow-text">Gallery</span>
            </h2>
            <p className="text-slate-500 font-bold text-lg uppercase tracking-wide">
              Capturing moments of engineering excellence.
            </p>
            <div className="w-32 h-1.5 bg-[#ff7a00] mx-auto mt-10 rounded-full orange-glow" />
          </motion.div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-10 space-y-10">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage(src)}
              className="relative group cursor-pointer rounded-[40px] overflow-hidden metallic-card p-4"
            >
              <div className="rounded-[32px] overflow-hidden">
                <img 
                  src={src} 
                  alt={`Gallery ${idx}`} 
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                <div className="text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ff7a00] mb-2">DYNAMECHS 2K25</p>
                  <h4 className="text-xl font-black tracking-tight">Technical Session</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-20"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-full rounded-[40px] shadow-[0_0_100px_rgba(255,122,0,0.3)] border-4 border-white/10"
              referrerPolicy="no-referrer"
            />
            <button className="absolute top-10 right-10 text-white hover:text-[#ff7a00] transition-colors p-4 bg-white/10 rounded-full backdrop-blur-md">
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactPage = () => (
  <div className="py-24 relative overflow-hidden">
    <BlueprintBackground />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
            Get in <span className="text-[#ff7a00] orange-glow-text">Touch</span>
          </h2>
          <p className="text-slate-500 font-bold text-lg uppercase tracking-wide">
            Have questions? We're here to help you.
          </p>
          <div className="w-32 h-1.5 bg-[#ff7a00] mx-auto mt-10 rounded-full orange-glow" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <div className="metallic-card p-12 rounded-[40px] group">
            <h3 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-[0.3em] flex items-center">
              <Users className="mr-4 text-[#ff7a00]" size={24} /> Student Coordinators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {[
                { name: 'K. Praveen', phone: '9035454159' },
                { name: 'G. Rohith Kumar', phone: '9392409591' },
                { name: 'A. Alekhya', phone: '9866691400' },
              ].map((person, idx) => (
                <div key={idx} className="group/item">
                  <p className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2 group-hover/item:text-[#ff7a00] transition-colors">{person.name}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Coordinator</p>
                  <a href={`tel:+91${person.phone}`} className="inline-flex items-center text-xs font-black text-slate-900 hover:text-[#ff7a00] transition-colors">
                    <Phone size={14} className="mr-3" /> +91 {person.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="metallic-card p-12 rounded-[40px] group">
            <h3 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-[0.3em] flex items-center">
              <MapPin className="mr-4 text-[#ff7a00]" size={24} /> Location
            </h3>
            <p className="text-slate-600 font-bold uppercase tracking-wider text-sm leading-relaxed mb-8">
              Department of Mechanical Engineering,<br />
              JNTU College of Engineering Anantapur,<br />
              Anantapur, Andhra Pradesh - 515002
            </p>
            <div className="rounded-3xl overflow-hidden h-64 border-4 border-white/20 shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3868.966526151433!2d77.5878233148348!3d14.649626989768686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb14ad3d3f993d3%3A0x86831d161836a0f4!2sJNTUA%20College%20of%20Engineering%20Anantapur!5e0!3m2!1sen!2sin!4v1647354654321!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="JNTUA Location"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="metallic-card p-12 rounded-[40px]"
        >
          <h3 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-[0.3em] flex items-center">
            <Mail className="mr-4 text-[#ff7a00]" size={24} /> Send a Message
          </h3>
          <form className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-slate-100 border-2 border-transparent focus:border-[#ff7a00] rounded-2xl px-8 py-5 text-slate-900 font-black uppercase tracking-widest text-xs transition-all outline-none"
                placeholder="ENTER YOUR NAME"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-slate-100 border-2 border-transparent focus:border-[#ff7a00] rounded-2xl px-8 py-5 text-slate-900 font-black uppercase tracking-widest text-xs transition-all outline-none"
                placeholder="ENTER YOUR EMAIL"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Message</label>
              <textarea 
                rows="5" 
                className="w-full bg-slate-100 border-2 border-transparent focus:border-[#ff7a00] rounded-2xl px-8 py-5 text-slate-900 font-black uppercase tracking-widest text-xs transition-all outline-none resize-none"
                placeholder="HOW CAN WE HELP YOU?"
              />
            </div>
            <button className="w-full bg-slate-900 text-white py-6 rounded-2xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#ff7a00] transition-all shadow-2xl btn-glow">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans text-gray-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
