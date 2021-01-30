export const getUniqueId = () =>
  new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
