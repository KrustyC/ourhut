type Location = {
  address: {
    addressLine?: string;
    postcode?: string;
    city?: string;
  };
};

export function getAddressText(location: Location): string {
  const address = [
    location.address.addressLine || null,
    location.address.postcode || null,
    location.address.city || null,
  ];

  return address.filter((item) => item !== null).join(", ");
}
