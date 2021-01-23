export const methodCall = (name, args) =>
  new Promise((resolve, reject) => {
    Meteor.call(name, args, (error, result) => {
      if (error) {
        return reject(error);
      }

      return resolve(result);
    });
  });
