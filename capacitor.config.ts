import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'online.fableframe.app',
  appName: 'FableFrame',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
};

export default config;
