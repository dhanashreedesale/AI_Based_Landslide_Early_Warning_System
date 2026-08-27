import { useState } from 'react';
import { FileText, Download, Calendar, Filter, Search, Plus, FileSpreadsheet, FileJson } from 'lucide-react';

const ReportsPage = () => {
  const [reportType, setReportType] = useState('all');

  const reports = [
    {
      id: '1',
      title: 'Daily Risk Summary - Northeast India',
      type: 'daily',
      date: '2024-01-15',
      format: 'pdf',
      size: '2.4 MB',
      status: 'generated',
      description: 'Summary of all risk zones with alerts and predictions'
    },
    {
      id: '2',
      title: 'Weekly Alert Analysis',
      type: 'weekly',
      date: '2024-01-08',
      format: 'csv',
      size: '1.8 MB',
      status: 'generated',
      description: 'Analysis of all alerts generated in the past week'
    },
    {
      id: '3',
      title: 'Monthly Performance Report',
      type: 'monthly',
      date: '2024-01-01',
      format: 'pdf',
      size: '5.6 MB',
      status: 'generated',
      description: 'Model performance metrics and accuracy analysis'
    }
  ];

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': 
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'csv': 
        return <FileSpreadsheet className="w-4 h-4 text-green-500" />;
      case 'json': 
        return <FileJson className="w-4 h-4 text-blue-500" />;
      default: 
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-light-200 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
              <FileText className="w-6 h-6 text-purple-600" />
              Reports
            </h2>
            <p className="text-sm text-gray-500 mt-1">Generate and manage reports</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-light-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Generate Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Report Type</label>
            <select className="w-full px-3 py-2 bg-light-50 border border-light-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Daily Summary</option>
              <option>Weekly Analysis</option>
              <option>Monthly Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date Range</label>
            <input type="date" className="w-full px-3 py-2 bg-light-50 border border-light-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Format</label>
            <select className="w-full px-3 py-2 bg-light-50 border border-light-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>PDF</option>
              <option>CSV</option>
              <option>JSON</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Zone</label>
            <select className="w-full px-3 py-2 bg-light-50 border border-light-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>All Zones</option>
              <option>East Khasi Hills</option>
              <option>West Garo Hills</option>
            </select>
          </div>
        </div>
        <button className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-sm">
          Generate Now
        </button>
      </div>

      <div className="bg-white rounded-xl border border-light-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-light-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              className="bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-3 py-1 bg-light-50 border border-light-300 rounded-lg text-sm text-gray-900 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-light-200">
          {reports.map((report) => (
            <div key={report.id} className="p-4 hover:bg-light-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getFormatIcon(report.format)}
                  <div>
                    <h4 className="font-semibold text-gray-900">{report.title}</h4>
                    <p className="text-sm text-gray-600">{report.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span>{report.date}</span>
                      <span>{report.size}</span>
                      <span className="capitalize">{report.type}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-light-100 hover:bg-light-200 rounded-lg text-sm text-gray-700 hover:text-gray-900 transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;