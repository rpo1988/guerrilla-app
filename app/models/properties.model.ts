export enum IPropertyCategory {
  APARTMENT = 'Apartment',
  HOUSE = 'House',
  PENTHOUSE = 'Penthouse',
  VILLA = 'Villa',
}

export interface IProperty {
  id: number;
  title: string;
  address: string;
  category: IPropertyCategory;
  image: {
    url: string;
  };
}

export interface IPropertiesResponse {
  propertyCollection: {
    total: number;
    items: IProperty[];
  };
}
