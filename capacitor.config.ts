import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'online.fableframe.app',
  appName: 'fable-frame',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
};

export default config;
