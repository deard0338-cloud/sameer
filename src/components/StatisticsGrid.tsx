import React from 'react';
import { Building2, Layers, UserCheck, CreditCard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface StatsData {
  departments: { central: number; state: number };
  services: { central: number; state: number };
  registrations: { total: string; countNumber?: number };
  transactions: { total: string; countNumber?: number };
}

export const defaultStatsData: StatsData = {
  departments: {
    central: 80,
    state: 162
  },
  services: {
    central: 880,
    state: 1705
  },
  registrations: {
    total: "10,54,200+"
  },
  transactions: {
    total: "2,84,65,120+"
  }
};

interface StatisticsGridProps {
  stats?: StatsData;
}

export const StatisticsGrid: React.FC<StatisticsGridProps> = ({ stats = defaultStatsData }) => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-white border-b border-gov-borderCard shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gov-borderCard">
          {/* Top-Left: Departments / Entities */}
          <div className="py-6 md:py-8 px-4 sm:px-8 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-lg bg-gov-light flex items-center justify-center text-gov-primary">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gov-primary">
                {t.departmentsEntities}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6 pl-2">
              <div>
                <div className="text-xs sm:text-sm font-medium text-gov-textSecondary mb-1">
                  {t.central}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gov-textPrimary tracking-tight">
                  {stats.departments.central}
                </div>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-medium text-gov-textSecondary mb-1">
                  {t.state}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gov-textPrimary tracking-tight">
                  {stats.departments.state}
                </div>
              </div>
            </div>
          </div>

          {/* Top-Right: Services */}
          <div className="py-6 md:py-8 px-4 sm:px-8 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-lg bg-gov-light flex items-center justify-center text-gov-primary">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gov-primary">
                {t.services}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6 pl-2">
              <div>
                <div className="text-xs sm:text-sm font-medium text-gov-textSecondary mb-1">
                  {t.central}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gov-textPrimary tracking-tight">
                  {stats.services.central.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-medium text-gov-textSecondary mb-1">
                  {t.state}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gov-textPrimary tracking-tight">
                  {stats.services.state.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full border-t border-gov-borderCard my-2 hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gov-borderCard">
          {/* Bottom-Left: Registrations */}
          <div className="py-6 md:py-8 px-4 sm:px-8 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-lg bg-gov-light flex items-center justify-center text-gov-primary">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gov-primary">
                {t.registrations}
              </h3>
            </div>

            <div className="pl-2">
              <div className="text-xs sm:text-sm font-medium text-gov-textSecondary mb-1">
                {t.total}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gov-textPrimary tracking-tight">
                {stats.registrations.total}
              </div>
            </div>
          </div>

          {/* Bottom-Right: Transactions */}
          <div className="py-6 md:py-8 px-4 sm:px-8 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-lg bg-gov-light flex items-center justify-center text-gov-primary">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gov-primary">
                {t.transactions}
              </h3>
            </div>

            <div className="pl-2">
              <div className="text-xs sm:text-sm font-medium text-gov-textSecondary mb-1">
                {t.total}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gov-textPrimary tracking-tight">
                {stats.transactions.total}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
