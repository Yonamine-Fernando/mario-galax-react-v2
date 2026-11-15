type ParticlesInstance = {
  pJS: {
    canvas: {
      el: HTMLCanvasElement;
    };
    fn: {
      drawAnimFrame?: number;
      vendors: {
        destroypJS: () => void;
        draw: () => void;
      };
    };
  };
};

declare global {
  interface Window {
    particlesJS: (tagId: string, params: object) => void;
    pJSDom: ParticlesInstance[] | null;
  }
}

export {};
