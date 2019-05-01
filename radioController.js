// controlador do ecrã de RADIO

var radioController = {
    id: "RADIO",
    url: "radioView.html",
    css: "radioStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-RADIO">RADIO</div>`,

    opcaoActual: 0,
    opcoesControllers: [],

    setUp: function(){
        //Tal como em core, uma lista de dois elementos que guarda os controladores de frequencia e estacao
        radioController.opcoesControllers = [estacaoController, frequenciaController];
        radioController.setAccoesIniciais();
    },

    setAccoesIniciais: function() {
        radioController.updateInterface();
        HUD.accoes.clickOK = function() {
            if (HUD.ecraActual) {
                
                opcoesControllers[opcaoActual].setAccoesIniciais();
                //TODO: os outros ecrãs
            }
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
            $('#opcoes-radio li:eq('+(radioController.opcaoActual)+')').removeClass('RADIO-opcao-seleccionada');
            HUD.setAccoesPadrao();
        }
    },
    //nestes casos, a lista nunca mudaria no numero de opcoes, mesmo na implementacao completa -TV
    previousEstacao: function() {
        radioController.opcaoActual = 0;
        radioController.updateInterface();
    },

    nextEstacao: function() {
        radioController.opcaoActual = 1;
        radioController.updateInterface();
    },

    updateInterface: function() {

        var aTirar = $('#opcoes-radio li:eq(0)');
        aTirar.removeClass('RADIO-opcao-seleccionada');
        aTirar = $('#opcoes-radio li:eq(1)');
        aTirar.removeClass('RADIO-opcao-seleccionada');
        
        var aSelecionar = $('#opcoes-radio li:eq('+(radioController.opcaoActual)+')');
        aSelecionar.addClass('RADIO-opcao-seleccionada');
    }
}

