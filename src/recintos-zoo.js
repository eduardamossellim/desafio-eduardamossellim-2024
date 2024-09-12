import { imprimirRecintosViaveis } from "./functions.js";
import { validarAnimal, validarQuantidade, validarRecinto, retornarErroRecinto } from "./functions-validacao.js";

class RecintosZoo {
    constructor() {
        this.recintos = [
            { nome: 'savana', tamanho_total: 10, animais_existentes: { MACACO: 3 } },
            { nome: 'floresta', tamanho_total: 5, animais_existentes: {} },
            { nome: 'savana e rio', tamanho_total: 7, animais_existentes: { GAZELA: 1 } },
            { nome: 'rio', tamanho_total: 8, animais_existentes: {} },
            { nome: 'savana', tamanho_total: 9, animais_existentes: { LEAO: 1 } },
        ];

        this.listaAnimais = [
            { animal: "LEAO", tamanho: 3 },
            { animal: "LEOPARDO", tamanho: 2 },
            { animal: "CROCODILO", tamanho: 3 },
            { animal: "MACACO", tamanho: 1 },
            { animal: "GAZELA", tamanho: 2 },
            { animal: "HIPOPOTAMO", tamanho: 4 },
        ];
    }

    analisaRecintos(animal, quantidade) {
        
        const resultadoAnimal = validarAnimal(animal, this.listaAnimais);
        if (resultadoAnimal.erro) { return resultadoAnimal; }

        
        const resultadoQuantidade = validarQuantidade(quantidade);
        if (resultadoQuantidade.erro) { return resultadoQuantidade; }

       
        const resultadoRecinto = validarRecinto(animal, quantidade);
        if (resultadoRecinto.erro) { return resultadoRecinto; }

        
        let recintosViaveis = imprimirRecintosViaveis(animal, quantidade, this.recintos, this.listaAnimais);
        return { erro: false, recintosViaveis: recintosViaveis.recintosViaveis };
    };

}

const zoo = new RecintosZoo();
const animal1 = zoo.analisaRecintos("MACACO", 5);
console.log(animal1.recintosViaveis);

export { RecintosZoo as RecintosZoo };
