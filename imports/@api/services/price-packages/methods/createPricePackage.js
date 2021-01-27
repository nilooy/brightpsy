import { PricePackages } from "../models/PricePackageCollection";

Meteor.methods({
  "pricePackage.create"({
    title,
    desc,
    isPhysical,
    isVirtual,
    tags,
    visits,
    duration,
    freeMins,
  }) {
    check(title, String);
    check(desc, String);
    check(isPhysical, Boolean);
    check(isVirtual, Boolean);
    check(tags, Array);
    check(visits, Array);
    check(duration, Number);
    check(freeMins, Number);
    return PricePackages.insert({
      title,
      desc,
      isPhysical,
      isVirtual,
      tags,
      visits,
      duration,
      freeMins,
    });
  },
});
