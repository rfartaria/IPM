
// singleton
var HUD = {
    estado: undefined,
    ecraActual: undefined,
    ecrasOrdem: [],
    accoes: {
        clickOK: undefined,
        clickBack: undefined,
        clickONOFF: undefined,
        scroll: undefined,
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

    nextEcra: function() {
        var i = HUD.ecrasOrdem.indexOf(HUD.ecraActual);
        if (i>=0 && i<HUD.ecrasOrdem.length-1) {
            HUD.ecraActual = HUD.ecrasOrdem[i+1];
        }
        HUD.updateInterface();
    },

    previousEcra: function() {
        var i = HUD.ecrasOrdem.indexOf(HUD.ecraActual);
        if (i>0) {
            HUD.ecraActual = HUD.ecrasOrdem[i-1];
        }
        HUD.updateInterface();
    },

    loadEcrasPadrao: function() {
        HUD.ecrasOrdem = [ infoVeiculoController, radioController, chamadasController, gpsController ]
        HUD.ecraActual = infoVeiculoController;
        HUD.updateInterface();
    },

    // contexto controlador padrão (quando não se está "dentro" de nenhum ecrã)
    setAccoesPadrao: function() {
        
        HUD.accoes.clickOK = function() {
            if (HUD.ecraActual) {
                if (HUD.ecraActual.id == "HELP1") {
                    HUD.nextEcra();
                    return;
                }
                if (HUD.ecraActual.id == "HELP2") {
                    HUD.loadEcrasPadrao();
                    return;
                }
                if (HUD.ecraActual.id == "INFO") {
                    //TODO: ir para ecrã seguinte
                    return;
                }
            }
        }
    
        HUD.accoes.clickBack = function() {
            if (HUD.ecraActual) {
                if (HUD.ecraActual.id == "HELP1") {
                    HUD.nextEcra();
                    return;
                }
                if (HUD.ecraActual.id == "HELP2") {
                    HUD.loadEcrasPadrao();
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
    
        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                if (scrollDirectionUP) {
                    HUD.previousEcra();
                } else {
                    HUD.nextEcra();
                }
            }
        }
    },

    loadView: function(ecra) {
        alert("loadView");
    },

    updateInterface: function() {
        // colocar os icons dos ecrãs registados
        $('#hud-icons-container').html(HUD.ecrasOrdem.map((c) => {return c.iconHtml}).join(''));
        // mudar a classe do icon do ecrã que está activo
        if (HUD.ecraActual)
            $('#icon-ecra-'+HUD.ecraActual.id).addClass("hud-icon-active");
        // carregar view do ecrã activo
        HUD.loadView(HUD.ecraActual);
    }
}

