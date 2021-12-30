export function getImageName(imageSrc: string): string {
  return imageSrc.split("/").pop();
}
