// controlador do ecrã de ESTACAO


//INCOMPLETO E NAO TESTADO -- E PRECISO CONSEGUIR ACEDER A ESTE VIA RADIO
var estacaoController = {
    id: "ESTACAO",
    url: "estacaoView.html",
    css: "estacaoStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-ESTACAO">ESTACAO</div>`,

    estacaoActual: 0,
    estacaoAnterior: 0,

    setAccoesIniciais: function() {
        estacaoController.updateInterface();
        HUD.accoes.clickOK = function() {
            
        }

        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                if (scrollDirectionUP) {
                    estacaoController.previousEstacao();
                } else {
                    estacaoController.nextEstacao();
                }
            }
        }

        HUD.accoes.clickBack = function() {
            $('#estacoes-estacao li:eq('+(estacaoController.estacaoActual)+')').removeClass('ESTACAO-estacao-seleccionada');
            HUD.setAccoesPadrao();
        }
    },

    previousEstacao: function() {
        if(estacaoController.estacaoActual > 0){
            estacaoController.estacaoAnterior = estacaoController.estacaoActual;
            estacaoController.estacaoActual--;
            estacaoController.updateInterface();
        }
    },

    nextEstacao: function() {
        //assumindo lista fixa de estacoes para propositos de prototipo, usar o 3 fixo funciona -TV
        if(estacaoController.estacaoActual < 3){
            estacaoController.estacaoAnterior = estacaoController.estacaoActual;
            estacaoController.estacaoActual++;
            estacaoController.updateInterface();
        }
    },

    updateInterface: function() {
        var aTirar = $('#estacoes-estacao li:eq('+(estacaoController.estacaoAnterior)+')');
        aTirar.removeClass('ESTACAO-estacao-seleccionada');
        var aSelecionar = $('#estacoes-ESTACAO li:eq('+(estacaoController.estacaoActual)+')');
        aSelecionar.addClass('ESTACAO-estacao-seleccionada');
    }
}

