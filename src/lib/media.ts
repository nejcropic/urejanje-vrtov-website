// src/lib/media.ts
const base = import.meta.env.BASE_URL;

export const images = {
  studio: {
    obrezovanje: new URL("../assets/obrezovanje.webp", import.meta.url).href,
    tepih: new URL("../assets/tepih_2.webp", import.meta.url).href,
  },

  services: {
    terasa: new URL("../assets/terasa.webp", import.meta.url).href,
  },
  reference: {
    ref1: new URL("../assets/terasa.webp", import.meta.url).href,
    ref2: new URL("../assets/trava.webp", import.meta.url).href,
    ref3: new URL("../assets/trava.webp", import.meta.url).href,
  },
};

export const videos = {
  services: {
    trava: `${base}videos/trava.mp4`,
    namakalni: `${base}videos/namakalni_video.mp4`,
    zasaditev: `${base}videos/zasaditev.mp4`,
    terasa: `${base}videos/terasa.mp4`,
    travna_rusa: `${base}videos/travna_rusa.mp4`,
    obrezovanje: `${base}videos/obrezovanje.mp4`,
  },
};
