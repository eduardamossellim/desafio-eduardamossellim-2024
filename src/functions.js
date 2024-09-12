// Função auxiliar para processar recintos
function processarRecintosViaveis(animal, quantidade, recintos, listaAnimais, regraEspecifica) {
    let recintosViaveis = regraEspecifica(animal, quantidade, recintos);
    let tamanhoTotalDoAnimal = getTamanhoDoAnimal(animal, quantidade, listaAnimais);

    return recintosViaveis.map((recinto) => {
        let tamanhoTotal = recinto.tamanho_total;
        let espacoLivreRecinto = regraMaisDeUmAnimalDiferente(animal, recinto);
        let espacoOcupado = calcularEspacoOcupado(recinto, listaAnimais);
        let espaçoLivre = tamanhoTotal - tamanhoTotalDoAnimal - espacoOcupado - espacoLivreRecinto;

        return espaçoLivre < 0
            ? `Recinto ${recintos.indexOf(recinto) + 1} não viável...`
            : `Recinto ${recintos.indexOf(recinto) + 1} (espaço livre: ${espaçoLivre} total: ${tamanhoTotal})`;
    });
}

// Função principal para imprimir recintos viáveis
export function imprimirRecintosViaveis(animal, quantidade, recintos, listaAnimais) {
    let regraEspecifica;

    switch (animal) {
        case "LEAO":
        case "LEOPARDO":
        case "CROCODILO":
            regraEspecifica = (animal, quantidade, recintos) => animalCarnivoro(animal, recintos);
            break;
        case "MACACO":
            regraEspecifica = (animal, quantidade, recintos) => regraMacacos(animal, quantidade, recintos);
            break;
        case "GAZELA":
            regraEspecifica = (animal, quantidade, recintos) => regraGazela(animal, recintos);
            break;
        case "HIPOPOTAMO":
            regraEspecifica = (animal, quantidade, recintos) => regraHipopotamo(animal, recintos);
            break;
        default:
            return {
                erro: "Animal não reconhecido",
                recintosViaveis: [],
                tamanhoRecintosViaveis: 0
            };
    }

    let recintosViaveis = processarRecintosViaveis(animal, quantidade, recintos, listaAnimais, regraEspecifica);

    return {
        erro: false,
        recintosViaveis,
        tamanhoRecintosViaveis: recintosViaveis.length
    };
}

export function getTamanhoDoAnimal(animal, quantidade, listaAnimais) {
    let tamanhoDoAnimal = listaAnimais.find(a => a.animal === animal).tamanho;
    return tamanhoDoAnimal * quantidade;
}

export function calcularEspacoOcupado(recintos, listaAnimais) {
    let espacoOcupadoNoRecinto = 0;
    for (let animal in recintos.animais_existentes) {
        let quantidade = recintos.animais_existentes[animal];
        let tamanhoAnimal = listaAnimais.find(a => a.animal === animal).tamanho;
        espacoOcupadoNoRecinto += quantidade * tamanhoAnimal;
    }
    return espacoOcupadoNoRecinto;
}

export function animalCarnivoro(animal, recintos) {
    if (animal === "LEAO") {
        return [recintos[4]];
    }
    if (animal === "LEOPARDO") {
        return retornarErroRecinto();
    }
    if (animal === "CROCODILO") {
        return [recintos[3]];
    }
    return [];
}

export function regraMaisDeUmAnimalDiferente(animal, recinto) {
    return Object.keys(recinto.animais_existentes).some(tipoAnimal => tipoAnimal !== animal) ? 1 : 0;
}

export function regraMacacos(animal, quantidade, recintos) {
    return quantidade === 1 ? [recintos[0]] : [recintos[0], recintos[1], recintos[2]];
}

export function regraGazela(animal, recintos) {
    return animal === "GAZELA" ? [recintos[0], recintos[2]] : [];
}

export function regraHipopotamo(animal, recintos) {
    return animal === "HIPOPOTAMO" ? [recintos[2]] : [];
}



