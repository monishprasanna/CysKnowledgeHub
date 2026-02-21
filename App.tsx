
import React, { useState } from 'react';
import Layout from './components/Layout';
import ChatAssistant from './components/ChatAssistant';
import { MOCK_CONTENT, MOCK_INTERVIEWS, ROADMAPS } from './constants';
import { ContentType, RoadmapData } from './types';
import ProjectsPage from './components/ProjectsPage';
import {
  Terminal, Shield, BookOpen, Map, Award, Briefcase,
  ExternalLink, ArrowRight, User, ChevronRight,
  Code, HardDrive, Search, Clock, ArrowLeft
} from 'lucide-react';

// ─── Roadmap detail page ────────────────────────────────────────────────────

const roleConfig: Record<string, { icon: React.FC<{ className?: string }>, accent: string }> = {
  SOC_ANALYST: { icon: Shield, accent: 'from-cyan-900/30 to-blue-900/20' },
  PENETRATION_TESTER: { icon: Terminal, accent: 'from-emerald-900/20 to-cyan-900/20' },
  GRC_SPECIALIST: { icon: Award, accent: 'from-indigo-900/20 to-cyan-900/20' },
  CLOUD_SECURITY: { icon: HardDrive, accent: 'from-sky-900/20 to-cyan-900/20' },
};

interface RoadmapDetailPageProps {
  roadmap: RoadmapData;
  onBack: () => void;
}

