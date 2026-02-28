import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, ChevronRight, Book, Users, Trophy, Star, ArrowUpRight } from 'lucide-react';

interface EventData {
    id: string;
    title: string;
    subtitle?: string;
    date: string;
    category: 'academic' | 'social' | 'sports';
    location: string;
    time?: string;
    details?: string;
    isMain?: boolean;
    span?: 'col-span-1 row-span-1' | 'col-span-2 row-span-2' | 'col-span-2 row-span-1' | 'col-span-1 row-span-2';
    image?: string;
}

const EVENTS: EventData[] = [
    {
        id: 'e-main',
        title: 'SPRING MUSIC FESTIVAL',
        subtitle: 'WINDING QUAD',
        date: 'APRIL 18-19, 2025',
        time: '6 PM - MIDNIGHT',
        category: 'social',
        location: 'STUDENT UNION LAWN',
        details: 'The biggest event of the year! Enjoy live music across 3 stages, food trucks, and a vibrant festival night under the open sky.',
        isMain: true,
        span: 'col-span-2 row-span-2',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'e3', title: 'CAREER FAIR', date: 'OCT 12, 2024', category: 'academic', location: 'Tech Hall A',
        span: 'col-span-2 row-span-1', subtitle: 'NETWORKING',
        details: 'Connect with industry leading tech companies.'
    },
    {
        id: 'e1', title: 'FRESHMAN WELCOME', date: 'SEPT 5, 2024', category: 'academic', location: 'Main Auditorium',
        span: 'col-span-1 row-span-1'
    },
    {
        id: 'e5', title: 'CLUB FESTIVAL', date: 'NOV 8, 2024', category: 'sports', location: 'Student Union',
        span: 'col-span-1 row-span-1'
    },
    {
        id: 'e10', title: 'SPORTS MEET', date: 'MAR 20-22, 2025', category: 'sports', location: 'University Stadium',
        span: 'col-span-1 row-span-2',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'e4', title: 'HOMECOMING PARADE', date: 'OCT 25, 2024', category: 'social', location: 'University Avenue',
        span: 'col-span-2 row-span-1'
    },
    {
        id: 'e6', title: 'MIDTERM STUDIES', date: 'DEC 10, 2024', category: 'academic', location: 'Library',
        span: 'col-span-1 row-span-1'
    },
    {
        id: 'e2', title: 'CAMPUS TOUR', date: 'SEPT 10, 2024', category: 'social', location: 'Campus Grounds',
        span: 'col-span-1 row-span-1'
    },
    { id: 'e7', title: 'WINTER GALA', date: 'DEC 15, 2024', category: 'social', location: 'Grand Ballroom', span: 'col-span-1 row-span-1' },
    { id: 'e8', title: 'SPRING OPEN DAY', date: 'FEB 10, 2025', category: 'academic', location: 'Central Quad', span: 'col-span-1 row-span-1' },
    { id: 'e9', title: 'HACKATHON', date: 'MAR 5, 2025', category: 'academic', location: 'Innovation Hub', span: 'col-span-2 row-span-1' },
];

