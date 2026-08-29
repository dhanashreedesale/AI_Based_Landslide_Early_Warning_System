import { useState, useRef } from 'react';
import { Camera, MapPin, Upload, X, Loader2, Image, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface PhotoUploadProps {
  onUpload: (data: PhotoData) => void;
  isUploading?: boolean;
}

interface PhotoData {
  image: File;
  preview: string;
  latitude: number | null;
  longitude: number | null;
  locationName: string;
  description: string;
  category: 'crack' | 'landslide' | 'slope_movement' | 'blocked_road' | 'other';
  timestamp: Date;
}

const PhotoUpload = ({ onUpload, isUploading = false }: PhotoUploadProps) => {
  const [photoData, setPhotoData] = useState<PhotoData>({
    image: null as any,
    preview: '',
    latitude: null,
    longitude: null,
    locationName: '',
    description: '',
    category: 'other',
    timestamp: new Date(),
  });

  const [isLocating, setIsLocating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Categories for the report
  const categories = [
    { value: 'crack', label: '🔍 Crack Detected', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'landslide', label: '⛰️ Landslide', color: 'bg-red-100 text-red-800' },
    { value: 'slope_movement', label: '📐 Slope Movement', color: 'bg-orange-100 text-orange-800' },
    { value: 'blocked_road', label: '🚧 Blocked Road', color: 'bg-purple-100 text-purple-800' },
    { value: 'other', label: '📋 Other', color: 'bg-gray-100 text-gray-800' },
  ];

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPhotoData(prev => ({
          ...prev,
          latitude,
          longitude,
        }));
        setIsLocating(false);
        toast.success('Location captured!');
        
        // Reverse geocode to get location name (using free API)
        fetchLocationName(latitude, longitude);
      },
      (error) => {
        setIsLocating(false);
        toast.error('Failed to get location. Please enter manually.');
        console.error('Location error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  // Fetch location name from coordinates
  const fetchLocationName = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      if (data.display_name) {
        setPhotoData(prev => ({
          ...prev,
          locationName: data.display_name,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch location name:', error);
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Process the selected file
  const processFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size should be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoData(prev => ({
        ...prev,
        image: file,
        preview: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  // Remove photo
  const removePhoto = () => {
    setPhotoData(prev => ({
      ...prev,
      image: null as any,
      preview: '',
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Submit the report
  const handleSubmit = () => {
    if (!photoData.image) {
      toast.error('Please select an image');
      return;
    }

    if (!photoData.latitude || !photoData.longitude) {
      toast.error('Please capture location');
      return;
    }

    if (!photoData.description.trim()) {
      toast.error('Please add a description');
      return;
    }

    onUpload(photoData);
    toast.success('Report submitted successfully!');

    // Reset form
    setPhotoData({
      image: null as any,
      preview: '',
      latitude: null,
      longitude: null,
      locationName: '',
      description: '',
      category: 'other',
      timestamp: new Date(),
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Camera className="w-5 h-5 text-blue-600" />
        Upload Geo-Tagged Photo Report
      </h3>

      <div className="space-y-4">
        {/* Photo Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : photoData.preview
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {photoData.preview ? (
            <div className="relative">
              <img
                src={photoData.preview}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg object-contain"
              />
              <button
                onClick={removePhoto}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-center">
                <Upload className="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-600">Drag & drop an image here, or</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Image className="w-4 h-4" />
                  Browse Files
                </button>
              </div>
              <p className="text-xs text-gray-500">Supports JPG, PNG, GIF (Max 10MB)</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Location Capture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="flex gap-2">
              <button
                onClick={getCurrentLocation}
                disabled={isLocating}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLocating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4 text-red-500" />
                )}
                {isLocating ? 'Getting Location...' : 'Get Current Location'}
              </button>
              <button
                onClick={() => {
                  // Open map for manual location selection
                  // You can integrate with Leaflet or a map picker here
                  toast('Click on the map to select location', {
                    icon: '🗺️',
                  });
                }}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
              >
                Select on Map
              </button>
            </div>
          </div>

          {/* Location Display */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Details
            </label>
            <div className="space-y-1 text-sm text-gray-600">
              {photoData.latitude && photoData.longitude ? (
                <>
                  <p>📍 Lat: {photoData.latitude.toFixed(6)}</p>
                  <p>📍 Lng: {photoData.longitude.toFixed(6)}</p>
                  {photoData.locationName && (
                    <p className="text-xs text-gray-500 truncate">
                      {photoData.locationName}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-gray-400">No location captured yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setPhotoData(prev => ({ ...prev, category: cat.value as any }))}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  photoData.category === cat.value
                    ? `${cat.color} ring-2 ring-offset-2 ring-blue-500`
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={photoData.description}
            onChange={(e) => setPhotoData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe what you observed..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-1">
            {photoData.description.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isUploading || !photoData.image || !photoData.latitude}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Submit Report
            </>
          )}
        </button>

        {/* Requirements Checklist */}
        <div className="text-xs text-gray-500 space-y-1">
          <p className="font-medium text-gray-700">Requirements:</p>
          <ul className="space-y-0.5">
            <li className={photoData.image ? 'text-green-600' : ''}>
              {photoData.image ? '✅' : '⬜'} Image uploaded
            </li>
            <li className={photoData.latitude ? 'text-green-600' : ''}>
              {photoData.latitude ? '✅' : '⬜'} Location captured
            </li>
            <li className={photoData.description.trim() ? 'text-green-600' : ''}>
              {photoData.description.trim() ? '✅' : '⬜'} Description added
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;