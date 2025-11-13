const envVars = {
  APP_NAME: import.meta.env.VITE_APP_NAME || "Trade Journal",
  BACKEND_BASE_URL: import.meta.env.VITE_BACKEND_BASE_URL,
  ACCESS_TOKEN_TAG: import.meta.env.VITE_ACCESS_TOKEN_TAG,
  PAYPAL_CLIENT_ID: import.meta.env.VITE_PAYPAL_CLIENT_ID,
};

type EnvKey = keyof typeof envVars;

export function getOrThrow<T>(key: EnvKey) {
  if (envVars[key]) {
    return envVars[key] as T;
  } else {
    throw new Error(`env var ${key} not provided`);
  }
}
