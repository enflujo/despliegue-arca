import { Directus, ID } from '@directus/sdk';
import { CastingContext } from 'csv-parse/.';
import { ColeccionesArca } from '../tipos';
import { flujoCSV, procesarCSV } from '../utilidades/ayudas';
import { Obra } from './obras';

export type Objeto = {
  id?: ID;
  nombre: string;
  obras?: Obra[];
};

export type ObjetoFuente = {
  id: number;
  nombre: string;
};

function limpieza(valor: string, contexto: CastingContext): string {
  const columna = contexto.column as keyof ObjetoFuente;

  if (columna === 'nombre') {
    return valor.trim();
  }

  return valor;
}

function procesar({ nombre }: ObjetoFuente): Objeto {
  return { nombre };
}

export default async (directus: Directus<ColeccionesArca>) => {
  const flujo = flujoCSV('Arca - Objetos_gestos_lista', limpieza);
  await procesarCSV('objetos', directus, flujo, procesar);
};
