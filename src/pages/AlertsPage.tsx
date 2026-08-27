import { useState } from 'react';
import { AlertTriangle, Filter, Search, Clock, MapPin, ChevronDown } from 'lucide-react';

const AlertsPage = () => {
  const alerts = [
    { id: 1, severity: 'critical', title: 'Landslide Imminent', location: 'East Khasi Hills', time: '2 min ago', status: 'active' },
    { id: 2, severity: 'high', title: 'High Risk Detected', location: 'West Garo Hills', time: '15 min ago', status: 'active' },
    { id: 3, severity: 'medium', title: 'Soil Moisture Warning', location: 'Dima Hasao', time: '42 min ago', status: 'acknowledged' },
    { id: 4, severity: 'critical', title: 'Deformation Alert', location: 'Karbi Anglong', time: '1 hour ago', status: 'active' },
    { id: 5, severity: 'low', title: 'Rainfall Advisory', location: 'Cachar', time: '2 hours ago', status: 'resolved' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-light-200 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            Alert Management
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-light-50 rounded-lg px-3 py-2 border border-light-200">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                className="bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-light-50 border border-light-200 rounded-lg text-sm text-gray-700 hover:bg-light-100 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-light-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-light-50 border-b border-light-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-200">
              {alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-light-50 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      alert.severity === 'critical' ? 'bg-red-50 text-red-700' :
                      alert.severity === 'high' ? 'bg-orange-50 text-orange-700' :
                      alert.severity === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{alert.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    {alert.location}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {alert.time}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      alert.status === 'active' ? 'bg-green-50 text-green-700' :
                      alert.status === 'acknowledged' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        alert.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                      }`} />
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;