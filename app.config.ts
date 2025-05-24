import "dotenv/config";

type CustomConfigContext = {
  config: {
    [key: string]: any;
  };
};

export default ({ config }: CustomConfigContext) => {
  return {
    ...config,
    extra: {
      LOGIN_SERVER_URL: process.env.LOGIN_SERVER_URL,
    },
  };
};
