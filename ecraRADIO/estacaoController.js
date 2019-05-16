// controlador do ecrã de ESTACAO

var estacaoController = {
    id: "ESTACAO",
    url: "ecraRADIO/estacaoView.html",
    css: "ecraRADIO/estacaoStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-ESTACAO">ESTACAO</div>`,

    estacaoActual: 0,
    ecraAnterior: undefined,
    estacaoActualTxt: undefined,

    //Coloca as variaveis iniciais (o acima devia faze-lo?)
    setUp: function(){
        estacaoController.estacaoActual = 0;
    },

    //Regista as accoes iniciais
    setAccoesIniciais: function() {
        HUD.accoes.clickOK = function() {
            var estacaoAAlterar = $('#estacoes-estacao li:eq('+(estacaoController.estacaoActual)+')');
            radioController.estacaoAtual = 'A Reproduzir: '+document.getElementsByClassName('opcao-seleccionada')[0].innerHTML;
            // alert('A reproduzir ' + radioController.estacaoAtual);
            estacaoAAlterar.removeClass('opcao-seleccionada');
            estacaoController.setUp();
            radioController.loadOwnEcraView();
            radioController.setAccoesIniciais();
            HUD.addStateIcon('<span id="state-icon-radio-on"><img src="img/radio.svg" style="width:30px; margin-left:5px;"><span>');
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
            $('#estacoes-estacao li:eq('+(estacaoController.estacaoActual)+')').removeClass('opcao-seleccionada');
            radioController.loadOwnEcraView();
            radioController.setAccoesIniciais();
        }

        HUD.accoes.clickRIGHT = function() {};
        HUD.accoes.clickLEFT = function() {
            radioController.loadOwnEcraView();
            radioController.setAccoesIniciais();
            HUD.accoes.clickBack();
        };
    },

    //Carrega o HTML do proprio ecra
    loadOwnEcraView: function() {
        HUD.setBreadCrumbs('<span>RADIO</span> > <span>ESTA&Ccedil;&Otilde;ES</span>');
        HUD.showTopBar();
        //$("#hud-screen-container-inner").load(opcoesControllers[opcaoActual].url);
        if (HUD.ecraActual) {
            $.get(estacaoController.url, function(data) {
                $("#hud-screen-container-inner").html(data);
                estacaoController.updateInterface();
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
        var aTirar = $('#estacoes-radio li:eq('+(estacaoController.estacaoAnterior)+')');
        aTirar.removeClass('opcao-seleccionada');
        //Problema curioso: Quando isto corre inicialmente, o addClass abaixo não atualiza imaediatamente. Por exemplo:
        //Ao colocar um alert vazio aqui, ele corre. Mas se nao o fizer, nao corre immediatamente. So se fizer scroll.
        //alert();
        var aSelecionar = $('#estacoes-radio li:eq('+(estacaoController.estacaoActual)+')');
        aSelecionar.addClass('opcao-seleccionada');
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
    }
}

