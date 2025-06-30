import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsAPI } from '../services/api';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    analyticsAPI.track('page_view', location.pathname);
  }, [location]);

  const trackEvent = (event: string, projectId?: string) => {
    analyticsAPI.track(event, location.pathname, projectId);
  };

  return { trackEvent };
};