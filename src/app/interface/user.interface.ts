import { Coordinate } from './coordinate.interface';

export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  imageUrl: string;
  coordinate: Coordinate;
}
