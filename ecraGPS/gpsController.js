// controlador do ecrã de GPS

var gpsController = {
    id: "GPS",
    url: "ecraGPS/gpsView.html",
    css: "ecraGPS/gpsStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-GPS"><i class="fas fa-globe-europe" style="font-size: 40px; line-height: 70px;"></i></div>`,

    destinoAtual: undefined,
    opcaoActual: undefined,
    opcoesControllers: [],

    //Coloca as variaveis iniciais (o acima devia faze-lo?)
    setUp: function(){
        //Tal como em core, uma lista de dois elementos que guarda os controladores de frequencia e estacao
        gpsController.opcoesControllers = [ undefined, escritaController ];
        gpsController.opcaoActual = undefined;
        //gpsController.destinoAtual = "";
    },

    //Regista as accoes iniciais
    setAccoesIniciais: function() {
        // gpsController.setUp();
        HUD.accoes.clickOK = function() {
            if(gpsController.opcaoActual == 2){
                // Terminar rota
                gpsController.destinoAtual = "Nenhum";
                gpsController.updateInterface();
                HUD.removeSateIcon('state-icon-gps');
                infoVeiculoController.gpsON = false;
            }
            if (HUD.ecraActual) {
                gpsController.opcoesControllers[gpsController.opcaoActual].loadOwnEcraView();
                //alert("espera ai");
                gpsController.opcoesControllers[gpsController.opcaoActual].setAccoesIniciais();
                //o ecra de frequencias nao serah implementado
            }
        }

        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                if (scrollDirectionUP) {
                    gpsController.previousOpcao();
                } else {
                    gpsController.nextOpcao();
                }
            }
        }

        HUD.accoes.clickBack = function() {
            // $('#opcoes-radio li:eq('+(gpsController.opcaoActual)+')').removeClass('opcao-seleccionada');
            gpsController.opcaoActual = undefined;
            gpsController.updateInterface();
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
            $.get(/*gpsController.opcoesControllers[gpsController.opcaoActual]*/gpsController.url, function(data) {
                $("#hud-screen-container-inner").html(data);
                //inicializar variaveis eh feito aqui
                /*gpsController.opcoesControllers = [ escritaController, undefined ];
                gpsController.opcaoActual = 0;*/
                gpsController.updateInterface();
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
        HUD.setBreadCrumbs('<span>GPS</span>')
        HUD.showTopBar();
        var aTirar = $('#opcoes-gps li:eq(0)');
        aTirar.removeClass('opcao-seleccionada');
        aTirar = $('#opcoes-gps li:eq(1)');
        aTirar.removeClass('opcao-seleccionada');
        aTirar = $('#opcoes-gps li:eq(2)');
        aTirar.removeClass('opcao-seleccionada');
        
        var aSelecionar = $('#opcoes-gps li:eq('+(gpsController.opcaoActual)+')');
        aSelecionar.addClass('opcao-seleccionada');

        $('#GPS-destino-actual').text(gpsController.destinoAtual);
    },

    //FUNCOES
    //nestes casos, a lista nunca mudaria no numero de opcoes, mesmo na implementacao completa -TV
    previousOpcao: function() {
        if(gpsController.opcaoActual >= 1){
            gpsController.opcaoActual--;
            gpsController.updateInterface();
        }
    },

    nextOpcao: function() {
        if(gpsController.opcaoActual <= 1){
            gpsController.opcaoActual++;
            gpsController.updateInterface();
        }
    }

}

