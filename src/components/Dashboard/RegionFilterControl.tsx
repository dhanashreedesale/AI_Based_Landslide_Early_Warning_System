import { useState } from 'react';
import { Filter, RotateCcw, ChevronDown, ChevronUp, MapPin, ShieldAlert } from 'lucide-react';
import { useMapStore } from '../../store';
import { DEFAULT_FOCUS_REGIONS, REGION_GROUPS } from '../../data/focusRegionsData';

export const RegionFilterControl = () => {
  const { selectedRegions, setSelectedRegions, toggleRegion, resetToDefaultRegions } = useMapStore();
  const [isOpen, setIsOpen] = useState(false);

  const isDefaultSelected =
    selectedRegions.length === DEFAULT_FOCUS_REGIONS.length &&
    DEFAULT_FOCUS_REGIONS.every((r) => selectedRegions.includes(r));

  const handleSelectGroup = (groupName: keyof typeof REGION_GROUPS) => {
    setSelectedRegions(REGION_GROUPS[groupName]);
  };

  const handleSelectAll = () => {
    setSelectedRegions([...DEFAULT_FOCUS_REGIONS]);
  };

  const handleClearAll = () => {
    setSelectedRegions([]);
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all border shadow-sm ${
            isOpen
              ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-3.5 h-3.5 text-blue-500" />
          <span>Focus Regions ({selectedRegions.length}/{DEFAULT_FOCUS_REGIONS.length})</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {!isDefaultSelected && (
          <button
            onClick={resetToDefaultRegions}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-yellow-50 text-yellow-800 border border-yellow-300 rounded-lg text-xs font-medium hover:bg-yellow-100 transition-colors"
            title="Reset to 12 Default Focus Regions"
          >
            <RotateCcw className="w-3 h-3 text-yellow-700" />
            <span>Reset to Default 12</span>
          </button>
        )}

        <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto max-w-[600px] py-1 custom-scrollbar">
          {DEFAULT_FOCUS_REGIONS.map((region) => {
            const isSelected = selectedRegions.includes(region);
            return (
              <button
                key={region}
                onClick={() => toggleRegion(region)}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all flex items-center gap-1 border ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                    : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200 opacity-60'
                }`}
              >
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                {region}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Dropdown Modal */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-[1500] w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <h3 className="font-bold text-sm text-gray-900">Landslide Focus Regions</h3>
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Default Focus Active
            </span>
          </div>

          <p className="text-xs text-gray-500 mb-3">
            Primary focus regions automatically selected by default for landslide hazard detection:
          </p>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <button
              onClick={handleSelectAll}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                isDefaultSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All 12 Focus Regions
            </button>
            <button
              onClick={() => handleSelectGroup('Western & Central Himalayas')}
              className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition-colors"
            >
              NW Himalayas
            </button>
            <button
              onClick={() => handleSelectGroup('Eastern Himalayas & Northeast')}
              className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition-colors"
            >
              Northeast & East
            </button>
            <button
              onClick={handleClearAll}
              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-md text-xs font-medium transition-colors ml-auto"
            >
              Clear
            </button>
          </div>

          {/* Region Checkboxes */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
            {Object.entries(REGION_GROUPS).map(([groupName, regions]) => (
              <div key={groupName} className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  {groupName}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {regions.map((region) => {
                    const isChecked = selectedRegions.includes(region);
                    return (
                      <label
                        key={region}
                        className={`flex items-center gap-2 p-1.5 rounded cursor-pointer text-xs transition-colors ${
                          isChecked ? 'bg-white text-blue-900 font-semibold shadow-2xs' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleRegion(region)}
                          className="w-3.5 h-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="truncate">{region}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={resetToDefaultRegions}
              className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-1 underline"
            >
              <RotateCcw className="w-3 h-3" />
              Reset to 12 Focus Regions
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