const EventBentoCard = ({ event }: { event: EventData }) => {
    const getCategoryStyles = () => {
        switch (event.category) {
            case 'academic': return { color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', glow: 'group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]', icon: <Book className="w-4 h-4" /> };
            case 'social': return { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', glow: 'group-hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]', icon: <Users className="w-4 h-4" /> };
            case 'sports': return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', glow: 'group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]', icon: <Trophy className="w-4 h-4" /> };
        }
    };

    const style = getCategoryStyles();
    const isLarge = event.span?.includes('row-span-2') || event.span?.includes('col-span-2');

    return (
        <div className={`
      relative group cursor-pointer rounded-3xl overflow-hidden
      bg-gradient-to-br from-[#121629]/90 to-[#0A0C14]/90 backdrop-blur-xl border border-white/5
      transition-all duration-500 hover:-translate-y-1 hover:border-white/20
      ${style.glow}
      ${event.span || 'col-span-1 row-span-1'}
      flex flex-col justify-between
    `}>
            {/* Background Image Effect for certain cards */}
            {event.image && (
                <>
                    <div className="absolute inset-0 z-0">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700 group-hover:scale-105" />
                    </div>
                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0A0C14] via-[#0A0C14]/80 to-transparent"></div>
                </>
            )}

            {/* Card Header Content */}
            <div className="relative z-10 p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className={`px-3 py-1.5 rounded-full ${style.bg} ${style.border} border backdrop-blur-md flex items-center gap-2 w-max`}>
                        <span className={style.color}>{style.icon}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${style.color}`}>
                            {event.category}
                        </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors duration-300" />
                </div>

                <div className="mt-auto">
                    {event.subtitle && (
                        <p className={`text-[10px] font-bold tracking-[0.2em] mb-2 uppercase opacity-80 ${style.color}`}>
                            {event.subtitle}
                        </p>
                    )}
                    <h3 className={`font-black text-white tracking-wide uppercase leading-tight ${isLarge ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'} mb-3 drop-shadow-lg`} style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                        {event.title}
                    </h3>

                    {(event.details && isLarge) && (
                        <p className="text-xs md:text-sm text-gray-300 mb-6 max-w-md leading-relaxed line-clamp-2 md:line-clamp-3">
                            {event.details}
                        </p>
                    )}
                </div>
            </div>

            {/* Card Footer Details */}
            <div className="relative z-10 px-6 py-5 border-t border-white/5 bg-white/[0.02] flex flex-wrap items-center justify-between gap-4 group-hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-300 tracking-wider uppercase">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.date}
                    </div>
                    {event.time && (
                        <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-gray-400 tracking-wider">
                            <Clock className="w-3.5 h-3.5" />
                            {event.time}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate max-w-[120px]">{event.location}</span>
                </div>
            </div>
        </div>
    );
};

const EventsGallery: React.FC = () => {
    const [stars, setStars] = useState<{ id: number, x: number, y: number, s: number, o: number }[]>([]);

    useEffect(() => {
        // Generate static stars for the background
        const newStars = Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            s: Math.random() * 2 + 1,
            o: Math.random() * 0.5 + 0.1
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="min-h-screen w-full bg-[#080B14] text-white relative font-sans selection:bg-cyan-500/30">

            {/* 1. Starry Night Constellation Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {stars.map(star => (
                    <div
                        key={star.id}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.s}px`,
                            height: `${star.s}px`,
                            opacity: star.o,
                        }}
                    />
                ))}
                {/* Soft radial gradients to give depth to the dark navy without making it too bright */}
                <div className="absolute top-0 left-[10%] w-[50vw] h-[50vw] bg-cyan-900/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-amber-900/5 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-12 lg:py-16 flex flex-col min-h-screen">

                {/* 2. EXACT Match Top Header Navigation Style */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-16 gap-8">

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-[10px] sm:text-xs font-bold tracking-[0.25em] text-gray-500">
                            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"><div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" /> ACADEMIC</span>
                            <span className="text-gray-700">|</span>
                            <span className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"><div className="w-1.5 h-1.5 bg-amber-400 rounded-full" /> SOCIAL</span>
                            <span className="text-gray-700">|</span>
                            <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> SPORTS</span>
                        </div>

                        <div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-3 uppercase text-white drop-shadow-xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                                Campus Events Constellation
                            </h1>
                            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] md:tracking-[0.4em] text-cyan-500 uppercase">
                                Connect • Engage • Discover • University Life
                            </p>
                        </div>
                    </div>

                    <div className="text-left md:text-right shrink-0">
                        <p className="text-sm font-bold text-gray-500 tracking-widest mb-1.5">2024-2025</p>
                        <p className="text-2xl font-black tracking-widest mb-3 uppercase text-white">SEPT 2024</p>
                        <a href="#timeline" className="text-[10px] font-bold text-cyan-400 tracking-[0.2em] uppercase hover:text-white transition-colors underline underline-offset-8 decoration-cyan-400/40 hover:decoration-cyan-400">
                            Explore the Timeline
                        </a>
                    </div>
                </header>

                {/* 3. New Design: Bento Box Grid Gallery for Events */}
                {/* This replaces the scattered dots with a highly premium, modern, organized grid layout */}
                <div className="flex-1 w-full relative z-10 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[220px]">
                        {EVENTS.map((event) => (
                            <EventBentoCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>

                {/* 4. Bottom Footer Elements */}
                <footer className="w-full flex flex-col items-center text-center pb-8 z-10 border-t border-white/10 pt-12 mt-auto">
                    <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-gray-400 mb-8 px-6 py-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span className="tracking-widest uppercase font-bold text-white">Map Location: <span className="text-gray-400 font-medium">Student Union Lawn</span></span>
                    </div>

                    <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-gray-600 uppercase">
                        CONNECT • ENGAGE • DISCOVER • UNIVERSITY LIFE
                    </p>
                </footer>

            </div>
        </div>
    );
};

export default EventsGallery;
