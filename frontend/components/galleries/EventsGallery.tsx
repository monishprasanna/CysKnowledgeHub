import React, { useState } from 'react';
import { Calendar, ChevronUp, MapPin, Image as ImageIcon } from 'lucide-react';

interface EventData {
    id: string;
    title: string;
    date: string;
    location: string;
    shortDesc: string;
    fullDesc: string;
    images: string[];
}

const DUMMY_EVENTS: EventData[] = [
    {
        id: 'e1',
        title: 'CyberShield Annual Hackathon 2025',
        date: 'October 15, 2025',
        location: 'Main Auditorium',
        shortDesc: 'A rigorous 48-hour continuous hackathon focusing on cybersecurity threat mitigation and zero-day patch prototyping.',
        fullDesc: 'The CyberShield Annual Hackathon brought together over 200 passionate under-graduates, developers, and security enthusiasts. Teams competed over an intense 48-hour sprint to build innovative security tools, reverse-engineer malware samples, and patch simulated zero-day vulnerabilities in a high-pressure environment. Renowned industry mentors from crowd-strike and various tech leaders were present during the hackathon offering valuable insights. The grand event concluded with an exhilarating prize distribution ceremony and internship opportunities for the top performers.',
        images: Array.from({ length: 7 }).map((_, i) => `https://picsum.photos/seed/cs-hackathon-${i}/800/600`)
    },
    {
        id: 'e2',
        title: 'Guest Lecture: The Future of Cloud Security',
        date: 'September 2, 2025',
        location: 'Tech Hall B / Virtual',
        shortDesc: 'An insightful session led by AWS Security Leads discussing the rapidly evolving landscape of cloud infrastructure protection.',
        fullDesc: 'This hybrid session explored the modern challenges of protecting massive cloud workload operations. The speakers deeply explored the principles of the Shared Responsibility Model, the rising trend of misconfiguration exploits in S3 buckets, and how fully automated remediation pipelines are becoming standard industry practice. Over 150 students actively engaged in a Q&A session where real-world high-profile cloud breach case studies were thoroughly analyzed and dissected.',
        images: Array.from({ length: 5 }).map((_, i) => `https://picsum.photos/seed/cs-cloudsec-${i}/800/600`)
    },
    {
        id: 'e3',
        title: 'Department Induction & Orientation Ceremony',
        date: 'August 10, 2025',
        location: 'Campus Front Lawn',
        shortDesc: 'The official orientation and welcoming ceremony for the enthusiastic incoming batch of cybersecurity freshmen.',
        fullDesc: 'Kicking off the new academic season with high spirits, the faculty members alongside the senior student council hosted a grand induction completely dedicated to our freshmen. The newcomers were given comprehensive tours of the specialized cybersecurity laboratories, introduced to active research pods, and recruited into our flagship CTF team. The evening culminated in a vibrant networking mixer designed specifically to foster community feeling and integrate newcomers seamlessly into the CyberShield mentorship structure.',
        images: Array.from({ length: 8 }).map((_, i) => `https://picsum.photos/seed/cs-induction-${i}/800/600`)
    },
    {
        id: 'e4',
        title: 'Live Red Team vs Blue Team Network Simulation',
        date: 'April 22, 2025',
        location: 'Advanced Cyber Operations Lab',
        shortDesc: 'An intense, practical 12-hour live network attack and active-defense simulation drill.',
        fullDesc: 'Participants were strategically split into Red (Offensive Attackers) and Blue (Defensive Responders) teams within a completely isolated sandbox network environment. The Red team was tasked precisely to exploit misconfigurations in the simulated enterprise active directory to deploy mock ransomware. Simultaneously, the Blue team was challenged to master SIEM dashboard metrics to proactively detect anomalous signals, contain the outbreak, and eradicate the lateral movement in real time. An incredibly chaotic yet extremely educational drill testing practical stamina under strict deadlines.',
        images: Array.from({ length: 6 }).map((_, i) => `https://picsum.photos/seed/cs-redblue-${i}/800/600`)
    }
];

