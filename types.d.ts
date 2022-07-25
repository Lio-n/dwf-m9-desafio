// * Estos types son importantes, porque son utilizados por los endpoint que estan protegidos.
// * Osea, los que requieren el Token.
type CustomEndpoint = {
  req: NextApiRequest;
  res: NextApiResponse;
  userId: string;
};

type CustomEndpointWithoutReq = Omit<CustomEndpoint, "req">;

type Product = {
  title: string;
  vendor: string[];
  in_stock: boolean;
  category_id: string;
  picture_url: string;
  description: string;
  material: string[];
  size: string;
  unit_price: number;
  objectID: string;
};

type GenerateOrderParams = {
  additionalInfo?: object;
  productId: string;
  userId: string;
};

// # Classes Type
type UserData = {
  created_at: Date;
  orders_generated: string[]; // Cada vez que se completa una orden, la coll Order debe actualizar este campo.
  email: string;
  // * ↓ Estas propiedades son posibles actulizar por el user.
  full_name: string;
  address: string;
};

type AuthData = {
  email: string;
  user_id: string;
  code: number;
  expires: Date;
};

type OrderData = {
  status: "paid" | "pending" | "cancelled";
  additional_info: object;
  product_id: string;
  user_id: string;
  created_at: Date;
  price_per_unit: number;
  quantity: number;
  total_cost: number;
};

type LimitAndOffsetParams = {
  limit: number;
  offset: number;
};

type LimitOffsetQueryParams = LimitAndOffsetParams & { query: string };

type getOffsetAndLimitParams = LimitAndOffsetParams & {
  maxLimit?: number;
  maxOffset?: number;
};

type MPPreference = {
  items: Product[];
  back_urls: {
    success: string;
    pending: string;
    failure: string;
  };
  external_reference: string;
  notification_url: string;
};

type UpdateUserDataParams = {
  userId: string;
  data: {
    full_name?: string;
    address?: string;
  };
};
