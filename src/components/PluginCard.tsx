import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Waves, Layers, Star, MessageSquare, ExternalLink, TrendingUp } from 'lucide-react';
import { PluginInfo } from '../services/geminiService';
import { cn } from '../lib/utils';

interface PluginCardProps {
  plugin: PluginInfo;
  index: number;
}

export const PluginCard: React.FC<PluginCardProps> = ({ plugin, index }) => {
  return (
    <motion.div
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
  );
}
