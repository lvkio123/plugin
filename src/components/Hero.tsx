import { TrendingUp, Search, Download } from 'lucide-react';

export function Hero() {
  return (
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
  );
}
