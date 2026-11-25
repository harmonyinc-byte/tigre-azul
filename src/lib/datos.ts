import { asset } from "./assets";

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
    imagen: asset("/img/gijon.jpg"),
    texto:
      "Un amanecer en el que solo se ve el cielo y nosotros. Sin más ruido que el mar de fondo y sin ninguna prisa por ir a ningún sitio. Empezamos aquí, sin plan y sin miedo.",
    etiqueta: "Norte",
    fecha: "Otoño",
  },
  {
    slug: "cullera",
    nombre: "Cullera",
    subtitulo: "Agua y sal",
    imagen: asset("/img/cullera.jpg"),
    texto:
      "Arena fina, sol en la piel y ese beso que no queríamos que terminara. Un helado que se derritió antes de probarlo y esas noches paseando al lado del mar.",
    etiqueta: "Valencia",
    fecha: "Verano",
  },
  {
    slug: "granada",
    nombre: "Granada",
    subtitulo: "Donde todo brillaba",
    imagen: asset("/img/granada.jpg"),
    texto:
      "La Alhambra al fondo, el agua verde esmeralda y nosotros posando como si no supiéramos que nos estaban mirando. Dijiste que querías vivir aquí. Yo solo pensaba en la foto.",
    etiqueta: "Andalucía",
    fecha: "Primavera",
  },
  {
    slug: "costarica",
    nombre: "Costa Rica",
    subtitulo: "El viaje de los dos",
    imagen: asset("/img/costarica.jpg"),
    texto:
      "Piscina, agua clara y nosotros sin movernos del sitio. La primera vez que el mundo nos pareció demasiado grande... y aun así nos cabíamos en él.",
    etiqueta: "El mundo",
    fecha: "Siempre",
  },
  {
    slug: "cadiz",
    nombre: "Cádiz",
    subtitulo: "Nuestro anclaje",
    imagen: asset("/img/cadiz.jpg"),
    texto:
      "Caminando de la mano hacia el mar, sin hablar y sin mirar atrás. La última escapada antes de volver, y aquí sellamos la promesa de que esto no se acaba.",
    etiqueta: "Cádiz",
    fecha: "Desde 2023",
  },
  {
    slug: "polonia",
    nombre: "Polonia",
    subtitulo: "El viaje más inesperado",
    imagen: asset("/img/polonia.jpg"),
    texto:
      "Un palacio amarillo y blanco, un camino de adoquines y nosotros de espaldas, abrazados. El viaje más inesperado y el que más queremos repetir.",
    etiqueta: "El este",
    fecha: "A contramano",
  },
];

export const SOBRES = [
  {
    nombre: "Italia",
    imagen: asset("/img/italia.jpg"),
    pista: "Colinas, pizza y un treno lento entre viñedos",
    texto:
      "Roma, Florencia, el tren lento entre viñedos y un hotel con vistas que nos deja dormir poco. Te prometo cada tren, cada cena y cada atardecer.",
  },
  {
    nombre: "París",
    imagen: asset("/img/paris.jpg"),
    pista: "Cafés, bazares y una torre Eiffel en postal",
    texto:
      "París como en las películas pero mejor: sin prisa, sin multitudes y con chocolate caliente para ti. Me encargo de cada detalle, tú solo déjate llevar.",
  },
];
