export function throttle(milisegundos = 500) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        //descriptor.value - da acesso a implementação do metodo decorado
        const metodoOriginal = descriptor.value;
        let timer = 0;

        //...args: any[] - nao se sabe quantos parametros o metodo recebe, assim funciona com 1, 2, 3, ...
        descriptor.value = function(...args: any[]) {
            if(event) event.preventDefault();

            clearInterval(timer)
            timer = setTimeout(() => {
                //apply - está chamando o método original, com os seus parametros necessários em args
                metodoOriginal.apply(this, args);
                
            }, milisegundos);

        }

        return descriptor;
    }
}