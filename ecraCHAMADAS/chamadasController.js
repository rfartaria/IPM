// controlador do ecrã HELP1

var chamadasController = {
    id: "CHAMADAS",
    url: "ecraCHAMADAS/chamadasView.html",
    css: "ecraCHAMADAS/chamadasStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-CHAMADAS"><i class="fas fa-phone-volume" style="font-size: 34pt; line-height: 70px;"></i></div>`,

    opcaoActual: undefined,

    setUp: function() {

    },

    setAccoesIniciais: function() {
        
        HUD.accoes.clickOK = function() {
            if (HUD.ecraActual) {
                if (chamadasController.opcaoActual == 0) {

                    return;
                }
                if (chamadasController.opcaoActual == 1) {

                    return;
                }
            }
        }
    
        HUD.accoes.clickBack = function() {
            if (HUD.ecraActual) {
                chamadasController.opcaoActual = undefined;
                chamadasController.updateInterface();
                HUD.setEcraInactivo();
                HUD.setAccoesPadrao();
            }
        }
    
        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                if (scrollDirectionUP) {
                    chamadasController.nextOption();
                } else {
                    chamadasController.previousOption();
                }
            }
        }
    },

    updateInterface: function() {

    },

    nextOption: function() {

    },

    previousOption: function() {
        
    }
}

