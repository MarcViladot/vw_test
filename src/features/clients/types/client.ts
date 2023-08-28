export interface Client {
  id: number;
  name: string;
  lastName: string;
  partners: number;
  active: boolean;
  born: string | Date;
  image: string;
}
