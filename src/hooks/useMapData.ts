import { useQuery } from '@tanstack/react-query';
import { mockZones } from '@services/utils/mockData';

export const useMapData = () => {
  return useQuery({
    queryKey: ['mapData'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockZones;
    },
    refetchInterval: 300000, // 5 minutes
  });
};