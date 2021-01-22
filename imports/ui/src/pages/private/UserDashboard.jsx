import React from "react";

import CTAUser from "../../components/shared/CTAUser";
import InfoCard from "../../components/shared/Cards/InfoCard";
import PageTitle from "../../components/shared/Typography/PageTitle";
import {
  ChatIcon,
  PeopleIcon,
  MoneyIcon,
  StudioIcon,
} from "../../assets/icons";
import RoundIcon from "../../components/shared/RoundIcon";
import Container from "../../components/shared/Container";

function UserDashboard() {
  return (
    <Container>
      <PageTitle>Dashboard</PageTitle>

      <CTAUser />

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Sedute Totale" value="0">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Account balance" value="$ 46,760.89">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Paziente" value="376">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Appuntamenti" value="35">
          <RoundIcon
            icon={StudioIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
    </Container>
  );
}

export default UserDashboard;
