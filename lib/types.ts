export interface TUser {
  socialMedia: SocialMedia;
  _id: string;
  services: string[];
  anotherService: any[];
  amenities: string[];
  specialNeed: string[];
  media: string[];
  activities: string[];
  userType: string;
  isVerified: boolean;
  createdAt: string;
  fullname: string;
  phoneNumber: string;
  email: string;
  password: string;
  __v: number;
  token: string;
  profilePhoto: string;
  professionalSummary: string;
  location: string;
}

export interface IPrice {
  _id: string;
  packageName: string;
  price: string;
  description: string;
  createdAt: string;
  __v: number;
}

interface SocialMedia {
  instagram: string;
  twitter: string;
}

export interface IEventResponse {
  success: boolean;
  data: IEvent[];
  message: string;
}

export interface IEvent {
  _id: string;
  title: string;
  availableSlot: string;
  price: string;
  location: string;
  room: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  onlineLink: string;
  free: boolean;
  media: string[];
  createdAt: string;
  __v: number;
}

export interface IClassResponse {
  success: boolean;
  data: IClass[];
  message: string;
}

export interface IClass {
  _id: string;
  title: string;
  type: string;
  trainer: TUser;
  availableSlot: string;
  location: string;
  room: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  onlineLink: string;
  free: boolean;
  price: number;
  description: string;
  media: string[];
  createdAt: string;
  gym?: string;
  __v: number;
}
export interface IBookingResponse {
  success: boolean;
  data: IBooking[];
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
}

export interface IBooking {
  _id: string;
  user: Pick<TUser, "_id" | "email">;
  class: IClass;
  bookingDate: string;
  createdAt: string;
  __v: number;
}
