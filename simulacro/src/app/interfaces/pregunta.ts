
export interface Pregunta {
  id: string;
  enunciado: string;
  respuesta: string;
  opciones?: string[];
}

export interface Opciones {
  id: string;
  opcionA: string;
  opcionB: string;
  opcionC: string;
  opcionD: string;
}

export interface Examen {
  id: string;
  componentes: Componente[];
  duracionMinutos: number;
  preguntas?: Pregunta[];
}

export interface Componente {
  id: string;
  nombre: string;

  cantPreguntas: number;
}
