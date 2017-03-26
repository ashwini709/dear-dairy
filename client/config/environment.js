const devConfig = {
  'serverUrl': 'http://127.0.0.1:5000'
};

const productionConfig = {
  'serverUrl': 'http://127.0.0.1:5000'
};

const config = process.env.NODE_ENV === 'production' ? productionConfig : devConfig;

export default config;
