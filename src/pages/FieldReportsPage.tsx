import { useState } from 'react';
import { Camera, MapPin, Image, Clock, CheckCircle, XCircle } from 'lucide-react';
import PhotoUpload from '../components/FieldReports/PhotoUpload';
import { motion } from 'framer-motion';

interface Report {
  id: string;
  image: string;
  latitude: number;
  longitude: number;
  locationName: string;
  description: string;
  category: string;
  timestamp: Date;
  status: 'pending' | 'reviewed' | 'action_taken';
}

const FieldReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Handle photo upload
  const handlePhotoUpload = async (data: any) => {
    setIsUploading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newReport: Report = {
      id: `report-${Date.now()}`,
      image: data.preview,
      latitude: data.latitude,
      longitude: data.longitude,
      locationName: data.locationName || 'Unknown location',
      description: data.description,
      category: data.category,
      timestamp: new Date(),
      status: 'pending',
    };
    
    setReports(prev => [newReport, ...prev]);
    setIsUploading(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800' };
      case 'reviewed':
        return { label: 'Reviewed', color: 'bg-blue-100 text-blue-800' };
      case 'action_taken':
        return { label: 'Action Taken', color: 'bg-green-100 text-green-800' };
      default:
        return { label: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getCategoryEmoji = (category: string) => {
    const map: Record<string, string> = {
      crack: '🔍',
      landslide: '⛰️',
      slope_movement: '📐',
      blocked_road: '🚧',
      other: '📋',
    };
    return map[category] || '📋';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Camera className="w-6 h-6 text-blue-600" />
              Field Reports
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Upload geo-tagged photos and report field observations
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Total Reports:</span>
            <span className="font-bold text-gray-900">{reports.length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div>
          <PhotoUpload onUpload={handlePhotoUpload} isUploading={isUploading} />
        </div>

        {/* Reports List */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              Recent Reports
            </h3>

            {reports.length === 0 ? (
              <div className="text-center py-12">
                <Camera className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No reports submitted yet</p>
                <p className="text-sm text-gray-400">Upload your first field report</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                {reports.map((report) => {
                  const status = getStatusBadge(report.status);
                  return (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-3">
                        <img
                          src={report.image}
                          alt={report.description}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-gray-900 truncate">
                                {getCategoryEmoji(report.category)} {report.category.replace('_', ' ').toUpperCase()}
                              </p>
                              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                                {report.description}
                              </p>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color} flex-shrink-0`}>
                              {status.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {report.locationName.length > 30 
                                ? report.locationName.slice(0, 30) + '...' 
                                : report.locationName}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(report.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button className="text-xs text-blue-600 hover:text-blue-700">
                              View on Map
                            </button>
                            <button className="text-xs text-green-600 hover:text-green-700">
                              Mark Reviewed
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldReportsPage;