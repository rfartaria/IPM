
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
        HUD.ecrasOrdem = [];
        HUD.ecraActual = null;
        HUD.setAccoesPadrao();
    },

    turnON: function() {
        HUD.estado = "ON";
        HUD.ecrasOrdem = [ help1Controller, help2Controller ];
        HUD.ecraActual = help1Controller;
        HUD.updateInterface();
    },
    
    turnOFF: function() {
        HUD.setUp();
        HUD.updateInterface();
    },

    // contexto controlador padrão (quando não se está "dentro" de nenhum ecrã)
    setAccoesPadrao: function() {
        
        HUD.accoes.clickOK = function() {
            if (ecraActual) {
                if (ecraActual.id == "HELP1") {
                    //TODO: ir para ecrã help 2
                    return;
                }
                if (ecraActual.id == "HELP2") {
                    //TODO: ir para ecrã de informações do veículo
                    return;
                }
                if (ecraActual.id == "INFO") {
                    //TODO: ir para ecrã seguinte
                    return;
                }
            }
        }
    
        HUD.accoes.clickBack = function() {
            if (ecra) {
                if (ecra.id == "HELP1") {
                    //TODO: ir para ecrã help 2
                    return;
                }
                if (ecra.id == "HELP2") {
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
        // colocar os icons dos ecrãs registados
        $('#hud-icons-container').html(HUD.ecrasOrdem.map((c) => {return c.iconHtml}).join(''));
        // mudar a classe do icon do ecrã que está activo
        if (HUD.ecraActual)
            $('#icon-ecra-'+HUD.ecraActual.id).addClass("hud-icon-active");
    }
}

