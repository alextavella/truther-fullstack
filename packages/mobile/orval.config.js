module.exports = {
  'appstore': {
    output: {
      mode: 'split',
      target: './src/data/store.ts',
      schemas: './src/data/model',
      httpClient: 'axios',
      mock: false,
      prettier: true,
      override: {
        mutator: {
          path: './src/lib/api.ts',
          name: 'customInstance',
        },
      },
    },
    input: {
      target: '../../api/openapi.yaml',
    },
  },
};