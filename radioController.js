// controlador do ecrã HELP1

var radioController = {
    id: "RADIO",
    url: "radioView.html",
    css: "radioStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-RADIO">RADIO</div>`,

    estacaoActual: 0,

    setAccoesIniciais: function() {
        radioController.updateInterface();
        HUD.accoes.clickOK = function() {
            
        }

        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                if (scrollDirectionUP) {
                    radioController.previousEstacao();
                } else {
                    radioController.nextEstacao();
                }
            }
        }

        HUD.accoes.clickBack = function() {
            HUD.setAccoesPadrao();
        }
    },

    previousEstacao: function() {
        if(estacaoActual != 0){
            estacaoActual--;
            radioController.updateInterface();
        }
    },

    nextEstacao: function() {
        if(estacaoActual != 4){
            estacaoActual++;
            radioController.updateInterface();
        }
    },

    updateInterface: function() {
        $('#estacoes-radio li['+estacaoActual+']').addClass('RADIO-estacao-seleccionada');
    }
}

