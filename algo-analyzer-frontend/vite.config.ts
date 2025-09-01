import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import history from 'connect-history-api-fallback';

export default defineConfig({
  plugins: [
    angular(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use(
          history({
            disableDotRule: true,
            htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
          })
        );
      },
    },
  ],
});
