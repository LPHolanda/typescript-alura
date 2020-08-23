export function logarTempoDeExecucao(emSegundos: boolean = false) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        //descriptor.value - da acesso a implementação do metodo decorado
        const metodoOriginal = descriptor.value;

        //...args: any[] - nao se sabe quantos parametros o metodo recebe, assim funciona com 1, 2, 3, ...
        descriptor.value = function(...args: any[]) {

            let unidade = 'ms';
            let divisor = 1;
            if(emSegundos) {
                unidade = 's';
                divisor = 1000;
            }

            console.log("=================================");
            console.log(`parâmetros passados para o método ${propertyKey}: ${JSON.stringify(args)}`)

            const t1 = performance.now();

            //apply - está chamando o método original, com os seus parametros necessários em args
            const retorno = metodoOriginal.apply(this, args);

            const t2 = performance.now();

            console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
            console.log(`O método ${propertyKey} demorou: ${(t2 - t1/divisor)} ${unidade}`);
            console.log("=================================");

            return retorno;
        }

        return descriptor;
    }
}