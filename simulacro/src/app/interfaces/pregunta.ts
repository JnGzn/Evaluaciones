
export interface Pregunta {
  id: string;
  enunciado: string;
  componente?: Componente;
  opciones?: string[];
  repuesta?: Respuesta;
}

export interface Opciones {
  id: string;
  opcionA: string;
  opcionB: string;
  opcionC: string;
  opcionD: string;
}

export interface Respuesta {
  id: string;
  idPregunta: string;
  respuesta: string;
}

export interface Examen {
  id: string;
  componentes: Componente[];
  preguntas?: Pregunta[];
  respuesta?: Respuesta[];
}

export interface Componente {
  id: string;
  nombre: string;
  duracionMinutos: number;
  cantPreguntas: number;
}
