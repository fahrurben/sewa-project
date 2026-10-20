import {
  Button,
  Carousel,
  Dialog,
  Heading,
  HStack,
  MetadataList,
  MetadataListItem,
  Stack,
} from "@astryxdesign/core";
import { useState } from "react";
import { useParams } from "react-router";
import { MEDIA_BASE_URL } from "../../common/constant";
import HeaderNav from "../../components/layout/headernav.element";
import { usePropertyDetails } from "../../hooks/use-property.api";
import useAuth from "../../hooks/userauthhook";
import ApplicationModal from "./application.modal";

const PropertyDetailsView = () => {
  const { user } = useAuth(false);
  const { id } = useParams();

  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const { data: property } = usePropertyDetails(id);

  const usFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="w-full min-h-screen bg-[#0b0b0d]">
      <HeaderNav user={user} />
      <div className="flex justify-center w-full">
        <div className="w-[1200px] py-8">
          <HStack hAlign="between">
            <Heading level={1}>{property?.name}</Heading>
            <Button
              label={"Rent"}
              size="lg"
              variant="primary"
              onClick={() => setShowApplicationModal(true)}
            ></Button>
          </HStack>

          <Carousel gap={6} hasSnap className="mt-8">
            {property?.images &&
              property.images.map((image) => {
                const propertyImage = MEDIA_BASE_URL + image.filename;

                return (
                  <img
                    src={propertyImage}
                    alt={image.id}
                    style={{
                      display: "block",
                      width: "500px",
                      height: "300px",
                      borderRadius: "8px",
                    }}
                  />
                );
              })}
          </Carousel>
          <HStack gap={6} hAlign="around" className="mt-6">
            <Stack direction="vertical" gap={2} className="w-full">
              <MetadataList>
                <MetadataListItem label="Rental Cost">
                  {usFormat.format(property?.rental_cost)}
                </MetadataListItem>
                <MetadataListItem label="Address">
                  {property?.address}
                </MetadataListItem>
                <MetadataListItem label="Province">
                  {property?.province_name}
                </MetadataListItem>
                <MetadataListItem label="City">
                  {property?.city_name}
                </MetadataListItem>
                <MetadataListItem label="Postal Code">
                  {property?.postal_code}
                </MetadataListItem>
                <MetadataListItem label="Type">
                  {property?.type_label}
                </MetadataListItem>
                <MetadataListItem label="Furnishing Type">
                  {property?.furnishing_type_label}
                </MetadataListItem>
              </MetadataList>
            </Stack>
            <Stack direction="vertical" gap={2} className="w-full">
              <MetadataList>
                <MetadataListItem label="Land Area">
                  {usFormat.format(property?.land_area) + " m2"}
                </MetadataListItem>
                <MetadataListItem label="Building Aree">
                  {usFormat.format(property?.building_area) + " m2"}
                </MetadataListItem>
                <MetadataListItem label="Total Rooms">
                  {property?.total_rooms}
                </MetadataListItem>
                <MetadataListItem label="Total Bathrooms">
                  {property?.total_bathrooms}
                </MetadataListItem>
                <MetadataListItem label="Total Bathrooms">
                  {property?.total_bathrooms}
                </MetadataListItem>
              </MetadataList>
            </Stack>
          </HStack>
        </div>
      </div>
      <Dialog
        isOpen={showApplicationModal}
        onOpenChange={() => {}}
        purpose="form"
        width={480}
      >
        <ApplicationModal
          property_id={property?.id}
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
        ></ApplicationModal>
      </Dialog>
    </div>
  );
};

export default PropertyDetailsView;
