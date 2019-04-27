
// singleton
var HUD = {
    estado: undefined,
    ecraActual: undefined,
    ecrasOrdem: [],
    accoes: {
        clickOK: undefined,
        clickBack: undefined,
        clickONOFF: undefined,
        scrollUp: undefined,
        sclollDown: undefined
    },

    setUp: function() {
        HUD.estado = "OFF";
        ecraActual = undefined;
    },

    // contexto controlador padrão (quando não se está "dentro" de nenhum ecrã)
    setAccoesPadrao: function() {
        
        HUD.accoes.clickOK = function() {
            if (ecraActual) {
                if (ecraActual.ID == "HELP1") {
                    //TODO: ir para ecrã help 2
                    return;
                }
                if (ecraActual.ID == "HELP2") {
                    //TODO: ir para ecrã de informações do veículo
                    return;
                }
                if (ecraActual.ID == "INFO") {
                    //TODO: ir para ecrã de informações do veículo
                    return;
                }
            }
        }
    
        HUD.accoes.clickBack = function() {
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
    
        HUD.accoes.clickONOFF = function() {
            if (HUD.estado == "OFF") {
                HUD.estado = "ON";
                //TODO: mostrar HELP
            } else {
                HUD.estado = "OFF";
                //TODO: desligar ecrã do HUD
            }
        }
    
        HUD.accoes.scrollUp = function() {
    
        }
    
        HUD.accoes.scrollDown = function() {
    
        }
    }
}
