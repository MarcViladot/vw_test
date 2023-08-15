/**
 * Environment variables defined with `VITE_` prefix mapped as camelCase
 * and with the prefix trimmed.
 * Also `NODE_ENV` var as `environment`.
 */
interface AppEnvVars {
  environment: string;
  basePath: string;
  baseApiUrl: string;
  useMock: boolean;
}

export default {
  environment: import.meta.env.MODE,
  ...Object.keys(import.meta.env)
    .filter((envKey) => envKey.startsWith('VITE_'))
    .reduce((env, envKey) => {
      const key = envKey
        .replace('VITE_', '')
        .split('_')
        .map((keyPart, i) => `${i ? keyPart[0] : ''}${keyPart.substring(i ? 1 : 0).toLowerCase()}`)
        .join('');
      let value = import.meta.env[envKey];
      value = ['true', 'false'].includes(value.toLowerCase()) ? value === 'true' : value;
      return { ...env, [key]: value };
    }, {}),
} as AppEnvVars;
