export default function LogError(description: string, error?: any) {
  if (error) {
    if (typeof error === 'object') {
      error.info = description;
      console.error(description, error);
    } else {
      console.error(description, error);
    }
  } else {
    console.info(description);
  }
}
