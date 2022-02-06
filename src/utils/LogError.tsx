export default function LogError(description: string, error?: any) {
  if (error) {
    if (typeof error === 'object') {
      error.info = description;
      if (__DEV__) {
        console.error(description, error);
      }
    } else {
      if (__DEV__) {
        console.error(description, error);
      }
    }
  } else {
    console.info(description);
  }
}
