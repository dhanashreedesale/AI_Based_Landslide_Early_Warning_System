import { useQuery } from '@tanstack/react-query';
import { mockAlerts } from '@services/utils/mockData';

export const useAlerts = () => {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockAlerts;
    },
    refetchInterval: 60000, // 1 minute
  });
};