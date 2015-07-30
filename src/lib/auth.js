import hawk from 'hawk';

const BEWIT_EXPIRATION = 60 * 60;

export function getSignedUrl(url, clientId, accessToken, certificate) {
  let bewitPayload = {
    credentials: {
      id: clientId,
      key: accessToken,
      algorithm: 'sha256'
    },
    ttlSec: BEWIT_EXPIRATION
  };

  if (certificate) {
    bewitPayload.ext = new Buffer(JSON.stringify({
      certificate: certificate
    })).toString('base64');
  }

  let bewit = hawk.client.getBewit(url, bewitPayload)

  return `${url}?bewit=${bewit}`;
}
