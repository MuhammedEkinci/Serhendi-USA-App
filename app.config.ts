import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    extra: {
      LOGIN_SERVER_URL: process.env.LOGIN_SERVER_URL,
    },
  };
};
