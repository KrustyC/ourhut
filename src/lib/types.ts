export type Event = {
  title: string;
  description: any;
  image?: string;
  price?: number;
  date: {
    day: string;
    startTime: string;
    endTime: string;
  };
  location?: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
};
