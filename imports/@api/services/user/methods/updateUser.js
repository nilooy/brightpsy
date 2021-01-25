// firstName: 'Md Rezwan',
// lastName: 'Niloy',
// bio: 'dfsdfsf',
// experience: '332',
// identity_numb: '2133',
// isPhysical: true,
// isVirtual: true,
// tel: '234',
// facebook: '',
// instagram: '',
// twitter: '',
// youtube: '',
// languages: [ [Object], [Object] ]

Meteor.methods({
  "user.updateProfile"({ data }) {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        "profile.firstName": data.firstName,
        "profile.lastName": data.lastName,
        "profile.bio": data.bio,
        "profile.experience": data.experience,
        "profile.identity_numb": data.identity_numb,
        "profile.isPhysical": data.isPhysical,
        "profile.isVirtual": data.isVirtual,
        "profile.tel": data.tel,
        "profile.facebook": data.facebook,
        "profile.instagram": data.instagram,
        "profile.twitter": data.twitter,
        "profile.youtube": data.youtube,
        "profile.languages": data.languages,
      },
    });
  },
});
