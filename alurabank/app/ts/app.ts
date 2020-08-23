import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

//mesmo código sem o JQuery
// document.querySelector('.form').addEventListener('submit', controller.adiciona.bind(controller));
$('.form').submit(controller.adiciona.bind(controller));
$('#botao-importa').click(controller.importaDados.bind(controller));