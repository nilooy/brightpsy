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
    Meteor.users.update(
      { _id: Meteor.userId() },
      {
        $set: {
          profile: {
            ...data,
          },
        },
      }
    );
  },
});
