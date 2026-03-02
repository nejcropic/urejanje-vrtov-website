// src/lib/media.ts
const base = import.meta.env.BASE_URL;
const modules = import.meta.glob("../assets/*/*.{webp,jpg,png}", {
  eager: true,
  import: "default",
});

export const referenceGallery: Record<string, string[]> = {};

for (const path in modules) {
  const url = modules[path] as string;

  const parts = path.split("/");
  const galleryIndex = parts.indexOf("gallery");

  const category = parts[galleryIndex + 1];

  if (!referenceGallery[category]) {
    referenceGallery[category] = [];
  }

  referenceGallery[category].push(url);
}

export const images = {
  navbar: {
    instagram: new URL("../assets/logos/instagram.webp", import.meta.url).href,
    facebook: new URL("../assets/logos/facebook.webp", import.meta.url).href,
    tiktok: new URL("../assets/logos/tik-tok.webp", import.meta.url).href,
    siFlag: new URL("../assets/logos/si.webp", import.meta.url).href,
    enFlag: new URL("../assets/logos/en.webp", import.meta.url).href,
    itFlag: new URL("../assets/logos/it.webp", import.meta.url).href,
    logo: new URL("../assets/logos/logo.svg", import.meta.url).href,
  },
  studio: {
    studio_1: new URL("../assets/studio_1.webp", import.meta.url).href,
    studio_2: new URL("../assets/studio_2.webp", import.meta.url).href,
  },

  services: {
    ureditev: new URL("../assets/ureditev.webp", import.meta.url).href,
    terasa_home: new URL("../assets/terasa_home.webp", import.meta.url).href,
  },
  reference: {
    ref1: new URL("../assets/ref1.webp", import.meta.url).href,
    ref2: new URL("../assets/ref2.webp", import.meta.url).href,
    ref3: new URL("../assets/ref3.webp", import.meta.url).href,
    ref4: new URL("../assets/ref4.webp", import.meta.url).href,
    ref5: new URL("../assets/ref5.webp", import.meta.url).href,
    ref6: new URL("../assets/ref6.webp", import.meta.url).href,
  },
  storitve_1: {
    img_1: new URL("../assets/ref1.webp", import.meta.url).href,
    img_2: new URL("../assets/ref2.webp", import.meta.url).href,
    img_3: new URL("../assets/ref3.webp", import.meta.url).href,
  },
  storitve_2: {
    img_1: new URL("../assets/ref1.webp", import.meta.url).href,
    img_2: new URL("../assets/ref2.webp", import.meta.url).href,
    img_3: new URL("../assets/ref3.webp", import.meta.url).href,
  },
  storitve_3: {
    img_1: new URL("../assets/ref1.webp", import.meta.url).href,
    img_2: new URL("../assets/ref2.webp", import.meta.url).href,
    img_3: new URL("../assets/ref3.webp", import.meta.url).href,
  },
  storitve_4: {
    img_1: new URL("../assets/ref1.webp", import.meta.url).href,
    img_2: new URL("../assets/ref2.webp", import.meta.url).href,
    img_3: new URL("../assets/ref3.webp", import.meta.url).href,
  },
  storitve_5: {
    img_1: new URL("../assets/ref1.webp", import.meta.url).href,
    img_2: new URL("../assets/ref2.webp", import.meta.url).href,
    img_3: new URL("../assets/ref3.webp", import.meta.url).href,
  },
  storitve_6: {
    img_1: new URL("../assets/ref1.webp", import.meta.url).href,
    img_2: new URL("../assets/ref2.webp", import.meta.url).href,
    img_3: new URL("../assets/ref3.webp", import.meta.url).href,
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
