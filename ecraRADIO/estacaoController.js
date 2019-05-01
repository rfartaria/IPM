// controlador do ecrã de ESTACAO


//INCOMPLETO E NAO TESTADO -- E PRECISO CONSEGUIR ACEDER A ESTE VIA RADIO
var estacaoController = {
    id: "ESTACAO",
    url: "ecraRADIO/estacaoView.html",
    css: "ecraRADIO/estacaoStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-ESTACAO">ESTACAO</div>`,

    estacaoActual: 0,
    estacaoAnterior: 0,
    ecraAnterior: undefined,

    setAccoesIniciais: function() {
        estacaoController.estacaoActual = 0;
        estacaoController.ecraAnterior = radioController;
        
        estacaoController.updateInterface();
        
        HUD.accoes.clickOK = function() {
            $('#estacoes-estacao li:eq('+(estacaoController.estacaoActual)+')').removeClass('ESTACAO-estacao-seleccionada');
            HUD.updateInterface();
            radioController.setAccoesIniciais();

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
            HUD.updateInterface();
            radioController.setAccoesIniciais();            
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
        var aTirar = $('#estacoes-radio li:eq('+(estacaoController.estacaoAnterior)+')');
        aTirar.removeClass('ESTACAO-estacao-seleccionada');
        //Problema curioso: Quando isto corre inicialmente, o addClass abaixo não atualiza imaediatamente. Por exemplo:
        //Ao colocar um alert vazio aqui, ele corre. Mas se nao o fizer, nao corre immediatamente. So se fizer scroll.
        //alert();
        var aSelecionar = $('#estacoes-radio li:eq('+(estacaoController.estacaoActual)+')');
        aSelecionar.addClass('ESTACAO-estacao-seleccionada');
    }
}

