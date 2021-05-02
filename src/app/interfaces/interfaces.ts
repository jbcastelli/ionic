export interface Componentes { // creo la interface para el tipo de datos
    icono: string;
    nombre: string;
    direccion: string;
}

export interface RespuestaTopHeadLines {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: Source;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content?: string;
}

export interface Source {
  id?: string;
  name: string;
}
