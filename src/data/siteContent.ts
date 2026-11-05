export type NavItem = {
  href: string;
  label: string;
  section: string;
};

export type Character = {
  name: string;
  className: string;
  image: string;
  width: number;
  height: number;
};

export type Trailer = {
  id: string;
  title: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "#hero", label: "SMG", section: "hero" },
  { href: "#personagens", label: "Personagens", section: "personagens" },
  { href: "#trailers", label: "Trailers", section: "trailers" },
  { href: "#estreia", label: "Estreia", section: "estreia" },
];

export const CHARACTERS: Character[] = [
  { name: "Mario", className: "personagem--mario", image: "assets/images/mario-original.webp", width: 520, height: 620 },
  { name: "Luigi", className: "personagem--luigi", image: "assets/images/luigi.webp", width: 440, height: 560 },
  { name: "Peach", className: "personagem--peach", image: "assets/images/peach.webp", width: 380, height: 500 },
  { name: "Rosalina", className: "personagem--rosalina", image: "assets/images/rosalina.webp", width: 400, height: 560 },
  { name: "Yoshi", className: "personagem--yoshi", image: "assets/images/yoshi-perso.webp", width: 620, height: 440 },
  { name: "Bowser Jr.", className: "personagem--bowser-jr", image: "assets/images/bowser-jr.webp", width: 420, height: 480 },
];

export const MARQUEE_TEXTS = [
  "Super Mario Galaxy",
  "Nos cinemas",
  "Uma aventura pelo cosmos",
  "Mario",
  "Luigi",
  "Rosalina",
] as const;

export const TRAILERS: Trailer[] = [
  { id: "8uaQnl9Bbdw", title: "Super Mario Galaxy: O Filme — trailer principal" },
  { id: "QVD48BOcwms", title: "The Super Mario Bros. Movie — teaser oficial" },
  { id: "TnGl01FkMMo", title: "The Super Mario Bros. Movie — trailer oficial" },
  { id: "M3bHQqc62DE", title: "The Super Mario Bros. Movie — trailer final" },
];

export const DEBUT_TARGET = new Date("2026-12-25T00:00:00").getTime();
