// * Estos types son importantes, porque son utilizados por los endpoint que estan protegidos.
// * Osea, los que requieren el Token.
type CustomEndpoint = {
  req: NextApiRequest;
  res: NextApiResponse;
  userId: string;
};

type CustomEndpointWithoutReq = Omit<CustomEndpoint, "req">;
