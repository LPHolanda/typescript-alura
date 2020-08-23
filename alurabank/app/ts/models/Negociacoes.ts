import { Negociacao } from './Negociacao';
import { MeuObjeto } from './MeuObjeto';

export class Negociacoes implements MeuObjeto<Negociacoes> {
    
    private _negociacoes: Negociacao[] = [];
    
    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {
        // [].concat cria uma referencia interna do array para que ele não possa ser alterado por outra classe
        // ([] as Negociacao[]) - para escapar do strictNullChecks, assim nunca vai retornar um null ou undefined
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {
        console.log("Impressão");
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negociacoes: Negociacoes): boolean {

        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray())
    }
}