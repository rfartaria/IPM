// controlador do ecrã HELP1

var chamadasController = {
    id: "CHAMADAS",
    url: "ecraCHAMADAS/chamadasView.html",
    css: "ecraCHAMADAS/chamadasStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-CHAMADAS"><i class="fas fa-phone" style="font-size: 34pt; line-height: 70px;"></i></div>`,

    opcaoActual: undefined,

    setUp: function() {
        //pass
    },

    setAccoesIniciais: function() {
        
        HUD.accoes.clickOK = function() {
            if (HUD.ecraActual) {
                if (chamadasController.opcaoActual == 0) {
                    contactosFavoritosController.opcaoActual = 0;
                    contactosFavoritosController.loadOwnEcraView();
                    contactosFavoritosController.setAccoesIniciais();
                    return;
                }
                if (chamadasController.opcaoActual == 1) {
                    contactosTodosController.opcaoActual = 0;
                    contactosTodosController.loadOwnEcraView();
                    contactosTodosController.setAccoesIniciais();
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
        if (typeof chamadasController.opcaoActual === 'undefined')
            $("#CHAMADAS-opcoes li").removeClass("opcao-seleccionada");
        else
            $("#CHAMADAS-opcoes li").eq(chamadasController.opcaoActual).addClass("opcao-seleccionada");
            
    },

    nextOption: function() {
        $("#CHAMADAS-opcoes li").eq(chamadasController.opcaoActual).removeClass("opcao-seleccionada");
        chamadasController.opcaoActual = (chamadasController.opcaoActual + 1) % 2;
        $("#CHAMADAS-opcoes li").eq(chamadasController.opcaoActual).addClass("opcao-seleccionada");
    },

    previousOption: function() {
        $("#CHAMADAS-opcoes li").eq(chamadasController.opcaoActual).removeClass("opcao-seleccionada");
        chamadasController.opcaoActual = (chamadasController.opcaoActual + 1) % 2;
        $("#CHAMADAS-opcoes li").eq(chamadasController.opcaoActual).addClass("opcao-seleccionada");
    },

    loadOwnEcraView: function() {
        if (HUD.ecraActual) {
            $.get(chamadasController.url, function(data) {
                $("#hud-screen-container").html(data);
                chamadasController.updateInterface();
            })
            .fail(function(){
                alert("não consegui obter html da view!");
            });
        } else {
            $("#hud-screen-container").html('');
        }
    }
}

