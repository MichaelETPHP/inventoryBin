import React from 'react';
import logo from '../images/Logo.png';
import { HelpPopover } from './HelpPopover';

interface HeaderProps {
  businessLine: string;
  department: string;
  onBusinessInfoChange: (businessLine: string, department: string) => void;
  onOpenTour: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  businessLine,
  department,
  onBusinessInfoChange,
  onOpenTour
}) => {
  return (
    <header className="bg-white border-b border-cream-200 print:shadow-none">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left side - Title and inputs */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={logo}
                alt="JD Bar &amp; Restaurant"
                className="h-14 w-14 rounded-full object-cover shadow-panel ring-1 ring-brand-100 flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-display text-3xl lg:text-4xl font-semibold text-brand-900 tracking-tightest leading-tight">
                    Inventory Bin
                  </h1>
                  <HelpPopover onOpenTour={onOpenTour} />
                </div>
                <p className="text-sm text-ink-500 mt-0.5">
                  Daily stock ledger &amp; balance tracker
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div>
                <label htmlFor="businessLine" className="block text-sm font-medium text-ink-700 mb-1.5">
                  Business line
                </label>
                <input
                  id="businessLine"
                  type="text"
                  value={businessLine}
                  onChange={(e) => onBusinessInfoChange(e.target.value, department)}
                  className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-200 rounded-lg text-ink-900 placeholder:text-ink-500/60 focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:bg-white transition-colors duration-150"
                  placeholder="Enter business line"
                />
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-ink-700 mb-1.5">
                  Department
                </label>
                <input
                  id="department"
                  type="text"
                  value={department}
                  onChange={(e) => onBusinessInfoChange(businessLine, e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-200 rounded-lg text-ink-900 placeholder:text-ink-500/60 focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:bg-white transition-colors duration-150"
                  placeholder="Enter department"
                />
              </div>
            </div>
          </div>

          {/* Right side - badge */}
          <div className="flex-shrink-0 self-start lg:self-center">
            <div className="flex items-center gap-2 bg-brand-900 text-gold-100 px-4 py-2.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-300" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                Premium Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
