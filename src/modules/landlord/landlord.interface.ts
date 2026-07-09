import { PropertyStatus } from "../../../generated/prisma/enums";

export interface IProperty {
  title: string;
  description: string;
  rent: number;
  bedrooms?: number;
  bathrooms?: number;
  address: string;
  city: string;
  division: string;
  country: string;
  status?: PropertyStatus;

  landlordId: string;
  categoryId: string;
}