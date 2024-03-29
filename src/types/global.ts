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

export type Product = {
  _id?: string;
  name: string;
  order: number;
  description: string;
  image: string;
  price: number | null;
  etsyLink: string;
};

export type FormProduct = Omit<Product, "price"> & {
  price: string;
};

export type ProjectLink<T> = Partial<T> & {
  _id: string;
};

export type FormProjectImage = {
  image: string;
};

export type FormProject = {
  _id?: string;
  title: string;
  intro: string;
  description: string;
  year: number;
  years: {
    startYear: number;
    endYear: number;
  };
  thumbnailImage: string;
  images: FormProjectImage[];
  links: {
    teacherResources?: ProjectLink<TeachingResource> | null;
    press?: ProjectLink<Publication> | null;
    research?: ProjectLink<Research> | null;
    shop?: ProjectLink<Product> | null;
  };
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
    endDay?: string | null;
    startTime: {
      time: string;
      period: "AM" | "PM";
    };
    endTime: {
      time: string;
      period: "AM" | "PM";
    };
  };
  isPublished?: boolean;
};

export interface MaterialLink {
  value: string;
  type: "pdf" | "website";
}

export type TeachingResourceMaterial = {
  name: string;
  date: string;
  host: string;
  link?: MaterialLink;
};

export type TeachingResource = {
  _id?: string;
  title: string;
  image: string;
  materials: TeachingResourceMaterial[];
};

export type PublicationMaterial = {
  name: string;
  type: string;
  date: string;
  authorOrInterviewees?: string;
  link?: MaterialLink;
};

export type Publication = {
  _id?: string;
  title: string;
  image: string;
  materials: PublicationMaterial[];
};

export type ResearchMaterial = {
  name: string;
  type: string;
  date: string;
  authorOrInterviewees?: string;
  link?: MaterialLink;
};

export type Research = {
  _id?: string;
  title: string;
  image: string;
  materials: ResearchMaterial[];
};

export type Project = {
  _id?: string;
  title: string;
  intro: string;
  description: string;
  year: number;
  years: {
    startYear: number;
    endYear: number;
  };
  thumbnailImage?: string;
  images: string[];
  links: {
    teacherResources?: ProjectLink<TeachingResource> | null;
    press?: ProjectLink<Publication> | null;
    research?: ProjectLink<Research> | null;
    shop?: ProjectLink<Product> | null;
  };
};
