const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@layout': path.resolve(__dirname, 'src/components/layout'),
      '@database': path.resolve(__dirname, 'src/database'),
    },
  },
};