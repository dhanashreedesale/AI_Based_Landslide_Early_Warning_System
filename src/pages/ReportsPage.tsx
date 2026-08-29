import { useState } from 'react';
import { FileText, Download, Filter, Search, FileSpreadsheet, FileJson } from 'lucide-react';
import { DEFAULT_FOCUS_REGIONS } from '../data/focusRegionsData';
import { useTranslation } from '../i18n';

const ReportsPage = () => {
  const [reportType, setReportType] = useState('all');
  const { t, tRegion } = useTranslation();

  const reports = [
    {
      id: '1',
      titleKey: 'reports.rpt1Title',
      type: 'daily',
      date: '2024-01-15',
      format: 'pdf',
      size: '3.2 MB',
      status: 'generated',
      descKey: 'reports.rpt1Desc',
    },
    {
      id: '2',
      titleKey: 'reports.rpt2Title',
      type: 'weekly',
      date: '2024-01-08',
      format: 'csv',
      size: '2.4 MB',
      status: 'generated',
      descKey: 'reports.rpt2Desc',
    },
    {
      id: '3',
      titleKey: 'reports.rpt3Title',
      type: 'monthly',
      date: '2024-01-01',
      format: 'pdf',
      size: '6.1 MB',
      status: 'generated',
      descKey: 'reports.rpt3Desc',
    },
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

  const getTypeText = (type: string) => {
    switch (type) {
      case 'daily':
        return t('reports.typeDaily');
      case 'weekly':
        return t('reports.typeWeekly');
      case 'monthly':
        return t('reports.typeMonthly');
      default:
        return type;
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-light-200 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
              <FileText className="w-6 h-6 text-purple-600" />
              {t('reports.pageTitle')}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {t('reports.pageSubtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-light-200 p-6 shadow-xs">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">{t('reports.quickGenerateTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{t('reports.lblReportType')}</label>
            <select className="w-full px-3 py-2 bg-light-50 border border-light-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>{t('reports.optDailySummary')}</option>
              <option>{t('reports.optWeeklyTelemetry')}</option>
              <option>{t('reports.optMonthlyAudit')}</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{t('reports.lblDateRange')}</label>
            <input type="date" className="w-full px-3 py-2 bg-light-50 border border-light-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{t('reports.lblFormat')}</label>
            <select className="w-full px-3 py-2 bg-light-50 border border-light-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>{t('reports.optFormatPDF')}</option>
              <option>{t('reports.optFormatCSV')}</option>
              <option>{t('reports.optFormatJSON')}</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{t('reports.lblFocusRegion')}</label>
            <select className="w-full px-3 py-2 bg-light-50 border border-light-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>{t('reports.optAll12Default')}</option>
              {DEFAULT_FOCUS_REGIONS.map((region) => (
                <option key={region} value={region}>
                  {tRegion(region)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-xs">
          {t('reports.btnGenerateReport')}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-light-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-light-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('reports.searchPlaceholder')}
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
              <option value="all">{t('reports.typeAll')}</option>
              <option value="daily">{t('reports.typeDaily')}</option>
              <option value="weekly">{t('reports.typeWeekly')}</option>
              <option value="monthly">{t('reports.typeMonthly')}</option>
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
                    <h4 className="font-semibold text-gray-900 text-sm">{t(report.titleKey)}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">{t(report.descKey)}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span>{report.date}</span>
                      <span>{report.size}</span>
                      <span className="capitalize">{getTypeText(report.type)}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-light-100 hover:bg-light-200 rounded-lg text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium">
                  <Download className="w-4 h-4" />
                  {t('common.download')}
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