// controlador do ecrã HELP1

var help1Controller = {
    id: "HELP1",
    url: "ecraHELP1/help1View.html",
    css: "ecraHELP1/help1Styles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-HELP1"><i class="far fa-question-circle" style="font-size: 36pt; line-height: 70px;"></i></div>`,

    updateInterface: function() {
        HUD.hideTopBar();
    },

    loadOwnEcraView: function() {
        if (HUD.ecraActual) {
            $.get(help1Controller.url, function(data) {
                $("#hud-screen-container-inner").html(data);
                help1Controller.updateInterface();
            })
            .fail(function(){
                alert("não consegui obter html da view!");
            });
        } else {
            $("#hud-screen-container-inner").html('');
        }
    }
}

