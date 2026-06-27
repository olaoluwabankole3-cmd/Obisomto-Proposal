import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Video, 
  Layers, 
  Eye, 
  Sparkles, 
  Lock, 
  Zap, 
  Check, 
  CheckCircle, 
  CreditCard, 
  ArrowRight, 
  Clock, 
  Sliders, 
  X, 
  Code, 
  Copy, 
  Edit3, 
  Users, 
  Smartphone, 
  Calendar, 
  TrendingUp, 
  FileText, 
  Shield,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

function ImageComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateWidth = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }
  };

  useEffect(() => {
    updateWidth();
    const timer = setTimeout(updateWidth, 100);
    window.addEventListener('resize', updateWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-[#121214] brutalist-border overflow-hidden select-none cursor-ew-resize rounded-none touch-none"
    >
      {/* Right Side / Background (Lossless 4K Editorial Portrait) */}
      <img 
        src="/src/assets/images/obisomto_portrait_1782576687427.jpg"
        alt="Lossless 4K Editorial Art"
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none filter saturate-[1.08] contrast-[1.04] brightness-[1.03] sharp-dynamic"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-black backdrop-blur-md px-3 py-1.5 rounded-none border-2 border-[#EAB308] text-[#EAB308] text-[9px] sm:text-[10px] font-mono tracking-widest font-bold">
        YOUR PORTFOLIO (LOSSLESS 4K)
      </div>

      {/* Left Side / Overlay (Instagram Compressed) */}
      <div 
        className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none z-10 border-r-4 border-[#EAB308]"
        style={{ width: `${sliderPosition}%` }}
      >
        <div 
          className="absolute top-0 left-0 h-full"
          style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}
        >
          <img 
            src="/src/assets/images/obisomto_portrait_1782576687427.jpg"
            alt="Instagram Compressed Output"
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none filter blur-[0.5px] saturate-[0.98] contrast-[0.96] brightness-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-black backdrop-blur-md px-3 py-1.5 rounded-none border-2 border-red-500 text-red-500 text-[9px] sm:text-[10px] font-mono tracking-widest font-bold whitespace-nowrap">
            INSTAGRAM PORT (1080p STANDARD)
          </div>
        </div>
      </div>

      {/* Center Handle Slider */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-[#EAB308] z-30 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-none bg-black border-4 border-[#EAB308] shadow-2xl flex items-center justify-center pointer-events-auto transition-transform duration-150 ${isDragging ? 'scale-110 bg-neutral-900 border-yellow-400' : 'hover:scale-105'}`}>
          <Sliders className="w-4 h-4 text-[#EAB308]" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [brandName, setBrandName] = useState('OBISOMTO');
  const [clientName, setClientName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [signatureText, setSignatureText] = useState('');
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [copied, setCopied] = useState(false);

  // States for 3 package tiers (using the exact values, names, and specs from the image)
  const [selectedTier, setSelectedTier] = useState<'base' | 'standard' | 'elite'>('standard');
  const [activeDeliverableModal, setActiveDeliverableModal] = useState<string | null>(null);

  const tiers = {
    base: {
      id: 'base',
      tierNumber: 'TIER 01',
      name: 'THE CORE ATELIER SHOWROOM',
      price: 600000,
      days: 14,
      description: 'Custom portfolio flagship layout, cinematic display for named masterpieces, and your high-end consultation routing form.',
      deliverables: [
        'Bespoke visual showcase grid mapping raw-grade images',
        'Immersive slideshow player for iconic magazine covers',
        'Custom interactive intake funnel capturing brand budgets',
        'Optimized portfolio routing layout targeting creative directors',
        'Basic local search metadata & image schema tagging'
      ]
    },
    standard: {
      id: 'standard',
      tierNumber: 'TIER 02',
      name: 'THE MASTERPIECE COLLECTION SYSTEM',
      price: 800000,
      days: 28,
      description: 'Full-screen interactive galleries, dedicated application channels for the Nelson Mentorship platform, and advanced local/international SEO optimization.',
      deliverables: [
        'All Core features plus advanced full-screen fluid lightboxes',
        'Dedicated secure portal layouts for brand collaborations',
        'Integrated scheduling systems and client intake pipelines',
        'Nelson Mentorship application channels & student archives',
        'International SEO structuring, custom CDN acceleration',
        'High-speed AVIF/WebP uncompressed image rendering protocols'
      ]
    },
    elite: {
      id: 'elite',
      tierNumber: 'TIER 03',
      name: 'THE ONE-OF-ONE SOVEREIGN SUITE',
      price: 1500000,
      days: 42,
      description: 'Full-scale viral load scaling architecture, custom fluid motion transition graphics, dedicated 4K video infrastructure for patina processes, and continuous server maintenance support.',
      deliverables: [
        'All prior deliverables optimized for ultimate studio prestige',
        'High-performance distributed edge load balancing',
        'Cinematic 4K background video servers and showreel players',
        'Custom luxury motion transitions & GSAP layout physics',
        'Private encrypted proofing vaults for celebrity clients',
        'Comprehensive 1-year priority DevOps maintenance and support',
        'Patina process capture logs & archival delivery modules'
      ]
    }
  };

  // State for Website Architecture Map
  const [selectedArchPage, setSelectedArchPage] = useState('homepage');

  const archPages = [
    {
      id: 'homepage',
      title: 'Cinematic Entrance Portal',
      tagline: 'THE LUXURY EXHIBIT',
      summary: 'High-impact full-bleed hero sequence displaying iconic covers and custom video loops, paired with curated horizontal slider portfolios and elegant agency inquiries.'
    },
    {
      id: 'portfolio',
      title: 'Editorial & Campaign Galleries',
      tagline: 'HIGH-FIDELITY ARCHIVES',
      summary: 'Categorized, lossless grids optimized for fashion campaigns, celebrity portraiture, and beauty editorials, integrating immersive light-box viewports.'
    },
    {
      id: 'proofing',
      title: 'Private Client Proofing Vault',
      tagline: 'SECURE COLLABORATION',
      summary: 'A secret, passcode-protected dashboard for luxury brand managers and editors to select raw proofs, comment on crops, and securely authorize releases.'
    },
    {
      id: 'about',
      title: 'The Creative Story & Bio',
      tagline: 'THE ARTIST DIARY',
      summary: 'Sleek, editorial layouts showcasing behind-the-scenes video highlights, creative philosophy, gear specification lists, and selected press coverage.'
    },
    {
      id: 'booking',
      title: 'Campaign Inquiry Pipeline',
      tagline: 'HIGH-VALUE CONVERSIONS',
      summary: 'Custom interactive multi-step intake capturing campaign details, brand specs, locations, shoot dates, budgets, and automatic licensing selections.'
    },
    {
      id: 'technical',
      title: 'Lossless Performance Core',
      tagline: 'NEXT-GEN INFRASTRUCTURE',
      summary: 'Bespoke image compression pipelines (AVIF/WebP), globally distributed serverless CDN caching, and customized structured schema markers for luxury SEO.'
    }
  ];

  // States for live automated payment & tracker simulator for Photography bookings
  const [simulatedMembers, setSimulatedMembers] = useState([
    { id: 1, name: 'Vogue Nigeria Editorial', plan: 'THE MASTERPIECE SYSTEM', amount: '₦800,000', status: 'PAID & APPROVED', time: '5 mins ago' },
    { id: 2, name: 'Davido Global Cover', plan: 'THE SOVEREIGN SUITE', amount: '₦1,500,000', status: 'PAID & APPROVED', time: '1 hour ago' },
    { id: 3, name: 'L’Oréal Campaign Series', plan: 'THE MASTERPIECE SYSTEM', amount: '₦800,000', status: 'PAID & APPROVED', time: '3 hours ago' },
  ]);
  const [totalSimulatedCapital, setTotalSimulatedCapital] = useState(3100000);

  const addSimulatedSignUp = () => {
    const clients = ['Gucci West Africa', 'Martell Campaign', 'Nike Global Portrait', 'Genevieve Magazine', 'Wizkid Album Art', 'Tems Beauty Cover'];
    const plans = ['THE CORE SHOWROOM', 'THE MASTERPIECE SYSTEM', 'THE SOVEREIGN SUITE'];
    const prices = [600000, 800000, 1500000];
    
    const randomIdx = Math.floor(Math.random() * clients.length);
    const randomPlanIdx = Math.floor(Math.random() * plans.length);
    
    const name = clients[randomIdx];
    const plan = plans[randomPlanIdx];
    const rawPrice = prices[randomPlanIdx];
    
    const formattedPrice = `₦${rawPrice.toLocaleString()}`;
    const newMember = {
      id: Date.now(),
      name,
      plan,
      amount: formattedPrice,
      status: 'PAID & APPROVED',
      time: 'Just now'
    };
    
    setSimulatedMembers(prev => [newMember, ...prev.slice(0, 3)]);
    setTotalSimulatedCapital(prev => prev + rawPrice);
  };

  // Dynamic interactive options mapping for Photography
  const [selectedAddons, setSelectedAddons] = useState<{ [key: string]: boolean }>({
    'proofing-gallery': false,
    'video-integration': false,
    'cdn-acceleration': false,
    'monthly-retainer': false,
  });

  const addonsList = [
    { 
      id: 'proofing-gallery', 
      title: 'Private Client Proofing Vault', 
      price: 50, 
      days: 4, 
      description: 'Passcode-secured workspace where celebrity clients and agency leads review, select, comment, and sign off on active photo sessions.' 
    },
    { 
      id: 'video-integration', 
      title: 'Cinematic 4K Behind-The-Scenes Loop Player', 
      price: 50, 
      days: 3, 
      description: 'Ultra-optimized background video player supporting premium 4K showreels and campaign videos without reducing performance score.' 
    },
    { 
      id: 'cdn-acceleration', 
      title: 'Lossless Core Image Engine & CDN Optimization', 
      price: 50, 
      days: 3, 
      description: 'Advanced media processor encoding images in modern format (WebP/AVIF) served via globally distributed serverless image CDNs.' 
    },
    { 
      id: 'monthly-retainer', 
      title: 'Ongoing Creative Retainer & Support Suite', 
      price: 50, 
      days: 2, 
      description: 'On-demand portfolio updates, metadata and SEO fine-tuning, automated monthly cloud backups, and custom priority server support.' 
    },
  ];

  const handleToggleAddon = (id: string) => {
    setSelectedAddons(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeAddonsCount = Object.keys(selectedAddons).filter(k => selectedAddons[k]).length;
  
  const totalAddonsPrice = Object.keys(selectedAddons).reduce((acc, curr) => {
    if (selectedAddons[curr]) {
      const addon = addonsList.find(a => a.id === curr);
      return acc + (addon ? addon.price : 0);
    }
    return acc;
  }, 0);

  const currentPriceText = totalAddonsPrice > 0 
    ? `₦${tiers[selectedTier].price.toLocaleString()} + $${totalAddonsPrice}`
    : `₦${tiers[selectedTier].price.toLocaleString()}`;

  const currentTimeline = tiers[selectedTier].days + Object.keys(selectedAddons).reduce((acc, curr) => {
    if (selectedAddons[curr]) {
      const addon = addonsList.find(a => a.id === curr);
      return acc + (addon ? addon.days : 0);
    }
    return acc;
  }, 0);

  // Standalone HTML generator injecting current live stats
  const generateStandaloneHTML = () => {
    const activeAddonsListHTML = Object.keys(selectedAddons)
      .filter(key => selectedAddons[key])
      .map(key => {
        const item = addonsList.find(a => a.id === key);
        return `
        <div class="p-4 bg-[#121214] border-2 border-white flex items-start gap-3">
            <span class="text-[#EAB308] font-bold">★</span>
            <div>
                <h5 class="text-xs font-black tracking-widest text-white uppercase">${item?.title}</h5>
                <p class="text-[11px] text-neutral-400 mt-1">${item?.description}</p>
                <p class="text-[10px] text-[#EAB308] font-mono mt-1">+$${item?.price} // +${item?.days} Days</p>
            </div>
        </div>`;
      }).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OBISOMTO // LOSSLESS DIGITAL ARCHIVE PLATFORM PROPOSAL</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0B0B0C;
        }
        .font-oswald {
            font-family: 'Oswald', sans-serif;
        }
        .brutalist-border {
            border: 4px solid #ffffff;
        }
        .brutalist-border-amber {
            border: 4px solid #EAB308;
        }
        .brutalist-shadow-amber {
            box-shadow: 8px 8px 0px 0px #EAB308;
        }
        .brutalist-shadow-white {
            box-shadow: 8px 8px 0px 0px #ffffff;
        }
    </style>
</head>
<body class="text-neutral-100 min-h-screen selection:bg-[#EAB308] selection:text-black overflow-x-hidden">

    <div class="h-1.5 bg-[#EAB308]"></div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">

        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 border-b-2 border-neutral-800 pb-8">
            <div>
                <span class="inline-block bg-[#EAB308] text-black text-xs font-black tracking-[0.2em] px-3 py-1 uppercase font-oswald">
                    STUDIO DEVELOPMENT PLANS
                </span>
                <h3 class="text-neutral-400 font-oswald tracking-wider uppercase text-sm mt-3">
                    CUSTOM PROPOSAL FOR: <span class="text-white font-extrabold text-lg tracking-wide">${brandName}</span>
                </h3>
            </div>
            <div class="text-left md:text-right font-mono text-xs text-neutral-400 space-y-1">
                <p>PLAN NUMBER: <span class="text-[#EAB308] font-bold">#SOMTO-DX-2026</span></p>
                <p>STATUS: UNLOCKED FOR SECURING</p>
            </div>
        </div>

        <!-- Hero Section -->
        <header class="relative overflow-hidden mb-20 text-center bg-black border-4 border-white p-8 sm:p-20 brutalist-shadow-amber">
            <h1 class="font-oswald text-4xl sm:text-7xl font-black tracking-tight text-white uppercase leading-none max-w-3xl mx-auto">
                A LOSSLESS <br class="hidden sm:inline"/>
                CINEMATIC GALLERY FOR <span class="text-[#EAB308] underline decoration-4 underline-offset-4">OBISOMTO</span>
            </h1>
            <p class="text-neutral-400 text-sm sm:text-base mt-6 max-w-xl mx-auto leading-relaxed">
                We are building a customized, uncompressed digital stage that loads massive imagery instantly, showcases behind-the-scenes 4K motion, and integrates secure brand proofing dashboards to elevate your industry status.
            </p>
        </header>

        <!-- The Pain and Promise -->
        <section class="mb-20">
            <h2 class="font-oswald text-3xl sm:text-4xl font-black tracking-tight uppercase text-white mb-8">
                01. THE PROBLEM AND THE SMART SOLUTION
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-black border-4 border-white p-6 sm:p-8 space-y-4">
                    <span class="text-xs font-mono text-red-500 font-bold bg-red-500/10 border-2 border-red-500 px-2 py-1 uppercase inline-block">
                        THE COMPRESSION TRAP
                    </span>
                    <h3 class="font-oswald text-xl font-black text-white uppercase">Instagram Destructive Grids</h3>
                    <p class="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                        Social networks degrade your 100-megapixel raw visual compositions into a low-resolution pixelated view. Furthermore, changes in social media feed algorithms mean luxury brand managers, editors, and corporate sponsors miss your archive.
                    </p>
                </div>
                <div class="bg-black border-4 border-[#EAB308] p-6 sm:p-8 space-y-4 brutalist-shadow-amber">
                    <span class="text-xs font-mono text-[#EAB308] font-bold bg-[#EAB308]/10 border-2 border-[#EAB308] px-2 py-1 uppercase inline-block font-mono">
                        THE LOSSLESS STAGE
                    </span>
                    <h3 class="font-oswald text-xl font-black text-white uppercase">Ultra-Fast Serverless CDN Showcase</h3>
                    <p class="text-neutral-200 text-xs sm:text-sm leading-relaxed">
                        A bespoke portfolio utilizing cutting-edge AVIF encoding to load uncompressed 4K photography instantly. Incorporates secure proofing galleries, contract signatures, and Nelson Mentorship integrations.
                    </p>
                </div>
            </div>
        </section>

        <!-- Selected Extras -->
        <section class="mb-20">
            <div class="p-6 sm:p-10 bg-black border-4 border-white">
                <h3 class="font-oswald text-2xl font-black text-white uppercase mb-4">SELECTED INTEGRATIONS & TIMELINE</h3>
                <div class="space-y-4">
                    ${activeAddonsListHTML || '<p class="text-neutral-500 font-mono text-xs uppercase">[ No extra options selected; base tier setup only ]</p>'}
                </div>
            </div>
        </section>

        <!-- The Deal Box -->
        <section>
            <div class="bg-[#EAB308] p-8 sm:p-12 text-black brutalist-shadow-white border-4 border-white">
                <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="space-y-4 text-left max-w-xl">
                        <span class="inline-block bg-black text-[#EAB308] text-xs font-black tracking-widest px-3 py-1 uppercase font-mono">
                            AGREEMENT AND SPECS
                        </span>
                        <h3 class="font-oswald text-3xl sm:text-4xl font-black uppercase text-neutral-950 leading-none">
                            SECURE YOUR PORTFOLIO ENGINE
                        </h3>
                        <p class="text-neutral-900 text-sm font-semibold">
                            We are prepared to deploy this bespoke photography studio framework. Signing locks in our priority slot so we can initiate development.
                        </p>
                    </div>
                    <div class="bg-black text-white p-6 border-4 border-black text-center min-w-[250px] space-y-4">
                        <div class="grid grid-cols-2 gap-2 border-b-2 border-neutral-800 pb-4">
                            <div>
                                <p class="text-[9px] text-neutral-500 font-mono">DAYS TO BUILD</p>
                                <p class="text-lg font-bold font-oswald text-[#EAB308]">${currentTimeline} DAYS</p>
                            </div>
                            <div>
                                <p class="text-[9px] text-neutral-500 font-mono">INVESTMENT</p>
                                <p class="text-lg font-bold font-oswald text-white">${currentPriceText}</p>
                            </div>
                        </div>
                        <button onclick="alert('Digital proposal confirmed! STAKR engineering team is initializing design protocols!')" class="w-full bg-[#EAB308] text-black font-black text-xs py-3 tracking-widest uppercase hover:bg-white transition-all">
                            CONFIRM AND ORDER 🚀
                        </button>
                    </div>
                </div>
            </div>
        </section>

    </div>

</body>
</html>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateStandaloneHTML());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitSignature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !signatureText) return;
    setIsSignModalOpen(false);
    setIsAccepted(true);
  };

  return (
    <div className="bg-[#0B0B0C] text-neutral-100 min-h-screen font-sans selection:bg-[#EAB308] selection:text-black pb-24 relative overflow-x-hidden">
      
      {/* Top Luxury Accent Strip */}
      <div className="h-2 bg-[#EAB308]"></div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative">

        {/* Accepted Contract Notification Banner */}
        {isAccepted && (
          <div className="bg-[#121815] border-4 border-[#EAB308] brutalist-shadow-amber p-6 sm:p-10 mb-12 relative flex flex-col md:flex-row items-center gap-8 animate-fade-in">
            <div className="h-16 w-16 bg-[#EAB308] text-black border-4 border-black flex items-center justify-center shrink-0">
              <Check className="h-9 w-9 stroke-[3]" />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h3 className="font-oswald text-3xl font-black text-white uppercase tracking-wider">PROPOSAL SIGNED & AGREED! 🎉</h3>
              <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
                Splendid, Somto! The design blueprints have been verified. The STAKR development team is currently provisioning the serverless content delivery nodes and initiating the UI/UX design architecture.
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono">
                <span className="bg-black border-2 border-neutral-800 px-3 py-1.5 text-neutral-300">AUTHORIZED BY: {clientName}</span>
                <span className="bg-black border-2 border-neutral-800 px-3 py-1.5 text-neutral-300">CONTACT EMAIL: {contactEmail}</span>
                <span className="bg-black border-2 border-neutral-800 px-3 py-1.5 text-[#EAB308]">TOTAL INVESTMENT: {currentPriceText}</span>
              </div>
            </div>
          </div>
        )}

        {/* Ribbon Header Navigation / Badges */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 border-b-2 border-neutral-800 pb-6 animate-fade-in">
          <div className="space-y-2">
            <span className="inline-block bg-[#EAB308] text-black text-[10px] font-black tracking-[0.2em] px-3 py-1 uppercase font-oswald">
              PORTFOLIO ARCHIVE DEVELOPMENT PROPOSAL
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-1 font-mono text-[11px] text-neutral-400 mt-2">
              <p>PROPOSAL FOR: <span className="text-white font-bold">{brandName}</span></p>
              <p>AGENCY / CREATED BY: <span className="text-white font-bold">STAKR STUDIO</span></p>
              <p>PROJECT DATE: <span className="text-[#EAB308] font-bold">June 2026</span></p>
            </div>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-400 flex flex-col md:items-end gap-2 shrink-0 w-full md:w-auto">
            <p>CONTRACT SLID: <span className="text-[#EAB308] font-semibold">#STAKR-SOMTO-2026</span></p>
            <p className="text-neutral-500 text-[10px] font-bold">Lagos Creative Sector Launch</p>
            <button 
              onClick={handleCopyCode}
              className="mt-1 bg-[#EAB308] hover:bg-white text-black font-black font-mono uppercase tracking-widest text-[10px] px-3.5 py-2 border-2 border-black transform active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 brutalist-shadow-white hover:shadow-none"
            >
              <Code className="h-3.5 w-3.5" />
              {copied ? 'CODE COPIED TO CLIPBOARD! ✓' : 'GET STANDALONE CODE 🚀'}
            </button>
          </div>
        </div>

        {/* 1. HERO BRAND INTRO */}
        <header id="hero" className="relative overflow-hidden mb-20 text-center bg-black border-4 border-white p-8 sm:p-20 brutalist-shadow-amber rounded-none">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(234,179,8,0.06)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.25em] text-[#EAB308] uppercase bg-[#EAB308]/10 px-4 py-1.5 border-2 border-[#EAB308]/20 mb-8">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>BESPOKE HIGH-FASHION PORTFOLIOS</span>
            </div>
            
            <h1 className="font-oswald text-4xl sm:text-7xl font-black tracking-tight text-white uppercase leading-none max-w-2xl text-center">
              A LOSSLESS STAGE <br className="hidden sm:inline"/>
              FOR ICONIC VISUALS
            </h1>
            
            <p className="text-neutral-400 text-sm sm:text-base mt-6 max-w-xl leading-relaxed">
              Standard photography templates compress, blur, and flatten your high-resolution artistry. We will architect a blazing-fast, serverless, uncompressed gallery pipeline custom-designed to command high-value editorial campaigns and global agency contracts.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => {
                  const element = document.getElementById('packages-pricing');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="bg-[#EAB308] hover:bg-white text-black font-black font-oswald uppercase tracking-wider text-xs px-6 py-3 border-4 border-black transform active:scale-95 transition-all brutalist-shadow-white hover:shadow-none cursor-pointer"
              >
                VIEW PACKAGES & OPTIONS
              </button>
            </div>
          </div>
        </header>

        {/* 2. OBJECTIVES: PROBLEMS & SOLUTIONS */}
        <section id="objective" className="objective-section mb-20 sm:mb-28">
          <h2 className="font-oswald text-3xl sm:text-4xl font-black tracking-tight uppercase text-white mb-8 border-b-2 border-neutral-900 pb-4">
            01. <span className="text-[#EAB308]">THE COMPRESSION PROBLEM & THE REVOLUTION</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Problem */}
            <div className="bg-black border-4 border-white p-6 sm:p-8 space-y-4">
              <span className="text-xs font-mono text-red-500 font-bold bg-red-500/10 border-2 border-red-500 px-2.5 py-1 uppercase inline-block">
                THE COMPRESSION TRAP
              </span>
              <h3 className="font-oswald text-2xl font-black text-white uppercase leading-tight">
                COMPRESSED GRIDS & LOST DETAIL
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Instagram aggressively compresses gorgeous 100-megapixel masterwork images, washing out rich color grading, crisp skin textures, and subtle chiaroscuro shadows. Relying strictly on basic grids makes professional campaigns look standard.
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed">
                High-end magazine buyers, agency artistic directors, and luxury brand executives look for premium speed-optimized portfolio libraries to evaluate professional talent, rather than navigating low-res social feeds.
              </p>
            </div>

            {/* Right Column: Solution */}
            <div className="bg-black border-4 border-[#EAB308] brutalist-shadow-amber p-6 sm:p-8 space-y-4">
              <span className="text-xs font-mono text-[#EAB308] font-bold bg-[#EAB308]/10 border-2 border-[#EAB308] px-2.5 py-1 uppercase inline-block">
                THE RESOLUTION
              </span>
              <h3 className="font-oswald text-2xl font-black text-white uppercase leading-tight">
                BESPOKE OBSIDIAN GALLERY SYSTEM
              </h3>
              <p className="text-neutral-200 text-sm leading-relaxed">
                We will construct a personalized, serverless, lightning-fast digital estate optimized for retina displays. Your visual art streams instantly on global content networks, accompanied by private celebrity client proofing dashboards and mentorship archives.
              </p>
              <p className="text-yellow-200 text-xs font-mono border-t border-neutral-800 pt-3 flex items-center gap-2">
                <Camera className="h-4 w-4 text-[#EAB308]" />
                Uncompromising pixel-perfect fidelity. Built for elite creators and editorial giants.
              </p>
            </div>
          </div>

          {/* Image Comparison Slider (Custom Rebrand Asset) */}
          <div className="mt-12 bg-black border-4 border-white p-6 sm:p-10 space-y-6 brutalist-shadow-amber">
            <div className="space-y-3 max-w-3xl">
              <span className="text-[10px] font-mono text-[#EAB308] font-bold bg-[#EAB308]/10 border-2 border-[#EAB308] px-2.5 py-0.5 uppercase tracking-widest inline-block font-mono">
                HIGH-FIDELITY PHOTOGRAPHIC BENCHMARK
              </span>
              <h3 className="font-oswald text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                YOUR ARTISTRY CAPTURED WITH ZERO DEGRADATION
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
                Notice how compression algorithms muddy skin details, desaturate rich African skin tones, and introduce blocky noise in deep studio shadows. Drag the slider below to view the difference between a standard compressed post and our lossless ultra-high-definition presentation engine.
              </p>
            </div>

            <div className="pt-2">
              <ImageComparisonSlider />
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-[10px] font-mono text-neutral-500 border-t border-neutral-900 pt-4">
              <span>[ ACTION: HOVER OR SWIPE SLIDER TO COMPARE DETAILS ]</span>
              <span className="text-[#EAB308] font-bold">[ SYSTEM: SERVERLESS AVIF ENCODING CORE ]</span>
            </div>
          </div>
        </section>

        {/* 3. PERFORMANCE FEATURES GRID */}
        <section id="specs" className="mb-20 sm:mb-28">
          <div className="mb-10 text-left">
            <span className="text-xs font-mono tracking-widest text-[#EAB308] font-bold uppercase">02. PERFORMANCE BLUEPRINT</span>
            <h3 className="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mt-1">THE VISUAL SUITE DELIVERABLES</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DELIVERABLE 1 */}
            <div className="bg-black border-4 border-white p-6 sm:p-8 hover:border-[#EAB308] transition-all duration-300 group brutalist-shadow-white hover:brutalist-shadow-amber">
              <div className="h-10 w-10 flex items-center justify-center bg-[#EAB308] text-black font-extrabold text-lg font-oswald mb-4">
                01
              </div>
              <h4 className="font-oswald text-xl font-black text-white uppercase group-hover:text-[#EAB308] transition-colors flex items-center gap-2">
                <Camera className="h-5 w-5 text-[#EAB308]" />
                ULTRA-ACCELERATED RETINA FEED
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Utilize serverless edge image routing and modern AVIF wrappers to ensure full-frame photographic series display in raw sharpness on any device instantly.
              </p>
            </div>

            {/* DELIVERABLE 2 */}
            <div className="bg-black border-4 border-white p-6 sm:p-8 hover:border-[#EAB308] transition-all duration-300 group brutalist-shadow-white hover:brutalist-shadow-amber">
              <div className="h-10 w-10 flex items-center justify-center bg-[#EAB308] text-black font-extrabold text-lg font-oswald mb-4">
                02
              </div>
              <h4 className="font-oswald text-xl font-black text-white uppercase group-hover:text-[#EAB308] transition-colors flex items-center gap-2">
                <Lock className="h-5 w-5 text-[#EAB308]" />
                CELEBRITY SECURE PROOFING VAULT
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Private passcode-protected portal allowing premium high-profile actors, singers, and fashion brand managers to select shoots, approve edits, and request adjustments.
              </p>
            </div>

            {/* DELIVERABLE 3 */}
            <div className="bg-black border-4 border-white p-6 sm:p-8 hover:border-[#EAB308] transition-all duration-300 group brutalist-shadow-white hover:brutalist-shadow-amber">
              <div className="h-10 w-10 flex items-center justify-center bg-[#EAB308] text-black font-extrabold text-lg font-oswald mb-4">
                03
              </div>
              <h4 className="font-oswald text-xl font-black text-white uppercase group-hover:text-[#EAB308] transition-colors flex items-center gap-2">
                <Video className="h-5 w-5 text-[#EAB308]" />
                CINEMATIC BTS VIDEO PLAYER
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Seamless background and modular playback blocks optimized for behind-the-scenes recordings, campaign films, and cinematic lighting showreels.
              </p>
            </div>

            {/* DELIVERABLE 4 */}
            <div className="bg-black border-4 border-white p-6 sm:p-8 hover:border-[#EAB308] transition-all duration-300 group brutalist-shadow-white hover:brutalist-shadow-amber">
              <div className="h-10 w-10 flex items-center justify-center bg-[#EAB308] text-black font-extrabold text-lg font-oswald mb-4">
                04
              </div>
              <h4 className="font-oswald text-xl font-black text-white uppercase group-hover:text-[#EAB308] transition-colors flex items-center gap-2">
                <Zap className="h-5 w-5 text-[#EAB308]" />
                GLOBAL CREATIVE SEO MAPPING
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Structured JSON-LD schema markers, image alt maps, and core web performance elements optimized specifically to make global advertising agencies find your studio.
              </p>
            </div>
          </div>
        </section>

        {/* 4. PLATFORM SCHEMATICS INDEX MAP */}
        <section id="architecture-map" className="mb-20 sm:mb-28">
          <div className="mb-10 text-left">
            <span className="text-xs font-mono tracking-widest text-[#EAB308] font-bold uppercase">03. ARCHITECTURAL MAP</span>
            <h3 className="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mt-1">INTERACTIVE FRAMEWORK DIRECTORY</h3>
            <p className="text-neutral-400 text-sm mt-3 leading-relaxed max-w-2xl">
              Hover or select individual site directory nodes below to preview the layout schema and creative integrations designed for the obisomto system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-black border-4 border-white p-6 sm:p-10 brutalist-shadow-white">
            {/* Left Menu (Clickable Directory) */}
            <div className="md:col-span-5 space-y-3 w-full">
              {archPages.map((page) => {
                const isActive = selectedArchPage === page.id;
                return (
                  <button
                    key={page.id}
                    onClick={() => setSelectedArchPage(page.id)}
                    onMouseEnter={() => setSelectedArchPage(page.id)}
                    className={`w-full text-left p-4 border-4 transition-all duration-150 flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'border-[#EAB308] bg-neutral-900 text-white shadow-[4px_4px_0px_0px_#EAB308]'
                        : 'border-neutral-950 bg-neutral-900/30 text-neutral-400 hover:border-white hover:text-white'
                    }`}
                  >
                    <div>
                      <p className={`text-[9px] font-mono uppercase tracking-widest ${isActive ? 'text-[#EAB308]' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                        {page.tagline}
                      </p>
                      <h4 className="font-oswald text-lg font-black uppercase mt-0.5">
                        {page.title}
                      </h4>
                    </div>
                    <ArrowRight className={`h-4 w-4 transition-transform ${isActive ? 'translate-x-1 text-[#EAB308]' : 'text-neutral-600 group-hover:translate-x-1 group-hover:text-white'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Display Area */}
            <div className="md:col-span-7 bg-black border-4 border-neutral-800 p-6 sm:p-8 min-h-[300px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAB308]/5 blur-2xl rounded-full pointer-events-none"></div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b-2 border-neutral-900 pb-3">
                  <span className="text-[10px] font-mono text-[#EAB308] font-bold bg-[#EAB308]/10 px-2 py-0.5 border border-[#EAB308]/20 uppercase tracking-widest">
                    ACTIVE SEGMENT MODEL: {archPages.findIndex(p => p.id === selectedArchPage) + 1} / 6
                  </span>
                  <span className="font-mono text-[9px] text-neutral-600">OBISOMTO_REVAL_FS</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-oswald text-3xl font-black text-white uppercase tracking-wide">
                    {archPages.find(p => p.id === selectedArchPage)?.title}
                  </h3>
                  <p className="text-[#EAB308] font-mono text-xs uppercase tracking-widest">
                    {archPages.find(p => p.id === selectedArchPage)?.tagline}
                  </p>
                </div>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed pt-2 font-sans">
                  {archPages.find(p => p.id === selectedArchPage)?.summary}
                </p>
              </div>

              <div className="border-t-2 border-neutral-900 pt-4 mt-6 flex justify-between items-center font-mono text-[9px] text-neutral-500">
                <span>[ INTEGRATED DESIGN PROTOCOLS ]</span>
                <span className="text-[#EAB308]">[ STATUS: SECURITY VERIFIED ]</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. STUDIO AUTOMATION & LIVE DEMO SIMULATION */}
        <section id="zero-hassle" className="mb-20 sm:mb-28">
          <div className="mb-10 text-left">
            <span className="text-xs font-mono tracking-widest text-[#EAB308] font-bold uppercase">04. ADMINISTRATIVE HARMONY</span>
            <h3 className="font-oswald text-4xl sm:text-5xl font-black uppercase text-white mt-1">HANDS-OFF PROJECT SCHEDULING & CLEARANCE</h3>
            <p className="text-neutral-400 text-sm mt-3 leading-relaxed max-w-2xl">
              Eliminate manually checking bank transfers, scanning cluttered socials, or drafting legal creative licensing terms over email. Our design handles reservations, client approvals, and initial deposits in one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Side: Before/After */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-6">
              
              <div className="bg-black border-4 border-red-900/50 p-6 space-y-3 relative overflow-hidden">
                <span className="text-[10px] font-mono text-red-400 font-bold bg-red-400/10 border border-red-500/20 px-2 py-0.5 uppercase inline-block font-mono">
                  BEFORE SYSTEM
                </span>
                <h4 className="font-oswald text-xl font-bold text-white uppercase leading-snug">
                  FRAGMENTED SOCIALS & MESSY THREADS
                </h4>
                <ul className="text-neutral-400 text-xs sm:text-sm space-y-2 list-disc pl-4 leading-relaxed font-sans">
                  <li>Compression algorithms degrade highly graded details on global grids.</li>
                  <li>Clients selecting their final favorites via scattered DMs and screenshots.</li>
                  <li>Manually chasing invoices, bank transfers, and creative release contracts.</li>
                </ul>
              </div>

              <div className="bg-black border-4 border-emerald-950 p-6 space-y-3 relative overflow-hidden brutalist-shadow-amber">
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-400/10 border border-emerald-500/20 px-2 py-0.5 uppercase inline-block font-mono">
                  AFTER STAKR SYSTEM
                </span>
                <h4 className="font-oswald text-xl font-bold text-white uppercase leading-snug">
                  THE CONVERGED STUDIO PLATFORM
                </h4>
                <ul className="text-neutral-200 text-xs sm:text-sm space-y-2 list-disc pl-4 leading-relaxed font-sans">
                  <li><strong>Full-Fidelity:</strong> High-density, serverless CDN delivery with raw metadata preserved.</li>
                  <li><strong>Proofing Hub:</strong> Secure dashboards where agencies pin and comment on target exposures.</li>
                  <li><strong>Instant Booking:</strong> Auto-generated agreements and pricing clearance upon confirmation.</li>
                </ul>
              </div>

            </div>

            {/* Right Side: Interactive Booking Tracker */}
            <div className="lg:col-span-6 bg-black border-4 border-white p-6 sm:p-8 flex flex-col justify-between relative brutalist-shadow-amber">
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b-2 border-neutral-900 pb-4">
                  <div>
                    <h4 className="font-oswald text-lg font-bold text-white uppercase flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-[#EAB308] shrink-0" />
                      LIVE STUDIO PIPELINE SIMULATOR
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-mono mt-1">Simulate Real-Time Client Booking Flow</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-neutral-500 font-mono uppercase">Total Simulated Billings</p>
                    <p className="text-sm font-oswald text-[#EAB308] font-bold">₦{totalSimulatedCapital.toLocaleString()}</p>
                  </div>
                </div>

                {/* Simulated Ledger Records list */}
                <div className="space-y-3 pt-2">
                  {simulatedMembers.map((member) => (
                    <div 
                      key={member.id} 
                      className="bg-[#121214] border-2 border-neutral-900 p-3.5 flex justify-between items-center text-xs animate-fade-in"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-white flex items-center gap-1.5 font-oswald text-sm">
                          <Users className="h-3.5 w-3.5 text-[#EAB308]" />
                          {member.name}
                        </p>
                        <p className="text-[10px] text-neutral-500 font-mono">{member.plan} • {member.time}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[#EAB308] font-mono font-bold block">{member.amount}</span>
                        <span className="inline-block text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 uppercase font-black tracking-wider">
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t-2 border-neutral-900 mt-6 lg:mt-0">
                <button
                  type="button"
                  onClick={addSimulatedSignUp}
                  className="w-full bg-[#EAB308] hover:bg-white text-black font-black font-mono uppercase tracking-wider text-xs py-3.5 px-4 border-2 border-black hover:scale-[1.01] transform transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-black animate-spin" />
                  SIMULATE NEW INQUIRY & BOOKING 🚀
                </button>
                <p className="text-[10px] text-neutral-400 text-center mt-3 font-mono">
                  Click to simulate a premium brand booking a shoot. See how the dashboard instantly logs the campaign and updates the financial records live!
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 6. COUTURE PACKAGES & PRICING (EXACT LAYOUT FROM THE IMAGE DETAILED PROMPT) */}
        <section id="packages-pricing" className="mb-20 sm:mb-28">
          <div className="mb-10 text-left">
            <span className="text-xs font-mono tracking-widest text-[#EAB308] font-bold uppercase">05. COLLECTION PACKAGES</span>
            <h3 className="font-oswald text-4xl sm:text-7xl font-black uppercase text-white mt-1">SELECT YOUR BASE PACKAGE</h3>
            <p className="text-neutral-400 text-sm mt-3 leading-relaxed max-w-2xl">
              Choose the base package that corresponds to your creative and business needs. You can layer custom features on top in the next section.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {Object.values(tiers).map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id as 'base' | 'standard' | 'elite')}
                  className={`bg-black border-4 transition-all duration-300 p-8 flex flex-col justify-between cursor-pointer relative select-none rounded-none ${
                    isSelected
                      ? 'border-[#EAB308] brutalist-shadow-amber scale-[1.02] z-10'
                      : 'border-white hover:border-[#EAB308] hover:scale-[1.01]'
                  }`}
                >
                  {/* Floating Selection Label */}
                  {isSelected && (
                    <div className="absolute -top-[18px] left-6 bg-[#EAB308] text-black text-[10px] font-mono tracking-widest px-3 py-1 font-black uppercase border-2 border-black z-20">
                      ACTIVE SELECTION
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Unique layout for Tier 03 with "Highly Recommended" section */}
                    {tier.id === 'elite' && (
                      <div className="border border-[#EAB308]/40 p-3.5 bg-neutral-950 text-[#EAB308] flex items-start gap-2.5">
                        <Sparkles className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                        <p className="text-[10px] font-mono font-black uppercase leading-relaxed tracking-wider">
                          HIGHLY RECOMMENDED — YOU'LL BE THE FIRST PHOTOGRAPHER IN NIGERIA TO OWN A WEBSITE LIKE THIS
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest font-black">
                        {tier.tierNumber}
                      </p>
                      <h3 className="font-oswald text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none mt-2">
                        {tier.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans min-h-[70px]">
                      {tier.description}
                    </p>

                    {/* Timeline and Base Investment section formatted exactly as image */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t-2 border-neutral-900">
                      <div>
                        <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-widest font-bold">EST. TIMELINE</p>
                        <p className="font-oswald text-xl sm:text-2xl font-black text-white uppercase mt-1">{tier.days} DAYS</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-widest font-bold">BASE INVESTMENT</p>
                        <p className="font-oswald text-xl sm:text-2xl font-black text-[#EAB308] mt-1">₦{tier.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Button at the bottom of each tier card */}
                  <div className="mt-8 pt-4 border-t border-neutral-900">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDeliverableModal(tier.id);
                      }}
                      className={`w-full text-center py-3 px-4 border-2 font-mono uppercase tracking-wider text-[11px] font-black transition-all ${
                        isSelected 
                          ? 'bg-[#EAB308] border-black text-black hover:bg-white' 
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-white hover:text-white'
                      }`}
                    >
                      VIEW GRANULAR DELIVERABLES →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* INTERACTIVE WORKSPACE CUSTOMIZATION ENGINES */}
        <section id="addons-customizer" className="mb-20 sm:mb-28">
          <div className="bg-black border-4 border-white p-6 sm:p-10 brutalist-shadow-white rounded-none">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b-2 border-neutral-900 mb-8">
              <div>
                <span className="text-xs font-mono text-[#EAB308] font-bold uppercase">INTERACTIVE CUSTOMIZER</span>
                <h3 className="font-oswald text-3xl font-black text-white uppercase mt-1">INTEGRATE ADVANCED SUITE MODULATORS</h3>
                <p className="text-xs text-neutral-400 mt-1 font-sans">Toggle custom integrations to dynamically customize building specifications, visual pipelines, and overall delivery timing.</p>
              </div>
              <div className="bg-[#EAB308] text-black font-mono text-[10px] uppercase font-black tracking-widest py-1.5 px-3 border-2 border-black shrink-0">
                ACTIVE ADDONS: {activeAddonsCount}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {addonsList.map(item => {
                const isSelected = selectedAddons[item.id] || false;
                return (
                  <div 
                    key={item.id}
                    onClick={() => handleToggleAddon(item.id)}
                    className={`p-5 border-4 transition-all duration-150 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none ${
                      isSelected 
                        ? 'border-[#EAB308] bg-[#121214] shadow-[4px_4px_0px_0px_#EAB308]' 
                        : 'border-neutral-900 bg-black hover:bg-neutral-900 hover:border-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <div className={`h-6 w-6 rounded-none border-2 border-black flex items-center justify-center ${
                          isSelected ? 'bg-[#EAB308] text-black' : 'bg-black border-neutral-700'
                        }`}>
                          {isSelected && <Check className="h-4 w-4 stroke-[4]" />}
                        </div>
                        <h4 className="font-oswald text-lg font-black text-white uppercase tracking-wider">{item.title}</h4>
                      </div>
                      <p className="text-xs text-neutral-400 pl-9 leading-relaxed max-w-2xl font-sans">{item.description}</p>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0 pl-9 sm:pl-0">
                      <span className="text-[#EAB308] font-oswald text-xl font-black">+${item.price}</span>
                      <p className="text-[9px] text-neutral-500 font-mono tracking-widest uppercase font-black">+{item.days} DAYS TO DEPLOY</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. THE CONTRACT LOCK / SUMMARY SECTION */}
        <section id="cta-box-point" className="cta-trigger-section">
          <h2 className="font-oswald text-3xl sm:text-4xl font-black uppercase text-white mb-8">
            03. <span className="text-[#EAB308]">SECURE DEVELOPMENT BLUEPRINT</span>
          </h2>

          <div className="cta-box-anim bg-[#EAB308] border-4 border-white p-8 sm:p-14 text-black relative brutalist-shadow-white rounded-none">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-xl text-left">
                <span className="inline-block bg-black text-[#EAB308] text-xs font-black tracking-widest px-3 py-1 uppercase font-mono border-2 border-black">
                  TIMELINE & INVESTMENT RECAP
                </span>
                <h3 className="font-oswald text-3xl sm:text-5xl font-black uppercase text-neutral-950 leading-none">
                  SECURE YOUR PRODUCTION COMPILATION
                </h3>
                <p className="text-neutral-900 text-sm font-semibold leading-relaxed font-sans">
                  The STAKR dev pipelines will initiate within 24 hours of authorized agreement. Securing reserves our production sprint and secures current specialized campaign modules.
                </p>
                
                <div className="space-y-2 text-xs font-mono text-neutral-900 font-bold pt-4 border-t border-black/10">
                  <p className="flex items-center gap-2">
                    <span>✔</span>
                    <span>Lossless uncompressed portfolio setup tailored specifically for {brandName}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>✔</span>
                    <span>Serverless CDN dynamic edge assets hosting configuration</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>✔</span>
                    <span>Base package selected: {tiers[selectedTier].name}</span>
                  </p>
                  {Object.keys(selectedAddons).filter(k => selectedAddons[k]).map(key => {
                    const addonItem = addonsList.find(a => a.id === key);
                    return (
                      <p key={key} className="flex items-center gap-2 text-neutral-950 pl-4">
                        <span>✦</span>
                        <span>Extra: {addonItem?.title} (+{addonItem?.days} Days)</span>
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Investment Block */}
              <div className="bg-black p-6 sm:p-8 border-4 border-black text-center text-white w-full lg:max-w-xs space-y-6 brutalist-shadow-white">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b-2 border-neutral-800">
                  <div>
                    <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase font-black">DAYS TO DEPLOY</p>
                    <p className="text-lg sm:text-xl font-black text-[#EAB308] mt-1 uppercase font-oswald">{currentTimeline} DAYS</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase font-black">TOTAL VALUE</p>
                    <p className="text-lg sm:text-xl font-black text-white mt-1 font-oswald">{currentPriceText}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    id="lock-btn-interactive"
                    onClick={() => {
                      if (isAccepted) {
                        alert('This proposal has already been digitally signed! 🦾');
                      } else {
                        setIsSignModalOpen(true);
                      }
                    }}
                    className="w-full bg-[#EAB308] hover:bg-white text-black font-black text-xs tracking-widest uppercase py-4 px-6 border-2 border-black transform active:scale-95 transition-all cursor-pointer font-mono font-bold"
                  >
                    {isAccepted ? 'BLUEPRINTS CONFIRMED ✓' : 'SECURE THIS PLAN 🚀'}
                  </button>
                  <p className="text-[9px] text-neutral-500 font-mono">Quoted prices reserved for 14 days</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Footer info line */}
        <footer className="mt-20 text-center text-[11px] text-neutral-500 font-mono border-t-2 border-neutral-900 pt-8 space-y-2">
          <p>OBISOMTO DIGITAL STUDIO PROPOSAL 2026 // STAKR MULTIMEDIA ARCHITECTURE</p>
          <p className="text-neutral-600">Select &quot;Get Standalone Code&quot; in the header above to download or copy the responsive static layout instantly.</p>
        </footer>

      </div>

      {/* Authorized Signature Modal Pop */}
      {isSignModalOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-black border-4 border-[#EAB308] w-full max-w-md rounded-none overflow-hidden shadow-2xl relative p-6 space-y-5">
            
            <button 
              onClick={() => setIsSignModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-[#EAB308] transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <form onSubmit={submitSignature} className="space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex bg-[#EAB308] text-black p-3 border-2 border-black mb-3">
                  <Edit3 className="h-6 w-6" />
                </div>
                <h3 className="font-oswald text-2xl font-black text-white uppercase tracking-wider">AUTHORIZE PROPOSAL</h3>
                <p className="text-xs text-neutral-400">Locking this proposal reserves your dedicated development pipeline</p>
              </div>

              <div className="space-y-4 pt-3">
                <div className="space-y-2">
                  <label htmlFor="client-name-input" className="text-xs font-mono text-neutral-400 block uppercase tracking-wide">Client Authorized Signee</label>
                  <input 
                    id="client-name-input"
                    required
                    type="text" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Somto Obi" 
                    className="w-full bg-[#121214] border-2 border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#EAB308] transition-colors placeholder-neutral-700 font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email-input" className="text-xs font-mono text-neutral-400 block uppercase tracking-wide">Contact Email Address</label>
                  <input 
                    id="contact-email-input"
                    required
                    type="email" 
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. contact@obisomto.com" 
                    className="w-full bg-[#121214] border-2 border-neutral-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#EAB308] transition-colors placeholder-neutral-700 font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="sig-verify-input" className="text-xs font-mono text-[#EAB308] block uppercase tracking-widest font-bold">Write Your Digital Signature</label>
                  <input 
                    id="sig-verify-input"
                    required
                    type="text" 
                    value={signatureText}
                    onChange={(e) => setSignatureText(e.target.value)}
                    placeholder="Type Somto Obi to authenticate..." 
                    className="w-full bg-[#121214] border-2 border-neutral-800 px-4 py-3 text-sm text-[#EAB308] italic font-mono focus:outline-none focus:border-[#EAB308] transition-colors placeholder-neutral-700 tracking-widest font-black"
                  />
                  <p className="text-[10px] text-neutral-500 pl-1 font-mono">Signing confirms authorized development activation.</p>
                </div>
              </div>

              <div className="bg-[#121214] p-4 border-2 border-neutral-800 space-y-1.5 text-xs text-neutral-300 font-mono">
                <p><strong>PROPOSED CONFIGURATION:</strong></p>
                <p className="text-[11px] text-neutral-400">Main Architecture: {tiers[selectedTier].name}</p>
                {Object.keys(selectedAddons).filter(k => selectedAddons[k]).map(key => {
                  const addonItem = addonsList.find(a => a.id === key);
                  return <p key={key} className="text-[11px] text-neutral-400">+ {addonItem?.title}: ${addonItem?.price}</p>;
                })}
                <p className="pt-2 border-t-2 border-neutral-800 font-bold text-white flex justify-between font-bold">
                  <span>TOTAL ESTIMATED:</span>
                  <span className="text-[#EAB308]">{currentPriceText}</span>
                </p>
              </div>

              <div className="flex gap-4 pt-3">
                <button 
                  type="button" 
                  onClick={() => setIsSignModalOpen(false)}
                  className="w-1/2 bg-neutral-900 border-2 border-neutral-800 hover:bg-neutral-800 text-neutral-300 py-3 uppercase text-xs font-black tracking-widest cursor-pointer font-mono"
                >
                  CANCEL
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 bg-[#EAB308] text-black py-3 uppercase text-xs font-black tracking-widest hover:bg-white transition-colors cursor-pointer font-mono border-2 border-black"
                >
                  SIGN & DEPLOY 🖋️
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Granular Deliverables Modal for individual plans */}
      {activeDeliverableModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-black border-4 border-white w-full max-w-lg rounded-none overflow-hidden shadow-2xl relative p-6 space-y-5 brutalist-shadow-amber">
            
            <button 
              onClick={() => setActiveDeliverableModal(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-[#EAB308] transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="space-y-2 border-b-2 border-neutral-900 pb-4">
              <span className="text-xs font-mono text-[#EAB308] uppercase tracking-widest font-black">
                {tiers[activeDeliverableModal as 'base' | 'standard' | 'elite'].tierNumber} GRANULAR BLUEPRINT
              </span>
              <h3 className="font-oswald text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                {tiers[activeDeliverableModal as 'base' | 'standard' | 'elite'].name}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                {tiers[activeDeliverableModal as 'base' | 'standard' | 'elite'].description}
              </p>
            </div>

            <div className="space-y-3 py-2">
              <p className="text-xs font-mono text-[#EAB308] uppercase tracking-wider font-bold">[ INCLUDED DELIVERABLES ]</p>
              <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                {tiers[activeDeliverableModal as 'base' | 'standard' | 'elite'].deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-[#121214] p-3 border border-neutral-800 text-xs text-neutral-200">
                    <span className="text-[#EAB308] font-black">✔</span>
                    <span className="font-sans leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-neutral-900 pt-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
              <div>
                <p className="text-[9px] text-neutral-500 font-mono uppercase font-bold">BASE INVESTMENT</p>
                <p className="font-oswald text-xl font-black text-[#EAB308]">
                  ₦{tiers[activeDeliverableModal as 'base' | 'standard' | 'elite'].price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedTier(activeDeliverableModal as 'base' | 'standard' | 'elite');
                  setActiveDeliverableModal(null);
                }}
                className="bg-[#EAB308] hover:bg-white text-black font-black font-mono uppercase tracking-widest text-[11px] py-3 px-6 border-2 border-black active:scale-95 transition-all text-center"
              >
                SELECT THIS ARCHITECTURE
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