const EventCard = ({ event, index }: { event: EventData; index: number }) => {
    const [expanded, setExpanded] = useState(false);
    const isEven = index % 2 === 0;

    return (
        <div className={`mb-16 md:mb-24 flex justify-between items-start w-full relative ${isEven ? 'md:flex-row-reverse' : ''}`}>

            {/* Desktop spacer to force content to one side */}
            <div className="hidden md:block w-5/12"></div>

            {/* Timeline Dot (Absolute Center on Desktop, Left on Mobile) */}
            <div className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full bg-gray-900 border-[3px] border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] z-20 flex items-center justify-center mt-8">
                <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
            </div>

            {/* Card Content Wrapper */}
            <div className={`w-full md:w-5/12 pl-20 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                <div
                    className={`bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group shadow-lg flex flex-col ${expanded ? 'shadow-[0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30 bg-gray-900' : ''}`}
                >
                    {/* Header Info */}
                    <div className="p-6 md:p-8 cursor-pointer" onClick={() => setExpanded(!expanded)}>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-cyan-500 font-bold uppercase tracking-wider mb-4">
                            <span className="flex items-center gap-1.5 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                                <Calendar className="w-3.5 h-3.5" /> {event.date}
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-400 bg-gray-800/50 px-3 py-1.5 rounded-lg border border-gray-700/50">
                                <MapPin className="w-3.5 h-3.5" /> {event.location}
                            </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-white group-hover:text-cyan-400 transition-colors leading-tight">{event.title}</h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">{event.shortDesc}</p>

                        <div className="flex items-center justify-between">
                            <button
                                onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                                className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors py-2 px-4 rounded-full bg-cyan-950/30 hover:bg-cyan-900/50 border border-cyan-500/20"
                            >
                                {expanded ? (
                                    <><ChevronUp className="w-4 h-4" /> Collapse Details</>
                                ) : (
                                    <><ImageIcon className="w-4 h-4" /> View Gallery</>
                                )}
                            </button>

                            {/* Optional metric or icons could go here */}
                            {!expanded && (
                                <div className="flex -space-x-2 overflow-hidden opacity-60">
                                    {event.images.slice(0, 3).map((img, i) => (
                                        <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-900" src={img} alt="" />
                                    ))}
                                    {event.images.length > 3 && (
                                        <div className="flex bg-gray-800 h-8 w-8 items-center justify-center rounded-full ring-2 ring-gray-900 text-[10px] font-bold text-gray-400">
                                            +{event.images.length - 3}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Revealable Detailed Content & Images Grid */}
                    <div className={`transition-all duration-700 ease-in-out ${expanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <div className="p-6 md:p-8 pt-0 border-t border-gray-800/60 mt-2 bg-gradient-to-b from-gray-900 to-black/40">
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 pt-6">
                                {event.fullDesc}
                            </p>

                            {/* Dynamic Masonry-ish Image Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                                {event.images.map((img, i) => (
                                    <div
                                        key={i}
                                        className={`relative rounded-2xl overflow-hidden group/img bg-gray-800 
                      ${i === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-[4/3]' : 'aspect-square'}
                      ${i === 3 && event.images.length > 5 ? 'col-span-2 aspect-[2/1]' : ''}
                    `}
                                    >
                                        <img
                                            src={img}
                                            alt={`Event highlight ${i + 1}`}
                                            className="w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-700 ease-in-out cursor-pointer"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const EventsGallery: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            {/* Header Section */}
            <div className="text-center mb-20 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                    Event <span className="text-cyan-500">Timeline</span>
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    A visual journey through the monumental milestones, hackathons, and gatherings organized by the CyberShield community.
                </p>
            </div>

            {/* Timeline Wrapper */}
            <div className="relative pt-10">
                {/* The Central Line */}
                <div className="absolute left-[39px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 z-0"></div>

                {/* Events Feed */}
                <div className="relative z-10">
                    {DUMMY_EVENTS.map((event, i) => (
                        <EventCard key={event.id} event={event} index={i} />
                    ))}
                </div>
            </div>

            {/* Footer prompt */}
            <div className="mt-20 text-center flex flex-col items-center justify-center space-y-4 opacity-70">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
                <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">End of Timeline</p>
            </div>
        </div>
    );
};

export default EventsGallery;
