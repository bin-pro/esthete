module.exports = {
  "process.env.BACKEND_URL":
    process.env.NODE_ENV === "production"
      ? "https://github.com/dgu-web-t3-blackshoe/esthete-cms.git"
      : "",
};
