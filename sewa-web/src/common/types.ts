export type ErrorResponse = {
  message: string;
};
export type OnSuccessCallback = (data: any) => void;
export type OnErrorCallback = (data: any) => void;

export type PropertyType = {
  id: number;
  name: string;
  description: string;
  province_id: string;
  province_name: string;
  city_id: string;
  city_name: string;
  address: string;
  postal_code: string;
  longitude: number;
  latitude: number;
  type: string;
  type_label: string;
  furnishing_type: string;
  furnishing_type_label: string;
  land_area: number;
  building_area: number;
  total_rooms: number;
  total_bathrooms: number;
  rental_cost_type: string;
  rental_cost_type_label: string;
  rental_cost: number;
  is_deposit_required: boolean;
  deposit_amount: number;
  agreement_template_id: number;
  status: string;
  thumbnail: string;
};
