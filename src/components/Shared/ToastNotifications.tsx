import { Toaster } from 'react-hot-toast';

const ToastNotifications = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: '#1a1a3e',
          color: '#fff',
          border: '1px solid #2a2a5e',
          borderRadius: '8px',
        },
        success: {
          style: {
            border: '1px solid #22c55e',
          },
        },
        error: {
          style: {
            border: '1px solid #ef4444',
          },
        },
      }}
    />
  );
};

export default ToastNotifications;