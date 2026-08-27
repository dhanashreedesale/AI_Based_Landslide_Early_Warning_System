import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, TrendingUp, TrendingDown, Minus, X } from 'lucide-react';

type ColorKey = 'red' | 'orange' | 'blue' | 'green';

interface StatCardProps {
  stat: {
    id: string;
    icon: any;
    label: string;
    value: string;
    change: string;
    changeType: 'up' | 'down' | 'neutral';
    color: ColorKey;
    details: string[];
  };
  isOpen: boolean;
  onToggle: () => void;
}

const StatCard = ({ stat, isOpen, onToggle }: StatCardProps) => {
  const colorMap: Record<ColorKey, string> = {
    red: 'border-red-500/20 bg-red-50',
    orange: 'border-orange-500/20 bg-orange-50',
    blue: 'border-blue-500/20 bg-blue-50',
    green: 'border-green-500/20 bg-green-50',
  };

  const textColorMap: Record<ColorKey, string> = {
    red: 'text-red-600',
    orange: 'text-orange-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
  };

  const ChangeIcon = stat.changeType === 'up' ? TrendingUp : stat.changeType === 'down' ? TrendingDown : Minus;
  const changeColor = stat.changeType === 'up' ? 'text-green-600' : stat.changeType === 'down' ? 'text-red-600' : 'text-gray-400';

  return (
    <div className="relative z-10">
      <div 
        onClick={onToggle}
        className={`bg-white rounded-xl border border-light-200 p-4 hover:border-light-300 transition-all cursor-pointer shadow-sm hover:shadow-md ${isOpen ? 'ring-2 ring-blue-500/50' : ''}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${colorMap[stat.color]}`}>
              <stat.icon className={`w-5 h-5 ${textColorMap[stat.color]}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 text-xs ${changeColor}`}>
              <ChangeIcon className="w-3 h-3" />
              <span>{stat.change}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-[2000] mt-1 w-full min-w-[200px] bg-white rounded-lg border border-light-200 shadow-xl overflow-hidden"
          >
            <div className="p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500 font-medium">Details</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                  }} 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <ul className="space-y-1">
                {stat.details.map((detail, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-center gap-2 py-1 hover:bg-light-50 px-2 rounded transition-colors">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatCard;