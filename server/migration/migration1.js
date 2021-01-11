/* import { Studios } from "../../imports/api/services/studio/models/StudioCollection";
import faker, { company } from "faker/locale/it";

const imageUrl =
  "https://images.unsplash.com/photo-1577412647305-991150c7d163?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

[...Array(30).keys()].forEach((each) =>
  Studios.insert({
    name: faker.company.companyName(),
    email: faker.internet.email(),
    tel: faker.phone.phoneNumber(),
    type: "personal",
    online: true,
    physical: true,
    desc: faker.company.catchPhraseDescriptor(),
    tags: [
      {
        id: faker.random.uuid(),
        text: faker.random.word(),
      },
    ],
    imageUrl,
    userId: faker.random.uuid(),
  })
);
 */
