// * Estos types son importantes, porque son utilizados por los endpoint que estan protegidos.
// * Osea, los que requieren el Token.
type CustomEndpoint = {
  req: NextApiRequest;
  res: NextApiResponse;
  userId: string;
};

type CustomEndpointWithoutReq = Omit<CustomEndpoint, "req">;

type Product = {
  name: string;
  vendor: string[];
  in_stock: boolean;
  type: string;
  picture: string;
  description: string;
  material: string[];
  size: string;
  unit_cost: number;
  objectID: string;
};

type GenerateOrderParams = {
  additionalInfo?: object;
  productId: string;
  userId: string;
};
