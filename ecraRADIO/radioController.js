// controlador do ecrã de RADIO

var radioController = {
    id: "RADIO",
    url: "ecraRADIO/radioView.html",
    css: "ecraRADIO/radioStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-RADIO"><img src="img/radio.svg" style="width:50px; padding-top:5px;"></div>`,

    estacaoAtual: undefined,
    opcaoActual: undefined,
    opcoesControllers: [],

    //Coloca as variaveis iniciais (o acima devia faze-lo?)
    setUp: function(){
        //Tal como em core, uma lista de dois elementos que guarda os controladores de frequencia e estacao
        radioController.opcoesControllers = [ estacaoController, undefined ];
        radioController.opcaoActual = undefined;
        //radioController.estacaoAtual = "";
    },

    //Regista as accoes iniciais
    setAccoesIniciais: function() {
        // radioController.setUp();
        radioController.updateInterface();
        HUD.accoes.clickOK = function() {
            if(radioController.opcaoActual == 2){
                radioController.estacaoAtual = "";
                radioController.updateInterface();
            }
            if (HUD.ecraActual) {
                radioController.opcoesControllers[radioController.opcaoActual].loadOwnEcraView();
                radioController.opcoesControllers[radioController.opcaoActual].setAccoesIniciais();
                //o ecra de frequencias nao serah implementado
            }
        }

        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                if (scrollDirectionUP) {
                    radioController.previousOpcao();
                } else {
                    radioController.nextOpcao();
                }
            }
        }

        HUD.accoes.clickBack = function() {
            // $('#opcoes-radio li:eq('+(radioController.opcaoActual)+')').removeClass('RADIO-opcao-seleccionada');
            radioController.opcaoActual = undefined;
            radioController.updateInterface();
            HUD.setEcraInactivo();
            HUD.setAccoesPadrao();
        }
    },
    
    //Carrega o HTML do proprio ecra
    loadOwnEcraView: function() {
        //$("#hud-screen-container").load(opcoesControllers[opcaoActual].url);
        if (HUD.ecraActual) {
            $.get(/*radioController.opcoesControllers[radioController.opcaoActual]*/radioController.url, function(data) {
                $("#hud-screen-container").html(data);
                //inicializar variaveis eh feito aqui
                /*radioController.opcoesControllers = [ estacaoController, undefined ];
                radioController.opcaoActual = 0;*/
                radioController.updateInterface();
            })
            .fail(function(){
                alert("não consegui obter html da view!");
            });
        } else {
            $("#hud-screen-container").html('');
        }
    },

    //Atualiza as selecoes no ecra
    updateInterface: function() {
        var aTirar = $('#opcoes-radio li:eq(0)');
        aTirar.removeClass('RADIO-opcao-seleccionada');
        aTirar = $('#opcoes-radio li:eq(1)');
        aTirar.removeClass('RADIO-opcao-seleccionada');
        aTirar = $('#opcoes-radio li:eq(2)');
        aTirar.removeClass('RADIO-opcao-seleccionada');
        
        var aSelecionar = $('#opcoes-radio li:eq('+(radioController.opcaoActual)+')');
        aSelecionar.addClass('RADIO-opcao-seleccionada');

        $('#RADIO-estacao-actual').text(radioController.estacaoAtual);
    },

    //FUNCOES
    //nestes casos, a lista nunca mudaria no numero de opcoes, mesmo na implementacao completa -TV
    previousOpcao: function() {
        if(radioController.opcaoActual >= 1){
            radioController.opcaoActual--;
            radioController.updateInterface();
        }
    },

    nextOpcao: function() {
        if(radioController.opcaoActual <= 1){
            radioController.opcaoActual++;
            radioController.updateInterface();
        }
    }

}

