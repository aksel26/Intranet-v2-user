export const convertFileUnit = (bytes: number | null | undefined = 0, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const bytesValue = bytes ?? 0;
  const i = Math.floor(Math.log(bytesValue) / Math.log(k));

  return parseFloat((bytesValue / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
