// controlador do ecrã EM-CHAMADA

var emChamadaController = {
    id: "EM-CHAMADA",
    url: "ecraCHAMADAS/emChamadaView.html",
    css: "ecraCHAMADAS/emChamadaStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-CHAMADAS"><i class="fas fa-phone-volume" style="font-size: 34pt; line-height: 70px;"></i></div>`,

    contacto: undefined,
    parent: undefined,

    setAccoesIniciais: function() {

        HUD.accoes.clickOK = function() {
            if (HUD.ecraActual) {
                // pass
            }
        }
    
        HUD.accoes.clickBack = function() {
            if (HUD.ecraActual) {
                emChamadaController.parent.loadOwnEcraView();
                emChamadaController.parent.updateInterface();
                emChamadaController.parent.setAccoesIniciais();
            }
        }
    
        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                //pass
            }
        }
    },

    //Carrega o HTML do proprio ecra
    loadOwnEcraView: function() {
        if (HUD.ecraActual) {
            $.get(this.url, function(data) {
                $("#hud-screen-container").html(data);
                //$("div.breadcrumbs").html($("div.breadcrumbs").html()+" > <span>EM CHAMDADA</span>")
                $("div.breadcrumbs").html(emChamadaController.parent.breadCrumbs+" > <span>EM CHAMDADA</span>")
                if (emChamadaController.contacto)
                    $("#contacto_a_falar").html(emChamadaController.contacto);
                emChamadaController.updateInterface();
                emChamadaController.animatePhone();
            })
            .fail(function(){
                alert("não consegui obter html da view!");
            });
        } else {
            $("#hud-screen-container").html('');
        }
    },

    updateInterface: function() {
        //pass
    },

    animatePhone(direction) {
        setTimeout(function animateScheduled(direction) {
            if (!direction) direction = -1;
            var jobj = $(".fa-phone-volume");
            if (! jobj.length) return;
            if (direction > 0)
                jobj.animate({opacity: 1}, 1000);
            else
                jobj.animate({opacity: 0}, 1000);
            setTimeout(animateScheduled(-direction), 1000);    
        }, 0);
    }
}

