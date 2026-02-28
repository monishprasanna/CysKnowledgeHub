import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, ChevronRight, Book, Users, Trophy, Play } from 'lucide-react';

interface EventData {
    id: string;
    title: string;
    subtitle?: string;
    date: string;
    category: 'academic' | 'social' | 'sports';
    location: string;
    time?: string;
    details?: string;
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
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    { id: 'e3', title: 'CAREER FAIR', date: 'OCT 12, 2024', category: 'academic', location: 'Tech Hall A', subtitle: 'NETWORKING', details: 'Connect with industry top leaders.' },
    { id: 'e10', title: 'SPORTS MEET', date: 'MAR 20-22, 2025', category: 'sports', location: 'University Stadium', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80' },
    { id: 'e4', title: 'HOMECOMING PARADE', date: 'OCT 25, 2024', category: 'social', location: 'University Avenue' },
    { id: 'e9', title: 'HACKATHON', date: 'MAR 5, 2025', category: 'academic', location: 'Innovation Hub', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80' },
    { id: 'e5', title: 'CLUB FESTIVAL', date: 'NOV 8, 2024', category: 'sports', location: 'Student Union' },
    { id: 'e2', title: 'CAMPUS TOUR', date: 'SEPT 10, 2024', category: 'social', location: 'Campus Grounds' },
    { id: 'e6', title: 'MIDTERM STUDIES', date: 'DEC 10, 2024', category: 'academic', location: 'Library' },
    { id: 'e7', title: 'WINTER GALA', date: 'DEC 15, 2024', category: 'social', location: 'Grand Ballroom' },
];

const EventHorizontalCard = ({ event, index }: { event: EventData, index: number }) => {
    const getCategoryStyles = () => {
        switch (event.category) {
            case 'academic': return { color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', hover: 'group-hover:bg-cyan-500/10', icon: <Book className="w-5 h-5" /> };
            case 'social': return { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', hover: 'group-hover:bg-amber-500/10', icon: <Users className="w-5 h-5" /> };
            case 'sports': return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', hover: 'group-hover:bg-emerald-500/10', icon: <Trophy className="w-5 h-5" /> };
        }
    };

    const style = getCategoryStyles();
    const isLarge = index === 0;

    return (
        <div className={`
      relative group cursor-pointer 
      ${isLarge ? 'md:col-span-12' : 'md:col-span-12 lg:col-span-6 xl:col-span-12'}
      w-full overflow-hidden transition-all duration-500 border-b border-white/5 hover:border-white/20
    `}>
            {/* Horizontal Strip Layout */}
            <div className={`
        flex flex-col md:flex-row items-center justify-between p-4 md:p-6 lg:p-8 
        bg-gradient-to-r from-transparent via-[#0f1423]/50 to-transparent backdrop-blur-md
        ${style.hover} transition-colors duration-500 gap-6 md:gap-12
      `}>

                {/* Rank/Number or Icon (Leftmost) */}
                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-white/5 shrink-0 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                    <span className={style.color}>{style.icon}</span>
                </div>

                {/* Core Info (Title & Meta) */}
                <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${style.color} px-2 py-0.5 rounded-sm border ${style.border} bg-black/40`}>
                            {event.category}
                        </span>
                        {event.subtitle && (
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-500 hidden sm:block truncate">
                                {event.subtitle}
                            </span>
                        )}
                    </div>
                    <h3 className={`font-black uppercase text-white tracking-widest leading-none mb-3 truncate transition-all duration-300
               ${isLarge ? 'text-3xl sm:text-4xl md:text-5xl group-hover:text-cyan-400' : 'text-xl sm:text-2xl group-hover:text-white/80'}
             `}>
                        {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{event.date}</span>
                        {event.time && <span className="flex items-center gap-1.5 hidden sm:flex"><Clock className="w-3.5 h-3.5" />{event.time}</span>}
                        <span className="flex items-center gap-1.5 min-w-0"><MapPin className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{event.location}</span></span>
                    </div>
                </div>

                {/* Optional Right Side Image & CTA */}
                <div className="flex items-center gap-6 shrink-0 ml-auto w-full md:w-auto">
                    {event.image && (
                        <div className="hidden xl:block w-48 h-24 rounded-lg overflow-hidden border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                    )}

                    {/* Circular Action Button */}
                    <div className="w-full md:w-auto flex items-center justify-between md:justify-end border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                        <div className="md:hidden text-[10px] font-bold uppercase tracking-widest text-gray-500">View Details</div>
                        <div className={`
                    w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border transition-all duration-500
                    ${style.border} ${style.color} group-hover:bg-white group-hover:border-white group-hover:text-black
                 `}>
                            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EventsGallery: React.FC = () => {
    const [stars, setStars] = useState<{ id: number, x: number, y: number, s: number, o: number }[]>([]);

    useEffect(() => {
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
                {/* Soft radial gradients to give depth to the dark navy */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[150px]" />
                <div className="absolute top-1/2 left-0 w-[40vw] h-[40vw] bg-cyan-900/10 rounded-full blur-[120px] -translate-y-1/2" />
            </div>

            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-8 py-12 lg:py-16 flex flex-col min-h-screen">

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

                {/* 3. New Design: Ultra-wide "Lineup Strip" Gallery View */}
                {/* This completely shifts away from boxes to a fluid, full-width scrolling playlist table aesthetic often used in premium festival/university catalogs. */}
                <div className="flex-1 w-full relative z-10 mb-24 border-t border-white/10 pt-4">

                    <div className="flex items-center justify-between px-6 pb-6 border-b border-white/5 mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 hidden md:flex">
                        <div className="w-16">Icon</div>
                        <div className="flex-1">Event details</div>
                        <div className="mr-8">Preview</div>
                        <div>Action</div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 md:gap-0">
                        {EVENTS.map((event, idx) => (
                            <EventHorizontalCard key={event.id} event={event} index={idx} />
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="mt-12 flex justify-center">
                        <button className="px-8 py-4 border border-white/10 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center gap-3 group">
                            Load More Events <Play className="w-3 h-3 group-hover:text-cyan-400" fill="currentColor" />
                        </button>
                    </div>
                </div>

                {/* 4. Bottom Footer Elements */}
                <footer className="w-full flex flex-col items-center text-center pb-8 pt-12 z-10 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-gray-400 mb-8 px-6 py-3 rounded-full hover:text-white transition-colors cursor-pointer group">
                        <MapPin className="w-4 h-4 text-cyan-400 group-hover:animate-bounce" />
                        <span className="tracking-widest uppercase font-bold text-white/80 group-hover:text-white">Central Campus Coordinate: <span className="font-medium text-cyan-400">40°42'46"N 74°00'21"W</span></span>
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
