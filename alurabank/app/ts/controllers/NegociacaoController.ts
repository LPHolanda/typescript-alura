import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, HandlerFunction } from '../service/NegociacaoService';
import { imprime } from '../helpers/index';

export class NegociacaoController {

    //lazyloading, a variavel só é armazenada com o elemento do DOM quando a variavel é acessada
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;
    //não precisa tipar variaveis que tem um valor atribuido (o tipo sera o do valor atribuiodo)
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    private _service = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona() {

        let data = new Date(this._inputData.val().replace(/-/g, ','));
        if(!this._ehDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis');
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        imprime(negociacao, this._negociacoes);
        
        //.length = 0 é o suficiente para APAGAR todas as informações do array
        this._negociacoes.paraArray().length = 0;

        this._negociacoes.paraArray().forEach(negociacoes => {
            console.log(negociacoes);
        });

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso');
    }

    private _ehDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.Sabado || data.getDay() != DiaDaSemana.Domingo;
    }

    @throttle()
    async importaDados() {

        try {
            const negociacoesParaImportar = await this._service
                .obterNegociacoes(res => {
                    if(res.ok) {
                        return res;
                    } else {
                        throw new Error(res.statusText);
                    }
                })
    
            const negociacoesJaImportadas = this._negociacoes.paraArray();
    
            negociacoesParaImportar
                .filter(negociacao => 
                    !negociacoesJaImportadas.some(jaImportada => 
                        negociacao.ehIgual(jaImportada)))
    
                .forEach(negociacao => 
                    this._negociacoes.adiciona(negociacao))
    
            this._negociacoesView.update(this._negociacoes);

        } catch(err) {
            this._mensagemView.update(err.message);
        }
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}