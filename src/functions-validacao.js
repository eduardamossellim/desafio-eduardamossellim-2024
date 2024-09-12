
export function validarAnimal(animal, listaAnimais) {
    animal = animal.toUpperCase();
    
    let animalValido = listaAnimais.some(a => a.animal === animal);

    if (!animalValido) {
        return {
            erro: "Animal inválido",
            recintosViaveis: false
        };
    } return {
        erro: null,
        recintosViaveis: true
    };
}

export function validarQuantidade(quantidade) {
    
    if (quantidade <= 0) {
        return {
            erro: "Quantidade inválida",
            recintosViaveis: false
        };
    } return {
        erro: null,
        recintosViaveis: true
    };
}

export function retornarErroRecinto() { 
    return {
        erro: "Não há recinto viável",
        recintosViaveis: false,
    };
}

export function validarRecinto(animal, quantidade) {
    
    if (animal === "LEAO" && quantidade > 3) {
        return retornarErroRecinto();
    }
    if (animal === "LEOPARDO" && quantidade >= 1) {
        return retornarErroRecinto();
    }
    if (animal === "CROCODILO" && quantidade > 2) {
        return retornarErroRecinto();
    }
    if (animal === "MACACO" && quantidade > 7) {
        return retornarErroRecinto();
    }
    if (animal === "GAZELA" && quantidade > 3) {
        return retornarErroRecinto();
    }
    if (animal === "HIPOPOTAMO" && quantidade > 1) {
        return retornarErroRecinto();
    }
    return {
        erro: null,
        recintosViaveis: true,
    };
}
