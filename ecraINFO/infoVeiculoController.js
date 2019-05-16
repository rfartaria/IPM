// controlador do ecrã HELP1

var infoVeiculoController = {
    id: "INFOVEICULO",
    url: "ecraINFO/infoVeiculoView.html",
    css: "ecraINFO/infoVeiculoStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-INFOVEICULO"><i class="fab fa-houzz" style="font-size: 36px; line-height: 70px;"></i></div>`,

    updateInterface: function() {
        HUD.hideBreadCrumbs();
    },

    loadOwnEcraView: function() {
        if (HUD.ecraActual) {
            $.get(infoVeiculoController.url, function(data) {
                $("#hud-screen-container-inner").html(data);
                infoVeiculoController.updateInterface();
            })
            .fail(function(){
                alert("não consegui obter html da view!");
            });
        } else {
            $("#hud-screen-container-inner").html('');
        }
    }
}

