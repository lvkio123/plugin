import { Music, RefreshCw, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  loading: boolean;
  onRefresh: () => void;
  sortBy: string;
  setSortBy: (val: any) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (val: 'asc' | 'desc') => void;
}

export function Header({ loading, onRefresh, sortBy, setSortBy, sortOrder, setSortOrder }: HeaderProps) {
  return (
    <header className="border-b border-[#151619]/10 bg-white/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#151619] rounded-lg flex items-center justify-center text-white">
            <Music size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter uppercase">SynthFinder Free</h1>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-50">FL Studio VST Tracker</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-[#151619]/5 px-3 py-1.5 rounded-full border border-[#151619]/10">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-40">Sort:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold uppercase tracking-tight focus:outline-none cursor-pointer"
            >
              <option value="name">Name</option>
              <option value="developer">Developer</option>
              <option value="viralReason">Viral</option>
            </select>
            <button 
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1 hover:text-[#FF4444] transition-colors"
            >
              <TrendingUp size={14} className={cn(sortOrder === 'desc' && "rotate-180")} />
            </button>
          </div>

          <button 
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-[#151619] text-white rounded-full text-sm font-medium hover:bg-[#FF4444] transition-colors disabled:opacity-50 group"
          >
            <RefreshCw size={16} className={cn(loading && "animate-spin")} />
            <span className="hidden sm:inline">{loading ? "SCANNING..." : "REFRESH"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
