// controlador do ecrã de RADIO

var radioController = {
    id: "RADIO",
    url: "radioView.html",
    css: "radioStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-RADIO">RADIO</div>`,

    estacaoActual: 0,
    estacaoAnterior: 0,

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
            $('#estacoes-radio li:eq('+(radioController.estacaoActual)+')').removeClass('RADIO-estacao-seleccionada');
            HUD.setAccoesPadrao();
        }
    },

    previousEstacao: function() {
        if(radioController.estacaoActual > 0){
            radioController.estacaoAnterior = radioController.estacaoActual;
            radioController.estacaoActual--;
            radioController.updateInterface();
        }
    },

    nextEstacao: function() {
        if(radioController.estacaoActual < 3){
            radioController.estacaoAnterior = radioController.estacaoActual;
            radioController.estacaoActual++;
            radioController.updateInterface();
        }
    },

    updateInterface: function() {
        var aTirar = $('#estacoes-radio li:eq('+(radioController.estacaoAnterior)+')');
        aTirar.removeClass('RADIO-estacao-seleccionada');
        var aSelecionar = $('#estacoes-radio li:eq('+(radioController.estacaoActual)+')');
        aSelecionar.addClass('RADIO-estacao-seleccionada');
    }
}

