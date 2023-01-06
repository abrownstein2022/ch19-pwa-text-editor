const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // we need to add the workbox plugin
      // to handle loading servbice worker and 
      // setting up file caching
      // and anything else pwa related
      new GenerateSW(),

      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'PWA text editor',
        background_color: '#4444aa',
        // crossorigin: '', //can be null, use-credentials or anonymous
        icons: [

          {
            src: path.resolve('src/images/logo.png'),
            // size: '1024x1024',
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
            purpose: 'maskable'
          }
        ]
      })

    ],

    module: {
      rules: [
        
      ],
    },
  };
};
