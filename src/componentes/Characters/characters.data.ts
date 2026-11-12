import ImageBowserJr from "../../assets/images/bowser-jr.webp";
import ImageLuigi from "../../assets/images/luigi.webp";
import ImageMario from "../../assets/images/mario-original.webp";
import ImagePeach from "../../assets/images/peach.webp";
import ImageRosalina from "../../assets/images/rosalina.webp";
import ImageYoshi from "../../assets/images/yoshi-perso.webp";

import type { CharacterPosition } from "./CharacterCard";

type Character = {
  id: number;
  name: string;
  src: string;
  alt: string;
  description: string;
  position: CharacterPosition;
};

const characters: Character[] = [
  {
    id: 1,
    name: "Mario",
    src: ImageMario,
    alt: "Mario",
    description: "O herói da galáxia",
    position: "mario",
  },

  {
    id: 2,
    name: "Luigi",
    src: ImageLuigi,
    alt: "Luigi",
    description: "O herói da galáxia",
    position: "luigi",
  },

  {
    id: 3,
    name: "Peach",
    src: ImagePeach,
    alt: "Peach",
    description: "A princesa do Reino dos Cogumelos",
    position: "peach",
  },

  {
    id: 4,
    name: "Rosalina",
    src: ImageRosalina,
    alt: "Rosalina",
    description: "A guardiã da galáxia",
    position: "rosalina",
  },

  {
    id: 5,
    name: "Yoshi",
    src: ImageYoshi,
    alt: "Yoshi",
    description: "O dinossauro verde",
    position: "yoshi",
  },

  {
    id: 6,
    name: "Bowser Jr",
    src: ImageBowserJr,
    alt: "Bowser Jr",
    description: "O rei dos Koopas",
    position: "bowser-jr",
  },
];

export default characters;
