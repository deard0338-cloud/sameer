import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { allStatesAndUTs, featuredStates } from '../data/states';
import { useLanguage } from '../context/LanguageContext';

export const StatesPage: React.FC = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const filteredStates = allStatesAndUTs.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.capital.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-gov-bg min-h-screen pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-gov-borderCard py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gov-light text-gov-primary text-xs font-bold uppercase tracking-wider">
            All India Digital Services Coverage
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gov-textPrimary tracking-tight">
            {t.servicesByStates}
          </h1>
          <p className="text-sm sm:text-base text-gov-textSecondary max-w-xl mx-auto">
            {t.servicesByStatesSub}
          </p>

          <div className="pt-4 max-w-md mx-auto">
            <div className="relative flex items-center bg-white rounded-xl border border-gov-border shadow-sm px-3.5 py-2">
              <Search className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search state or union territory..."
                className="w-full text-sm outline-none text-gov-textPrimary placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-10">
        {/* Featured State Monuments Grid */}
        {!search && (
          <div className="mb-12">
            <h2 className="text-lg font-bold text-gov-textPrimary mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gov-primary" />
              Key State Services Hubs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredStates.map((state) => (
                <div
                  key={state.code}
                  className="bg-white rounded-2xl p-6 border border-gov-borderCard shadow-gov-card hover:shadow-gov-hover hover:-translate-y-1 transition-all text-center flex flex-col items-center justify-between"
                >
                  <div className="w-24 h-24 mb-3 flex items-center justify-center">
                    <img src={state.monumentSvg} alt={state.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gov-textPrimary">{state.name}</h3>
                    <div className="text-xs text-gov-textSecondary mb-3">Capital: {state.capital}</div>
                  </div>
                  <Link
                    to={`/services?state=${state.code}`}
                    className="w-full py-2 bg-gov-light text-gov-primary hover:bg-gov-primary hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View {state.servicesCount} Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All States & UTs Directory Grid */}
        <div>
          <h2 className="text-lg font-bold text-gov-textPrimary mb-6">
            All States &amp; Union Territories ({filteredStates.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredStates.map((state) => (
              <div
                key={state.code}
                className="bg-white p-4 rounded-xl border border-gov-borderCard shadow-sm hover:border-gov-primary transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-gov-primary uppercase">{state.code}</div>
                  <h4 className="text-sm font-bold text-gov-textPrimary">{state.name}</h4>
                  <div className="text-[11px] text-gov-textSecondary">{state.capital}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-gov-dark">{state.servicesCount}</div>
                  <Link
                    to={`/services?state=${state.code}`}
                    className="text-[11px] text-gov-primary font-semibold hover:underline"
                  >
                    View &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
