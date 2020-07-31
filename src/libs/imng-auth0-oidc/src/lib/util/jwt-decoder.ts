export function jwtDecoder<TYPE>(rawToken: string): unknown {
  const splits = rawToken?.split('.');
  if (splits?.length > 1) {
    const payload = splits[1];
    return JSON.parse(window.atob(payload)) as TYPE;
  } else {
    return null;
  }
}
