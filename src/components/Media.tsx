import { createMedia } from "@artsy/fresnel";

const AppMedia = createMedia({
  breakpoints: {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 1180,
    xl: 1320,
  },
});

export const mediaStyles = AppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = AppMedia;
