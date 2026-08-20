const gallery = (slug, count) =>
  Array.from(
    { length: count },
    (_, i) => `/media/${slug}/${String(i + 1).padStart(2, "0")}.webp`
  );

export const properties = [
  {
    id: "villa-aboim",
    slug: "villa-aboim",
    name: "Villa Aboim",
    location_pt: "Amarante, Portugal",
    location_en: "Amarante, Portugal",
    tagline_pt: "Espaço para estar, tempo para ficar",
    tagline_en: "Room to gather, time to stay",
    description_pt: "Uma villa de dois pisos pensada para famílias e grupos, onde os espaços amplos, a piscina e as zonas exteriores criam o cenário ideal para descansar, conviver e aproveitar Amarante sem pressa.",
    description_en: "A two-storey villa designed for families and groups, where generous interiors, the pool and outdoor areas create the perfect setting to rest, gather and enjoy Amarante at an unhurried pace.",
    guests: "12",
    bedrooms: "6",
    bathrooms: "4",
    video_url: "/media/videos/aboim.mp4",
    hero_image: "/media/aboim/20.webp",
    gallery: gallery("aboim", 93),
    map_query: "Amarante, Portugal",
    whatsapp: "351922013541",
    instagram: "@amarante.villas",
    email: "geral@unexpecteddays.pt",
    amenities: [
      { pt: "Piscina", en: "Pool" },
      { pt: "2 pisos", en: "Two floors" },
      { pt: "Salão de bilhar", en: "Billiards room" },
      { pt: "Zona de refeições com churrasqueira", en: "Outdoor dining area with barbecue" },
      { pt: "Espaço verde", en: "Garden" },
      { pt: "Baloiços", en: "Swings" },
      { pt: "Chuveiros exteriores", en: "Outdoor showers" },
      { pt: "WC exterior", en: "Outdoor WC" },
      { pt: "Estacionamento dentro da propriedade", en: "Private on-site parking" },
      { pt: "Wi-Fi", en: "Wi-Fi" },
      { pt: "Ar condicionado em todas as divisões", en: "Air conditioning throughout" },
      { pt: "Cozinha completamente equipada", en: "Fully equipped kitchen" },
      { pt: "TV nos quartos", en: "TVs in the bedrooms" },
    ],
    layout: {
      pt: [
        {
          title: "Primeiro piso",
          items: [
            "Cozinha completa",
            "Sala de estar",
            "Uma suite de casal",
            "Dois quartos de casal com casa de banho completa partilhada",
          ],
        },
        {
          title: "Segundo piso",
          items: [
            "Uma suite de casal",
            "Dois quartos — um de casal e um de solteiro — com casa de banho partilhada",
            "Uma divisória com sofá onde pode dormir uma pessoa",
          ],
        },
      ],
      en: [
        {
          title: "First floor",
          items: [
            "Fully equipped kitchen",
            "Living room",
            "One double suite",
            "Two double bedrooms sharing a full bathroom",
          ],
        },
        {
          title: "Second floor",
          items: [
            "One double suite",
            "Two bedrooms — one double and one single — sharing a bathroom",
            "A separate nook with a sofa that can sleep one guest",
          ],
        },
      ],
    },
    highlights: [
      {
        title_pt: "Para estar juntos",
        title_en: "Made for gathering",
        body_pt: "Capacidade para 12 pessoas e vários ambientes para partilhar refeições, conversas e dias inteiros sem pressa.",
        body_en: "Space for up to 12 guests, with several settings for shared meals, long conversations and slow days together.",
      },
      {
        title_pt: "Dentro e fora",
        title_en: "Inside and out",
        body_pt: "Piscina, jardim, churrasqueira, baloiços e zonas de lazer prolongam a casa para o exterior.",
        body_en: "Pool, garden, barbecue, swings and leisure areas extend the home naturally into the outdoors.",
      },
      {
        title_pt: "Conforto completo",
        title_en: "Complete comfort",
        body_pt: "Ar condicionado, cozinha equipada, estacionamento privado e TV nos quartos para uma estadia simples e confortável.",
        body_en: "Air conditioning, a fully equipped kitchen, private parking and bedroom TVs make every stay effortless and comfortable.",
      },
    ],
    services: [],
    published: true,
    order: 1,
  },
  {
    id: "casa-fregim",
    slug: "casa-fregim",
    name: "Casa Fregim",
    location_pt: "Rua das Abrunheiras n.º 206, 4600-566 Fregim – Amarante",
    location_en: "Rua das Abrunheiras no. 206, 4600-566 Fregim – Amarante",
    tagline_pt: "Um refúgio térreo entre conforto e natureza",
    tagline_en: "A single-storey retreat shaped by comfort and nature",
    description_pt: "Uma moradia térrea para até 8 pessoas, pensada para dias tranquilos entre a piscina aquecida, o jardim e os espaços de convívio. Tudo num só piso, com conforto em cada divisão e uma forte ligação ao exterior.",
    description_en: "A single-storey home for up to 8 guests, designed for relaxed days between the heated pool, garden and social spaces. Everything is on one level, with comfort throughout and a strong connection to the outdoors.",
    guests: "8",
    bedrooms: "3",
    bathrooms: "2",
    video_url: "/media/videos/fregim.mp4",
    hero_image: "/media/fregim/01.webp",
    gallery: gallery("fregim", 39),
    map_query: "Rua das Abrunheiras 206, 4600-566 Fregim, Amarante, Portugal",
    whatsapp: "351922013541",
    instagram: "@amarante.villas",
    email: "geral@unexpecteddays.pt",
    amenities: [
      { pt: "Piscina aquecida", en: "Heated pool" },
      { pt: "Moradia térrea", en: "Single-storey home" },
      { pt: "Mobiliário de descanso e lazer exterior", en: "Outdoor lounge furniture" },
      { pt: "Zona de refeições com churrasqueira e forno a lenha", en: "Dining area with barbecue and wood-fired oven" },
      { pt: "Espaço verde", en: "Garden" },
      { pt: "Chuveiros exteriores com água aquecida", en: "Heated outdoor showers" },
      { pt: "WC exterior", en: "Outdoor WC" },
      { pt: "Estacionamento dentro da propriedade", en: "Private on-site parking" },
      { pt: "Pet friendly", en: "Pet friendly" },
      { pt: "Wi-Fi", en: "Wi-Fi" },
      { pt: "Ar condicionado em todas as divisões", en: "Air conditioning throughout" },
      { pt: "Cozinha completamente equipada", en: "Fully equipped kitchen" },
      { pt: "TV nos quartos", en: "TVs in the bedrooms" },
    ],
    layout: {
      pt: [
        {
          title: "A casa",
          items: [
            "Sala de estar com sofá-cama de casal",
            "Uma suite de casal",
            "Dois quartos de casal com casa de banho completa partilhada",
            "Cozinha completa",
          ],
        },
      ],
      en: [
        {
          title: "The house",
          items: [
            "Living room with a double sofa bed",
            "One double suite",
            "Two double bedrooms sharing a full bathroom",
            "Fully equipped kitchen",
          ],
        },
      ],
    },
    highlights: [
      {
        title_pt: "Tudo num só piso",
        title_en: "Everything on one level",
        body_pt: "Uma moradia térrea de circulação simples, ideal para dias descontraídos em família ou entre amigos.",
        body_en: "An easy-flow single-storey home, ideal for relaxed stays with family or friends.",
      },
      {
        title_pt: "Piscina todo o ano",
        title_en: "Pool time, extended",
        body_pt: "A piscina aquecida e os chuveiros exteriores com água quente tornam o exterior ainda mais confortável.",
        body_en: "A heated pool and warm outdoor showers make the exterior spaces even more inviting.",
      },
      {
        title_pt: "Vida ao ar livre",
        title_en: "Outdoor living",
        body_pt: "Jardim, zona de refeições, churrasqueira e forno a lenha criam um espaço pensado para aproveitar o dia lá fora.",
        body_en: "Garden, dining area, barbecue and wood-fired oven create a setting made for long days outdoors.",
      },
    ],
    services: [
      { pt: "Toalhas de piscina", en: "Pool towels" },
      { pt: "Toalhas de rosto e banho", en: "Face and bath towels" },
      { pt: "Roupões", en: "Bathrobes" },
      { pt: "Produtos de higiene", en: "Toiletries" },
      { pt: "Pequeno-almoço mediante pagamento extra", en: "Breakfast available for an additional fee" },
    ],
    published: true,
    order: 2,
  },
  // Duas novas propriedades podem ser adicionadas aqui no futuro sem alterar o layout.
];

export const getPropertyBySlug = (slug) =>
  properties.find((p) => p.slug === slug && p.published) || null;
