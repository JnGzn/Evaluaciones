export interface Pregunta {
  id: string;
  enunciado: string;
  opciones: string[];
  repuesta?: Respuesta
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
