module.exports = {
  apps: [
    {
      name: 'entizen-frontend-next',
      script: 'npm',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
