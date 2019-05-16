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
                emChamadaController.parent.setAccoesIniciais();
            }
        }
    
        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                //pass
            }
        }

        HUD.accoes.clickRIGHT = function(){};
        //HUD.accoes.clickLEFT = nada; // deixa estar a mesma que já vinha do ecrã anterior

        HUD.accoes.clickHANGUP = function() {
            HUD.removeSateIcon('state-icon-em-chamada');
            emChamadaController.contacto = undefined;
            $('.EM-CHAMADA-indicador').css('display', 'none');
            if ($('#breadcrumbs').html().includes('EM CHAMADA')) HUD.accoes.clickBack();
        }
    },

    //Carrega o HTML do proprio ecra
    loadOwnEcraView: function() {
        if (HUD.ecraActual) {
            $.get(this.url, function(data) {
                $("#hud-screen-container-inner").html(data);
                HUD.setBreadCrumbs(emChamadaController.parent.breadCrumbs+" > <span>EM CHAMADA</span>");
                if (emChamadaController.contacto)
                    $("#contacto_a_falar").html(emChamadaController.contacto);
                HUD.addStateIcon('<span id="state-icon-em-chamada"><i class="fas fa-phone-volume" style="margin-left:5px;"></i><span>');
                emChamadaController.updateInterface();
                emChamadaController.animatePhone();
            })
            .fail(function(){
                alert("não consegui obter html da view!");
            });
        } else {
            $("#hud-screen-container-inner").html('');
        }
    },

    updateInterface: function() {
        //pass
    },

    animatePhone() {
        var direction = -1;
        setTimeout(function animateScheduled() {
            var jobj = $(".fa-phone-volume");
            if (! jobj.length) return;
            if (direction > 0)
                jobj.animate({opacity: 1}, 1000);
            else
                jobj.animate({opacity: 0}, 1000);
            direction = -direction;
            setTimeout(animateScheduled, 1000);
        }, 0);
    }
}

