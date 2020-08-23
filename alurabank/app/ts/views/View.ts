//declarado $ do jQuery para "calar" a boca do compilador
// declare var $: any;


import { logarTempoDeExecucao } from '../helpers/decorators/index';

// abstract é usado para que não seja possível criar uma instancia de view, 
// ja que ela precisa que as classes filhas possuam o método template
export abstract class View<T> {

    private _elemento: JQuery;
    
    private _escapar: boolean;

    // escapar?: boolean - é um parametro opcional, tem como valor default undefined
    // deve ser declarado no construtor SEMPRE POR ULTIMO.
    constructor(seletor: string, escapar: boolean = false) {
        this._elemento = $(seletor);
        this._escapar = escapar;
    }

    @logarTempoDeExecucao(true)
    update(model: T): void {

        let template = this.template(model);
        if(this._escapar){
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }

        this._elemento.html(this.template(model));
    } 

    //abstract obriga a classe filha a implementar o método template
    abstract template(model: T): string;
}

