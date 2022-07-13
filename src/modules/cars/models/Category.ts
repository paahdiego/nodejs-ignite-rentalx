import { v4 as uuidv4 } from "uuid";

class Category {
  id?: string;
  name: string;
  description: string;
  created_at?: Date;

  constructor() {
    this.id = uuidv4();
    this.created_at = new Date();
  }
}

export { Category };