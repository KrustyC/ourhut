export enum REST_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type School = {
  _id?: string;
  name: string;
  postcode: string;
  geographicalArea: string;
  type: "primary" | "secondary";
};

export type TeachingResourceMaterial = {
  name: string;
  date: string;
  host: string;
  pdf: string;
  website: string;
};

export type TeachingResource = {
  _id?: string;
  title: string;
  image: string;
  materials: TeachingResourceMaterial[];
};

export type Product = {
  _id?: string;
  name: string;
  order: number;
  description: string;
  image: string;
  price: number | null;
  etsyLink: string;
};

export type News = {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  expirationDate: string;
};

export type Trustee = {
  _id?: string;
  name: string;
  description: string;
};

export type Event = {
  _id?: string;
  slug?: string;
  title: string;
  image: string;
  description: string;
  eventbriteLink: string;
  date: {
    day: string;
    startTime: {
      time: string;
      period: "AM" | "PM";
    };
    endTime: {
      time: string;
      period: "AM" | "PM";
    };
  };
};
