export interface Group {
  id: number;
  name: string;
  price: number;
  quantity: number;
  initialDate?: Date;
  endDate?: Date;
  eventId: number;
}
