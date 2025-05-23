import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds that the data is considered fresh
      staleTime: 5 * 60 * 1000, // 5 minutes
      
      // Time that data stays in cache
      gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
      
      // Retry failed requests
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Background refetch settings
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
      
      // Mutation retry delay
      retryDelay: 1000,
    },
  },
});

// Add global error handler for development
if (process.env.NODE_ENV === 'development') {
  queryClient.setMutationDefaults(['error'], {
    onError: (error) => {
      console.error('React Query Mutation Error:', error);
    },
  });
  
  queryClient.setQueryDefaults(['error'], {
    onError: (error) => {
      console.error('React Query Error:', error);
    },
  });
}