import { NextResponse } from 'next/server';

// rediret to specific url
export const redirectAuth = (redirectTo: string, baseUrl: URL) => {
  return NextResponse.redirect(new URL(redirectTo, baseUrl));
};

// check if string is valid json
export function isValidJsonString(jsonString: string) {
  if (!(jsonString && typeof jsonString === 'string')) {
    return false;
  }

  if (/^\s*$/.test(jsonString)) return false;
  jsonString = jsonString.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
  jsonString = jsonString.replace(
    /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
    ']',
  );
  jsonString = jsonString.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
  return /^[\],:{}\s]*$/.test(jsonString);

  // const isJsonString = async (jsonString: string) =>
  //   await (async (v) => JSON.parse(v))(jsonString)
  //     .then((_) => true)
  //     .catch((_) => false);

  //     return isJsonString(jsonString);

  // try {
  //   eval;
  //   JSON.parse(jsonString);
  //   return true;
  // } catch (error) {
  //   console.error('error', error);

  //   return false;
  // }
}
