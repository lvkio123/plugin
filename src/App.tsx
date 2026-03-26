import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, 
  Download, 
  TrendingUp, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  Cpu, 
  Layers, 
  Waves,
  AlertCircle,
  Star,
  MessageSquare
} from 'lucide-react';
import { fetchViralSynths, type PluginInfo } from './services/geminiService';
import { cn } from './lib/utils';

export default function App() {
  const [plugins, setPlugins] = useState<PluginInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'developer' | 'viralReason'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const loadSynths = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchViralSynths();
      setPlugins(data);
    } catch (err) {
      setError("Failed to fetch viral synths. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sortedPlugins = [...plugins].sort((a, b) => {
    const valA = a[sortBy].toLowerCase();
    const valB = b[sortBy].toLowerCase();
    if (sortOrder === 'asc') {
      return valA.localeCompare(valB);
    } else {
      return valB.localeCompare(valA);
    }
  });

  useEffect(() => {
    loadSynths();
  }, []);

  return (
    <div className="min-h-screen bg-[#E6E6E6] text-[#151619] font-sans selection:bg-[#FF4444] selection:text-white">
      {/* Header */}
      <header className="border-b border-[#151619]/10 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#151619] rounded-lg flex items-center justify-center text-white">
              <Music size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tighter uppercase">SynthFinder Free</h1>
              <p className="text-[10px] font-mono uppercase tracking-widest opacity-50">FL Studio VST Tracker v1.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-[#151619]/5 px-3 py-1.5 rounded-full border border-[#151619]/10">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-40">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-bold uppercase tracking-tight focus:outline-none cursor-pointer"
              >
                <option value="name">Name</option>
                <option value="developer">Developer</option>
                <option value="viralReason">Viral Reason</option>
              </select>
              <button 
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="p-1 hover:text-[#FF4444] transition-colors"
                title={sortOrder === 'asc' ? "Ascending" : "Descending"}
              >
                <TrendingUp size={14} className={cn(sortOrder === 'desc' && "rotate-180")} />
              </button>
            </div>

            <button 
              onClick={loadSynths}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-[#151619] text-white rounded-full text-sm font-medium hover:bg-[#FF4444] transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <RefreshCw size={16} className={cn(loading && "animate-spin")} />
              <span className="hidden sm:inline">{loading ? "SCANNING NEWS..." : "REFRESH FEED"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4444]/10 text-[#FF4444] text-xs font-bold uppercase tracking-wider mb-6">
                <TrendingUp size={14} />
                <span>Viral Plugins Found</span>
              </div>
              <h2 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-8">
                Free <br />
                <span className="text-[#FF4444]">Synths</span> <br />
                Trending.
              </h2>
              <p className="text-lg text-[#151619]/70 max-w-md leading-relaxed">
                We track viral music production videos and news sources to find the best free VST synthesizers currently making waves in the community.
              </p>
            </div>
            
            <div className="hidden lg:block border-l border-[#151619]/10 pl-12 pb-4">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-[#151619]/20 flex items-center justify-center">
                    <Search size={20} />
                  </div>
                  <p className="text-sm font-medium max-w-[200px]">Real-time search across viral production sources.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-[#151619]/20 flex items-center justify-center">
                    <Download size={20} />
                  </div>
                  <p className="text-sm font-medium max-w-[200px]">Direct links to official developer downloads.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Sort Controls */}
        <div className="md:hidden mb-8 flex flex-col gap-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#151619]/5 shadow-sm">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-40 mb-1">Sort by</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-sm font-bold uppercase tracking-tight focus:outline-none cursor-pointer"
              >
                <option value="name">Name</option>
                <option value="developer">Developer</option>
                <option value="viralReason">Viral Reason</option>
              </select>
            </div>
            <button 
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="w-10 h-10 rounded-full bg-[#151619]/5 flex items-center justify-center hover:text-[#FF4444] transition-colors"
            >
              <TrendingUp size={18} className={cn(sortOrder === 'desc' && "rotate-180")} />
            </button>
          </div>
        </div>

        {/* Plugin Grid */}
        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[400px] bg-white rounded-2xl animate-pulse border border-[#151619]/5" />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-[#151619]/10">
              <AlertCircle size={48} className="text-[#FF4444] mb-4" />
              <h3 className="text-xl font-bold uppercase mb-2">Connection Error</h3>
              <p className="text-[#151619]/60 mb-6">{error}</p>
              <button 
                onClick={loadSynths}
                className="px-6 py-3 bg-[#151619] text-white rounded-full font-bold hover:bg-[#FF4444] transition-all"
              >
                RETRY SCAN
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {sortedPlugins.map((plugin, index) => (
                  <motion.div
                    key={plugin.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl border border-[#151619]/5 hover:border-[#FF4444]/30 transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="p-8 flex-1">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-[#151619]/5 rounded-xl flex items-center justify-center text-[#151619]/40 group-hover:bg-[#FF4444]/10 group-hover:text-[#FF4444] transition-colors">
                          {plugin.type.toLowerCase().includes('analog') ? <Cpu size={24} /> : 
                           plugin.type.toLowerCase().includes('wavetable') ? <Waves size={24} /> : 
                           <Layers size={24} />}
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest bg-[#151619]/5 px-2 py-1 rounded">
                          {plugin.type}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold tracking-tight mb-1 group-hover:text-[#FF4444] transition-colors">
                        {plugin.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={cn(
                              i < Math.floor(plugin.rating) ? "fill-[#FF4444] text-[#FF4444]" : "text-[#151619]/20"
                            )} 
                          />
                        ))}
                        <span className="text-[10px] font-bold ml-1 opacity-40">{plugin.rating.toFixed(1)}</span>
                      </div>
                      <p className="text-xs font-mono uppercase tracking-wider text-[#151619]/40 mb-4">
                        by {plugin.developer}
                      </p>
                      
                      <p className="text-[#151619]/70 text-sm leading-relaxed mb-4 line-clamp-3">
                        {plugin.description}
                      </p>

                      <div className="bg-[#151619]/5 rounded-lg p-3 mb-6">
                        <div className="flex items-start gap-2">
                          <MessageSquare size={14} className="text-[#151619]/40 mt-0.5 shrink-0" />
                          <p className="text-[11px] italic text-[#151619]/60 leading-snug">
                            "{plugin.communityFeedback}"
                          </p>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-[#151619]/5 mt-auto">
                        <div className="flex items-center gap-2 text-[#FF4444] mb-4">
                          <TrendingUp size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            Trending: {plugin.viralReason}
                          </span>
                        </div>
                      </div>
                    </div>

                    <a 
                      href={plugin.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-5 bg-[#151619] text-white text-center font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[#FF4444] transition-colors"
                    >
                      <span>Get Plugin</span>
                      <ExternalLink size={14} />
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-[#151619]/10 mt-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50">
            <Music size={20} />
            <span className="text-xs font-mono uppercase tracking-widest">SynthFinder Free © 2026</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-mono uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">Privacy</a>
            <a href="#" className="text-[10px] font-mono uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">Terms</a>
            <a href="#" className="text-[10px] font-mono uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
