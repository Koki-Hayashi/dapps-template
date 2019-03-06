// @flow

type _error = {
  message: string,
};

export default function createError(message: string): _error {
  return { message };
}
