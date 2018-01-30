
const errorMessage = (error) => {
  if (error instanceof Array) {
    const firstError = error[0];
    return errorMessage(firstError.value);
  } else {
    return `Error: ${error}`;
  }
};

export { errorMessage };