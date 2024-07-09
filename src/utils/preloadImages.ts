export const preloadImgaes = (paths: string[]) => {
  paths.forEach((path: string) => {
    const img = new Image();
    img.src = path;
  });
};
