import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ServiceItem } from '../data/services';
import { priorityServiceSlugs } from '../data/services';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  showPriorityBadge?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, showPriorityBadge = true }) => {
  const [imageError, setImageError] = useState(false);
  const isPriority = priorityServiceSlugs.includes(service.slug) || service.featured;

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gov-borderCard shadow-gov-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-gov-primary focus:ring-offset-2"
    >
      {/* Prominent Real Service Image Container */}
      <div className="relative w-full h-44 sm:h-48 bg-slate-50 border-b border-gray-100 flex items-center justify-center p-2.5 overflow-hidden">
        <img
          src={imageError ? "/assets/service-placeholder.svg" : service.image}
          alt={`${service.name} - Sameer Xerox`}
          onError={() => setImageError(true)}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Priority / Popular Badge */}
        {showPriorityBadge && isPriority && (
          <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
            <Sparkles className="w-2.5 h-2.5" />
            Popular
          </span>
        )}

        {/* Category Badge overlay */}
        <span className="absolute bottom-2 left-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-white/95 text-gov-primary border border-blue-100 shadow-xs backdrop-blur-xs max-w-[85%] truncate">
          {service.category}
        </span>
      </div>

      {/* Card Content Area */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-[14.5px] font-bold text-gov-textPrimary leading-snug group-hover:text-gov-primary transition-colors line-clamp-2">
            {service.name}
          </h3>
          <p className="text-[11.5px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* View Details CTA Button */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-gov-primary text-xs font-bold">
          <span className="group-hover:underline">View Details</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-gov-primary" />
        </div>
      </div>
    </Link>
  );
};

