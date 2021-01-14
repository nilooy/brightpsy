import { Studios } from "../../imports/api/services/studio/models/StudioCollection";
import faker, { company } from "faker/locale/it";

const imageUrl = "https://source.unsplash.com/1600x900/?office,meditation";

if (Studios.find().count() < 10) {
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
}
