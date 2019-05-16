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
                radioController.estacaoAtual = "Ra\u0301dio Desligado";
                radioController.updateInterface();
                HUD.removeSateIcon('state-icon-radio-on');
            }
            if (HUD.ecraActual) {
                radioController.opcoesControllers[radioController.opcaoActual].loadOwnEcraView();
                radioController.opcoesControllers[radioController.opcaoActual].setAccoesIniciais();
                //o ecra de frequencias nao será implementado
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
            // $('#opcoes-radio li:eq('+(radioController.opcaoActual)+')').removeClass('opcao-seleccionada');
            radioController.opcaoActual = undefined;
            radioController.updateInterface();
            HUD.setEcraInactivo();
            HUD.setAccoesPadrao();
        }

        HUD.accoes.clickRIGHT = function(){};
        HUD.accoes.clickLEFT = HUD.accoes.clickBack;
    },
    
    //Carrega o HTML do proprio ecra
    loadOwnEcraView: function() {
        //$("#hud-screen-container-inner").load(opcoesControllers[opcaoActual].url);
        if (HUD.ecraActual) {
            $.get(/*radioController.opcoesControllers[radioController.opcaoActual]*/radioController.url, function(data) {
                $("#hud-screen-container-inner").html(data);
                //inicializar variaveis eh feito aqui
                /*radioController.opcoesControllers = [ estacaoController, undefined ];
                radioController.opcaoActual = 0;*/
                radioController.updateInterface();
            })
            .fail(function(){
                alert("não consegui obter html da view!");
            });
        } else {
            $("#hud-screen-container-inner").html('');
        }
    },

    //Atualiza as selecoes no ecra
    updateInterface: function() {
        HUD.setBreadCrumbs('<span>RADIO</span>');
        HUD.showTopBar();

        var aTirar = $('#opcoes-radio li:eq(0)');
        aTirar.removeClass('opcao-seleccionada');
        aTirar = $('#opcoes-radio li:eq(1)');
        aTirar.removeClass('opcao-seleccionada');
        aTirar = $('#opcoes-radio li:eq(2)');
        aTirar.removeClass('opcao-seleccionada');
        
        var aSelecionar = $('#opcoes-radio li:eq('+(radioController.opcaoActual)+')');
        aSelecionar.addClass('opcao-seleccionada');

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

