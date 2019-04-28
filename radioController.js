// controlador do ecrã HELP1

var radioController = {
    id: "RADIO",
    url: "radioView.html",
    css: "radioStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-RADIO">RADIO</div>`,

    estacaoActual: 0,

    setAccoesIniciais: function() {
        HUD.accoes.clickOK = function() {

        };

        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                if (scrollDirectionUP) {
                    radioController.previousEstacao();
                } else {
                    radioController.nextEstacao();
                }
            }
        };
    },

    previousEstacao: function() {

    },

    nextEstacao: function() {

    },

    updateInterface: function() {
        $('#estacoes-radio li['+estacaoActual+']').addClass('RADIO-');
    }
}