const RoadmapDetailPage: React.FC<RoadmapDetailPageProps> = ({ roadmap, onBack }) => {
  const cfg = roleConfig[roadmap.id] || roleConfig.SOC_ANALYST;
  const Icon = cfg.icon;

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Roadmaps
      </button>

      {/* Header */}
      <div className={`bg-gradient-to-br ${cfg.accent} border border-cyan-500/20 rounded-3xl p-8`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{roadmap.title} Path</h1>
            <p className="text-gray-400 mt-1">{roadmap.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-cyan-400/70 font-medium bg-cyan-900/20 border border-cyan-500/10 rounded-full px-3 py-1 w-fit">
          <Map className="w-3.5 h-3.5" />
          {roadmap.steps.length} stages · Structured learning path
        </div>
      </div>

      {/* Timeline */}
      <div className="relative space-y-0">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-5 bottom-5 w-0.5 bg-gradient-to-b from-cyan-500/60 via-cyan-500/20 to-transparent" />

        {roadmap.steps.map((step, i) => (
          <div key={i} className="relative pl-14 pb-8 last:pb-0">
            {/* Step number circle */}
            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-gray-900 border-2 border-cyan-500 flex items-center justify-center font-bold text-cyan-400 text-sm z-10 shadow-lg shadow-cyan-500/10">
              {i + 1}
            </div>

            {/* Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-200 group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors">{step.title}</h3>
                {step.duration && (
                  <span className="flex items-center gap-1.5 text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    {step.duration}
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{step.description}</p>
              <div className="flex flex-wrap gap-2">
                {step.resources.map(r => (
                  <span
                    key={r}
                    className="text-[11px] bg-cyan-900/30 text-cyan-300 px-2.5 py-1 rounded-full border border-cyan-500/20 font-medium"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main App ────────────────────────────────────────────────────────────────

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeRoadmap, setActiveRoadmap] = useState<string | null>(null);

  const roadmapCards = [
    { id: 'SOC_ANALYST', title: 'SOC Analyst', desc: 'Focus on defensive operations and monitoring.', icon: Shield },
    { id: 'PENETRATION_TESTER', title: 'Penetration Tester', desc: 'Ethical hacking and offensive security.', icon: Terminal },
    { id: 'GRC_SPECIALIST', title: 'GRC Specialist', desc: 'Governance, risk, and compliance.', icon: Award },
    { id: 'CLOUD_SECURITY', title: 'Cloud Security', desc: 'Securing AWS, Azure, and GCP environments.', icon: HardDrive },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-16">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 p-8 md:p-16 text-center">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #06b6d4 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Master the Art of <span className="text-cyan-500 underline decoration-cyan-500/30">Cyber Defense</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                A knowledge vault for cybersecurity enthusiasts. Roadmaps, research, writeups, and experiences from the community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => setActiveTab('roadmaps')} className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-full font-semibold transition-all flex items-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => setActiveTab('ctf')} className="px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full font-semibold transition-all">
                  Browse CTFs
                </button>
              </div>
            </section>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Blogs', count: '45+', icon: BookOpen },
                { label: 'CTF Writeups', count: '120+', icon: Terminal },
                { label: 'Projects', count: '30+', icon: Code },
                { label: 'Placements', count: '85+', icon: Briefcase },
              ].map((stat, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center group hover:border-cyan-500/50 transition-colors">
                  <stat.icon className="w-6 h-6 text-cyan-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold mb-1">{stat.count}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Featured */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Featured Knowledge</h2>
                  <p className="text-gray-400">Hand-picked resources to level up your skills.</p>
                </div>
                <button onClick={() => setActiveTab('blogs')} className="text-cyan-500 font-medium hover:underline flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {MOCK_CONTENT.slice(0, 3).map((item) => (
                  <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:transform hover:-translate-y-1 transition-all">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-400 border border-cyan-500/20">
                          {item.type}
                        </span>
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 line-clamp-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                      <button className="text-sm font-semibold text-cyan-500 hover:text-cyan-400">Read More</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      case 'blogs':
      case 'ctf':
      case 'experiments': {
        const typeMap: Record<string, ContentType> = {
          'blogs': ContentType.BLOG,
          'ctf': ContentType.CTF,
          'experiments': ContentType.EXPERIMENT
        };
        const filtered = MOCK_CONTENT.filter(c => c.type === typeMap[activeTab]);
        return (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold capitalize mb-2">{activeTab}</h1>
                <p className="text-gray-400">Explore our community-driven {activeTab} vault.</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  className="bg-gray-900 border border-gray-800 rounded-full py-2 pl-10 pr-4 w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.length > 0 ? filtered.map((item) => (
                <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-cyan-500" />
                        <span className="text-xs text-gray-400">{item.author}</span>
                      </div>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-6">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map(t => (
                        <span key={t} className="text-[10px] bg-gray-800 text-gray-400 px-2 py-1 rounded">#{t}</span>
                      ))}
                    </div>
                    <button className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-sm transition-colors border border-gray-700">
                      Explore Content
                    </button>
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center">
                  <div className="text-gray-500 mb-2">No items found in this category yet.</div>
                  <button className="text-cyan-500 hover:underline">Contribute your first {activeTab.slice(0, -1)}?</button>
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'projects':
        return <ProjectsPage />;

      case 'roadmaps':
        // Individual roadmap detail view
        if (activeRoadmap && ROADMAPS[activeRoadmap]) {
          return (
            <RoadmapDetailPage
              roadmap={ROADMAPS[activeRoadmap]}
              onBack={() => setActiveRoadmap(null)}
            />
          );
        }

        // Roadmap selection grid
        return (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Cybersecurity Roadmaps</h1>
              <p className="text-gray-400">Step-by-step guides to land your dream role in infosec.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmapCards.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setActiveRoadmap(role.id)}
                  className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-cyan-500/50 transition-all duration-200 group cursor-pointer text-left w-full focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                    <role.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{role.title}</h3>
                  <p className="text-gray-400 text-sm mb-6">{role.desc}</p>
                  <span className="flex items-center gap-2 text-sm font-semibold text-cyan-500 group-hover:gap-3 transition-all">
                    View Interactive Roadmap <ChevronRight className="w-4 h-4" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'career':
        return (
          <div className="space-y-12">
            <div>
              <h1 className="text-4xl font-bold mb-4">Career Hub</h1>
              <p className="text-gray-400">Interview experiences, company data, and guidance.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Briefcase className="text-cyan-500" /> Senior Interview Experiences
                </h3>
                {MOCK_INTERVIEWS.map(exp => (
                  <div key={exp.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold">{exp.company}</h4>
                        <p className="text-cyan-500 text-sm">{exp.role}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${exp.difficulty === 'Hard' ? 'bg-red-900/20 text-red-400 border border-red-500/20' :
                        exp.difficulty === 'Medium' ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-500/20' :
                          'bg-green-900/20 text-green-400 border border-green-500/20'
                        }`}>
                        {exp.difficulty}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-950 p-3 rounded-xl border border-gray-800">
                        <span className="text-[10px] text-gray-500 uppercase block mb-1">Student</span>
                        <span className="text-sm font-medium">{exp.studentName} (Batch {exp.batch})</span>
                      </div>
                      <div className="bg-gray-950 p-3 rounded-xl border border-gray-800">
                        <span className="text-[10px] text-gray-500 uppercase block mb-1">Total Rounds</span>
                        <span className="text-sm font-medium">{exp.rounds.length} Rounds</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase">Top Tips:</span>
                        <ul className="mt-2 space-y-1">
                          {exp.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                              <span className="text-cyan-500">•</span> {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 border border-cyan-500/20 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4">Top Recruiters</h3>
                  <div className="space-y-4">
                    {['Google Cloud Security', 'Zscaler', 'Cloudflare', 'Cisco Talos', 'SentinelOne'].map(company => (
                      <div key={company} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-xl border border-white/5">
                        <span className="font-medium text-sm">{company}</span>
                        <ExternalLink className="w-3 h-3 text-gray-500" />
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all">
                    View Full Directory
                  </button>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Award className="text-yellow-500" /> Prep Resources
                  </h3>
                  <ul className="space-y-3">
                    <li className="text-sm text-gray-400 hover:text-cyan-400 cursor-pointer flex items-center justify-between">
                      Common SOC Interview Qs <ChevronRight className="w-4 h-4" />
                    </li>
                    <li className="text-sm text-gray-400 hover:text-cyan-400 cursor-pointer flex items-center justify-between">
                      Bypassing WAFs Guide <ChevronRight className="w-4 h-4" />
                    </li>
                    <li className="text-sm text-gray-400 hover:text-cyan-400 cursor-pointer flex items-center justify-between">
                      Networking Fundamentals <ChevronRight className="w-4 h-4" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Not found</div>;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setActiveRoadmap(null); }}>
      {renderContent()}
      <ChatAssistant />
    </Layout>
  );
};

export default App;
