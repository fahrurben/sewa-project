export type ErrorResponse = {
  message: string;
};
export type OnSuccessCallback = (data: unknown) => void;
export type OnErrorCallback = (data: ErrorResponse) => void;

export type PropertyType = {
  id: number;
  name: string;
  province_id: string;
  city_id: string;
  postal_code: string;
  longitude: number;
  latitude: number;
  type: string;
  furnishing_type: string;
  land_area: number;
  building_area: number;
  total_rooms: number;
  total_bathrooms: number;
  rental_cost_type: string;
  rental_cost: number;
  is_deposit_required: boolean;
  deposit_amount: number;
  agreement_template_id: number;
  status: string;
  thumbnail: string;
};
