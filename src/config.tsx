interface IEnv {
  API_URL: string;
}

const dev: IEnv = {
  API_URL: 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql',
};

const prod: IEnv = {
  API_URL: 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql',
};

const config = __DEV__ ? dev : prod;

export default config;
