import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aurafit.workout',
  appName: 'AuraFit',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;