import {createHmac} from 'crypto';
import {URL} from 'url';

export const createPath = (source: string) =>
  `/${Buffer.from(source).toString('base64url')}`;

export const sign = (path: string) => {
  return createHmac(
    'sha256',
    Buffer.from(process.env.IMGPROXY_KEY!, 'hex'), // eslint-disable-line no-process-env
  )
    .update(
      Buffer.from(process.env.IMGPROXY_SALT!, 'hex'), // eslint-disable-line no-process-env
    )
    .update(path)
    .digest()
    .toString('base64url');
};

export const proxy = (source: string) => {
  const path = createPath(source);
  const signature = sign(path);

  return new URL(
    `/${signature}${path}`,
    process.env.IMGPROXY_BASE_URL!, // eslint-disable-line no-process-env
  ).toString();
};
