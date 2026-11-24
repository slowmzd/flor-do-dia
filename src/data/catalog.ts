export const occasions = [
  "Aniversários",
  "Romance",
  "Dia das Mães",
  "Dia dos Namorados",
  "Agradecimentos",
  "Surpresas especiais",
];
export const categories = ["Buquês", "Rosas", "Girassóis", "Cartões"];
export type Product = {
  id: string;
  name: string;
  cat: string;
  desc: string;
  oc: number[];
  photo: string;
  price: number | null;
};
export const products: Product[] = [
  [
    "buque-de-rosas",
    "Buquê de rosas vermelhas",
    "Buquês",
    "Rosas vermelhas envolvidas em kraft e finalizadas com laço para um gesto de carinho.",
    [0, 1, 2, 3],
  ],
  [
    "rosa-individual",
    "Rosa individual embalada",
    "Rosas",
    "Uma rosa vermelha com embalagem transparente e laço delicado.",
    [0, 1, 3, 4, 5],
  ],
  [
    "arranjo-de-girassol",
    "Arranjo de girassol",
    "Girassóis",
    "Girassol com folhagens, embalagem clara e laço rosa.",
    [0, 2, 4, 5],
  ],
  [
    "cartao-romantico",
    "Cartão romântico",
    "Cartões",
    "Cartão vermelho com coração dourado para acompanhar suas flores.",
    [1, 3, 5],
  ],
  [
    "cartao-musical",
    "Cartão com mensagem musical",
    "Cartões",
    "Um trecho de música para acompanhar o presente e expressar o que você sente.",
    [0, 1, 3, 4],
  ],
  [
    "buque-variado",
    "Buquê de flores variadas",
    "Buquês",
    "Flores variadas em uma composição delicada. Consulte as flores disponíveis na data desejada.",
    [0, 2, 4, 5],
  ],
].map(([id, name, cat, desc, oc]) => ({
  id: String(id),
  name: String(name),
  cat: String(cat),
  desc: String(desc),
  oc: oc as number[],
  photo: "/images/" + id + ".jpg",
  price: null,
}));
