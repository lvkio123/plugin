import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { 
  Music, 
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { fetchViralSynths, type PluginInfo } from './services/geminiService';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PluginCard } from './components/PluginCard';
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
    } catch (err: any) {
      setError(err.message || "Failed to fetch viral synths. Please check your connection and API key.");
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
      <Header 
        loading={loading} 
        onRefresh={loadSynths} 
        sortBy={sortBy} 
        setSortBy={setSortBy} 
        sortOrder={sortOrder} 
        setSortOrder={setSortOrder} 
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <Hero />

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
              <h3 className="text-xl font-bold uppercase mb-2">Scan Failed</h3>
              <p className="text-[#151619]/60 mb-6 text-center max-w-md px-6">{error}</p>
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
                  <PluginCard key={plugin.name} plugin={plugin} index={index} />
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
