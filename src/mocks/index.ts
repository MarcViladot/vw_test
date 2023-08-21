import environment from '@/environment';

export const initMocks = async () => {
  if (environment.useMock) {
    const { worker } = await import('./server/browser');
    worker.start({ onUnhandledRequest: 'warn' });
  }
};
