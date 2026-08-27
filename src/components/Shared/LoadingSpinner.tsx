const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-4 border-dark-600 border-t-yellow-500 rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;