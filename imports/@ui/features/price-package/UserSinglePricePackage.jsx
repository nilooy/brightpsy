import React from "react";
import Container from "@ui/components/Basic/Container";
import { Carousel } from "react-responsive-carousel";
import DotBg from "@ui/assets/svg/DotBg";
import { useParams } from "react-router-dom";
import { usePricePackageById } from "@ui/api-hooks/price-package";
import UserAvatar from "@ui/components/Avatar/UserAvatar";
import Grid from "@ui/components/Grid/Grid";
import PackagePricing from "@ui/components/Pricing/PackagePricing";
import { BiCheckShield } from "@react-icons/all-files/bi/BiCheckShield";
import Reviews from "./Reviews";

const UserSinglePricePackage = () => {
  const { id: packageId } = useParams();

  const { data: packageData = {} } = usePricePackageById(packageId);
  console.log(packageData);

  const { title, desc, images, duration, visits, tags, user } = packageData;

  const profile = user?.profile;

  return (
    packageData && (
      <Container>
        <Grid className="mt-10">
          <div>
            <div className="bg-green-500 text-white pt-1 pb-1 pl-4 pr-4 rounded-2xl inline-flex mb-3">
              <BiCheckShield />
              <p className="text-xs ml-3">Verificato</p>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-4xl lg:text-6xl font-extrabold leading-tight text-gray-800">
              {title}
            </h1>
            <div>
              <div className="bg-white shadow-2xl rounded-2xl p-4 mt-5">
                <div className="flex">
                  <p className="mr-2 font-bold">Durazione:</p>
                  <p>{duration} minuti</p>
                </div>
              </div>
              <div className="p-4 mt-5">
                <p className="font-bold text-2xl">Descrizione:</p>
                <p className="text-md text-gray-600 font-light leading-relaxed mt-2">
                  {desc}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Rerum, aspernatur. Veniam dolores corrupti illum excepturi
                  debitis placeat velit repellendus suscipit alias distinctio
                  reprehenderit quidem, quia nulla odio quibusdam voluptate
                  expedita?Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Reiciendis culpa, porro sint deleniti doloribus itaque
                  sed odio nobis aut sit exercitationem odit ratione voluptatum
                  ab recusandae tempora at nihil voluptatem.lorem Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Neque eligendi
                  rerum possimus nemo exercitationem ullam ex cupiditate
                  corrupti, quidem doloremque iste modi quis asperiores debitis,
                  repudiandae esse corporis explicabo voluptatibus. Lorem ipsum
                  dolor, sit amet consectetur adipisicing elit. Iusto nisi
                  voluptatibus, consequuntur beatae soluta accusantium dolorum
                  quidem dolore molestiae doloribus sit hic mollitia et
                  distinctio facere at quisquam! Repellendus, quaerat? lorem
                </p>
              </div>
              {tags && (
                <div className=" shadow-2xl rounded-2xl p-4 mt-5">
                  <p className="mr-2 font-bold">Tags:</p>
                  <div className="flex mt-2">
                    {tags.map((tag) => (
                      <p className="pt-1 pb-1 pl-4 pr-4 bg-green-200 text-green-700 rounded-2xl ml-2">
                        {tag.label}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              <Reviews />
            </div>
          </div>
          <div>
            <Carousel className="inset-0 object-cover object-center z-10 shadow-md w-full rounded-2xl">
              {images &&
                images.map((img) => (
                  <div>
                    <img src={img} alt={img + "-" + packageId} />
                  </div>
                ))}
            </Carousel>
            <div>
              {visits && (
                <Grid lg={3} xl={3} className="mt-5">
                  <PackagePricing
                    title="Basic"
                    color="gray"
                    visits={visits[0]}
                  />
                  <PackagePricing
                    title="Standard"
                    color="green"
                    visits={visits[1]}
                  />
                  <PackagePricing
                    title="Premium"
                    color="orange"
                    visits={visits[2]}
                  />
                </Grid>
              )}
              {profile && (
                <>
                  <div className="flex items-center justify-center mt-5">
                    <div className="w-full rounded-2xl shadow-lg py-4 px-5 bg-white">
                      <p className="font-bold text-xl p-2 text-center border">
                        Psicologo
                      </p>
                      <div className="flex items-start justify-between mt-2">
                        <div className="flex items-center mb-4 lg:mb-0 mr-10">
                          <UserAvatar
                            imageUrl={profile.profileImg}
                            firstName={profile.firstName}
                            lastName={profile.lastName}
                            size={16}
                          />
                          <div className="ml-2 self-center">
                            <p className="text-sm font-bold leading-4 text-gray-800">
                              {profile.firstName + " " + profile.lastName}
                            </p>
                          </div>
                        </div>
                      </div>
                      {profile?.bio && (
                        <p className="pt-4 mt-3 text-xs leading-4 text-gray-600">
                          {profile.bio}
                        </p>
                      )}

                      <div className="flex items-end justify-end mt-5">
                        <button className="text-xs mr-2 font-medium leading-3 text-blue-700 py-3 px-4 rounded bg-blue-200 focus:outline-none hover:opacity-90">
                          Visita il profilo
                        </button>
                        <button className="text-xs font-medium leading-3 text-green-700 py-3 px-4 rounded bg-green-200 focus:outline-none hover:opacity-90">
                          Scrivi a psicologo
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Grid>
      </Container>
    )
  );
};

export default UserSinglePricePackage;
