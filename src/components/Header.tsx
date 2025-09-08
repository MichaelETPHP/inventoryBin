import React from 'react';
import { Crown } from 'lucide-react';

interface HeaderProps {
  businessLine: string;
  department: string;
  onBusinessInfoChange: (businessLine: string, department: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  businessLine,
  department,
  onBusinessInfoChange
}) => {
  return (
    <header className="bg-white shadow-sm border-b-2 border-amber-200 p-6 print:shadow-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left side - Title and inputs */}
          <div className="flex-1">
            <h1 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-6 tracking-wide">
              Inventory Bin
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="businessLine" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Line:
                </label>
                <input
                  id="businessLine"
                  type="text"
                  value={businessLine}
                  onChange={(e) => onBusinessInfoChange(e.target.value, department)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter business line"
                />
              </div>
              
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                  Department:
                </label>
                <input
                  id="department"
                  type="text"
                  value={department}
                  onChange={(e) => onBusinessInfoChange(businessLine, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter department"
                />
              </div>
            </div>
          </div>

          {/* Right side - Logo */}
          <div className="flex-shrink-0">
            <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200">
              <Crown className="w-12 h-12 text-amber-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-amber-900 tracking-wider">
                BAR & RESTAURANT
              </div>
              <div className="text-sm text-amber-700 font-medium mt-1">
                Premium Service
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};