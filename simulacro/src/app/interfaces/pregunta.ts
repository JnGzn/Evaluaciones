
export interface Pregunta {
  id: string;
  enunciado: string;
  respuesta: string;
  opciones?: string[];
  idComponente?: string;
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
  nombre: string;
  duracionMinutos: number;
}

export interface Componente {
  id: string;
  nombre: string;
  cantPreguntas?: number;
  preguntas?: Pregunta[];
  idExamen?: string;
}
