export const FECHA = "02/12/2023";
export const FECHA_LARGA = "2 de diciembre de 2023";
export const ANIVERSARIO = "3 años";

export type Destino = {
  slug: string;
  nombre: string;
  subtitulo: string;
  imagen: string;
  texto: string;
  etiqueta: string;
  fecha: string;
};

export const DESTINOS: Destino[] = [
  {
    slug: "gijon",
    nombre: "Gijón",
    subtitulo: "La primera escapada",
    imagen: "/img/gijon.jpg",
    texto:
      "Once grados y el Cantábrico rugiendo. Tú con el pelo revuelto por el viento y esa risa que todavía me arranca la sonrisa. Empezamos aquí, sin plan y sin miedo.",
    etiqueta: "Norte",
    fecha: "Otoño",
  },
  {
    slug: "cullera",
    nombre: "Cullera",
    subtitulo: "Agua y sal",
    imagen: "/img/cullera.jpg",
    texto:
      "Arena fina, un helado que se derritió antes de probarlo y esas noches paseando al lado del mar. Aprendí que contigo hasta lo sencillo se vuelve viaje.",
    etiqueta: "Valencia",
    fecha: "Verano",
  },
  {
    slug: "granada",
    nombre: "Granada",
    subtitulo: "Donde todo brillaba",
    imagen: "/img/granada.jpg",
    texto:
      "La Alhambra al atardecer y tú mirándola desde la torre del Carmen. Dijiste que querías vivir aquí. Yo solo pensaba en lo bien que te quedabas mirándome.",
    etiqueta: "Andalucía",
    fecha: "Primavera",
  },
  {
    slug: "costarica",
    nombre: "Costa Rica",
    subtitulo: "El viaje de los dos",
    imagen: "/img/costarica.jpg",
    texto:
      "Selva, café y un amanecer que ninguno de los dos madrugó para fotografiar. La primera vez que el mundo nos pareció demasiado grande... y aun así nos cabíamos en él.",
    etiqueta: "El mundo",
    fecha: "Siempre",
  },
  {
    slug: "cadiz",
    nombre: "Cádiz",
    subtitulo: "Nuestro anclaje",
    imagen: "/img/cadiz.jpg",
    texto:
      "La última escapada antes de volver. Calles empedradas, risas y el atardecer que nos dejó quietos en el espigón. Aquí sellamos la promesa de que esto no se acaba.",
    etiqueta: "Cádiz",
    fecha: "Desde 2023",
  },
];

export const SOBRES = [
  {
    nombre: "Italia",
    imagen: "/img/italia.jpg",
    pista: "Colinas, pizza y un treno lento entre viñedos",
    texto:
      "Roma, Florencia, el tren lento entre viñedos y un hotel con vistas que nos deja dormir poco. Te prometo cada tren, cada cena y cada atardecer.",
  },
  {
    nombre: "París",
    imagen: "/img/paris.jpg",
    pista: "Cafés, bazares y una torre Eiffel en postal",
    texto:
      "París como en las películas pero mejor: sin prisa, sin multitudes y con chocolate caliente para ti. Me encargo de cada detalle, tú solo déjate llevar.",
  },
];
