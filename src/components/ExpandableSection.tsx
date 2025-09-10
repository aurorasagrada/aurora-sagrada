import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, BookOpen, Star, Eye } from 'lucide-react';

interface ExpandableSectionProps {
  title: string;
  summary: string;
  fullContent: string | React.ReactNode;
  icon?: React.ReactNode;
  category?: string;
  metadata?: Record<string, any>;
  className?: string;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  summary,
  fullContent,
  icon = <BookOpen className="w-5 h-5" />,
  category,
  metadata,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className={`bg-aurora-vinho/20 backdrop-blur-sm border border-aurora-dourado/30 rounded-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div
        className="p-4 cursor-pointer hover:bg-aurora-vinho/30 transition-colors"
        onClick={toggleExpanded}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="text-aurora-dourado mt-1">
              {icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-cinzel text-aurora-dourado">
                  {title}
                </h3>
                {category && (
                  <span className="text-xs bg-aurora-azul/20 text-aurora-pergaminho/80 px-2 py-1 rounded">
                    {category}
                  </span>
                )}
              </div>
              <p className="text-aurora-pergaminho/80 font-alice text-sm leading-relaxed">
                {summary}
              </p>
              
              {/* Metadata */}
              {metadata && Object.keys(metadata).length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.entries(metadata).map(([key, value]) => (
                    <div key={key} className="text-xs text-aurora-pergaminho/60">
                      <span className="font-semibold">{key}:</span> {String(value)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-aurora-dourado ml-2 mt-1"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-aurora-dourado/20"
          >
            <div className="p-4 bg-aurora-azul/10">
              <div className="flex items-center space-x-2 mb-3">
                <Eye className="w-4 h-4 text-aurora-salvia" />
                <span className="text-sm font-cinzel text-aurora-salvia">
                  Conteúdo Completo
                </span>
              </div>
              
              <div className="text-aurora-pergaminho font-alice leading-relaxed">
                {typeof fullContent === 'string' ? (
                  <div className="whitespace-pre-wrap">{fullContent}</div>
                ) : (
                  fullContent
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExpandableSection;

