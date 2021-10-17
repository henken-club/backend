import { promisify } from "util";

import { decode, JsonWebTokenError, verify } from "jsonwebtoken";
import createJwksClient from "jwks-rsa";

const jwksClient = createJwksClient({ jwksUri: process.env.JWKS_URI });

export const verifyToken = async (
  token: string,
): Promise<{ accountId: string | null }> => {
  const decoded = decode(token, { complete: true });
  if (!decoded?.header.kid) {
    throw new JsonWebTokenError("Invalid token");
  }

  const getSigningKey = promisify(jwksClient.getSigningKey);
  const publicKey = await (
    await getSigningKey(decoded.header.kid)
  ).getPublicKey();

  const tokenData = verify(token, publicKey, {
    audience: process.env.AUDIENCE,
    issuer: process.env.ISSUER,
  });
  if (typeof tokenData === "string") {
    throw new Error("Invalid token data");
  }

  return { accountId: tokenData.sub || null };
};
