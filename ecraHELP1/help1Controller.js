// controlador do ecrã HELP1

var help1Controller = {
    id: "HELP1",
    url: "ecraHELP1/help1View.html",
    css: "ecraHELP1/help1Styles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-HELP1"><i class="far fa-question-circle" style="font-size: 36pt; line-height: 70px;"></i></div>`,

    updateInterface: function() {
        HUD.hideTopBar();
    }
}

