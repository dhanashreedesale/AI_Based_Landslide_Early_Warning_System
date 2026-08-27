import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws');

    ws.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket Connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'NEW_ALERT') {
        toast.error(`🚨 ${data.payload.title} - ${data.payload.location}`, {
          duration: 10000,
          style: {
            background: '#1a1a3e',
            color: '#fff',
            border: '1px solid #ef4444',
          },
        });
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      // Auto-reconnect after 3 seconds
      setTimeout(() => {
        // Reconnect logic would go here
      }, 3000);
    };

    return () => ws.close();
  }, []);

  return { isConnected };
};