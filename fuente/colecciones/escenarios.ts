import { Directus, ID } from '@directus/sdk';
import { CastingContext } from 'csv-parse/.';
import { ColeccionesArca } from '../tipos';
import { flujoCSV, procesarCSV } from '../utilidades/ayudas';
import { Obra } from './obras';

export type Escenario = {
  id?: ID;
  nombre: string;
  obras?: Obra[];
};

export type EscenarioFuente = {
  id: number;
  name: string;
};

function limpieza(valor: string, contexto: CastingContext): string {
  const columna = contexto.column as keyof EscenarioFuente;

  if (columna === 'name') {
    return valor.trim();
  }

  return valor;
}

function procesar({ name }: EscenarioFuente): Escenario {
  return { nombre: name };
}

export default async (directus: Directus<ColeccionesArca>) => {
  const flujo = flujoCSV('Arca - Escenario_2_Lista', limpieza);
  await procesarCSV('escenarios', directus, flujo, procesar);
};
