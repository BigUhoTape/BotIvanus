import path from 'path';

interface IEnvVariables {
  isDev: boolean;
  rootDir: string;
  extension: string;
}

const isDevelopment = process.env.NODE_ENV === 'development';

const envVariables: IEnvVariables = {
  isDev: isDevelopment,
  rootDir: isDevelopment ? path.resolve('./src') : path.resolve('./build'),
  extension: isDevelopment ? '.ts' : '.js',
};

export default envVariables;
