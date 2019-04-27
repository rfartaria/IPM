
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
        HUD.setAccoesPadrao();
    },

    turnON: function() {
        alert("Oh, Its ON!")
        HUD.estado = "ON";
        HUD.ecrasOrdem = [ help1Controller ];
        HUD.updateInterface();
    },

    turnOFF: function() {
        alert("Bye bye!")
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
                    //TODO: ir para ecrã seguinte
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
                HUD.turnON();
            } else {
                HUD.turnOFF()
            }
        }
    
        HUD.accoes.scrollUp = function() {
    
        }
    
        HUD.accoes.scrollDown = function() {
    
        }
    },


    updateInterface: function() {
        
    }
}

