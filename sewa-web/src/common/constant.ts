export const API_URL = import.meta.env.VITE_API_URL;
export const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL;
export const MEDIA_UPLOAD_URL = import.meta.env.VITE_MEDIA_UPLOAD_URL;
export const IMAGE_BASE_URL = MEDIA_BASE_URL + "/images";
export const TOKEN_EXPIRATION_HOUR = import.meta.env.VITE_TOKEN_EXPIRATION_HOUR;
export const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;
export const PROPERTY_TYPE_OPTIONS = [
  { label: "Room", value: "ROOM" },
  { label: "House", value: "House" },
];
export const FURNISHING_TYPE_OPTIONS = [
  { label: "Fully Furnished", value: "FULLY" },
  { label: "Semi Furnished", value: "SEMI" },
  { label: "Unfurnished", value: "NO" },
];
