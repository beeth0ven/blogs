
const errorMessage = (error) => {
  let message;
  if (error instanceof Array) {
    const firstError = error[0];
    message = firstError.value;
  } else {
    message = `${error}`;
  }
  return `Error: ${message}`;
};

export { errorMessage };