export function jwtDecoder<TYPE>(rawToken: string) {
  if (!rawToken) {
    return null;
  }
  const splits = rawToken.split('.');
  if (splits.length > 1) {
    const payload = splits[1];
    return <TYPE>JSON.parse(window.atob(payload));
  } else return null;
}
