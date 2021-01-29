const { PricePackages } = require("./PricePackageCollection");

PricePackages.rawCollection().createIndex({
  title: "text",
  desc: "text",
  "tags.value": "text",
});
