export function responseTemplate({ status = false, message = "", data = {} }) {
  return {
    status,
    message,
    data,
  };
}
