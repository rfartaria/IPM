
function Ecra(nome) {
    this.nome = nome;
}

var HUD = {
    estado: "OFF",
    ecraActual: undefined,
    ecrasOrdem: [],
    controlador: {
        clickOK: undefined,
        clickBack: undefined,
        clickONOFF: undefined,
        scrollUp: undefined,
        sclollDown: undefined
    },
}

// contexto controlador padrão
function SetControladorPadrao() {
    
    HUD.controlador.clickOK = function() {
        if (ecra) {
            if (ecraActual.ID == "HELP1") {
                //TODO: ir para ecrã help 2
                return;
            }
            if (ecraActual.ID == "HELP2") {
                //TODO: ir para ecrã de informações do veículo
                return;
            }
        }
    }

    HUD.controlador.clickBack = function() {
        if (ecra) {
            if (ecra.ID == "HELP1") {
                //TODO: ir para ecrã help 2
                return;
            }
            if (ecra.ID == "HELP2") {
                //TODO: ir para ecrã de informações do veículo
                return;
            }
        }
    }

    HUD.controlador.clickONOFF = function() {
        if (HUD.estado == "OFF") {
            HUD.estado = "ON";
            //TODO: mostrar HELP
        } else {
            HUD.estado = "OFF";
            //TODO: desligar ecrã do HUD
        }
    }

    HUD.controlador.scrollUp = function() {

    }

    HUD.controlador.scrollDown = function() {

    }

}

