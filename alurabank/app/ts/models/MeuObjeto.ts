import { Imprimivel } from './Imprimivel';
import { Igualavel } from './Igualavel';

export interface MeuObjeto<T> extends Imprimivel, Igualavel<T> {

}