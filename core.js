
// singleton
var HUD = {
    estado: undefined,
    ecraActual: undefined,
    ecrasOrdem: [],
    accoes: {
        clickOK: undefined,
        holdOK: undefined,
        clickBack: undefined,
        clickONOFF: undefined,
        scroll: undefined,
    },

    setUp: function() {
        HUD.estado = "OFF";
        HUD.ecrasOrdem = [];
        HUD.ecraActual = undefined;
        HUD.setAccoesPadrao();
        HUD.animate_onoff_arrow();
    },

    turnON: function() {
        HUD.setUp();
        HUD.estado = "ON";
        HUD.ecrasOrdem = [ help1Controller ];
        HUD.ecraActual = help1Controller;
        HUD.loadEcraView();
        HUD.updateInterface();
        if ($("i.on-off-arrow").length) $("i.on-off-arrow").css("display","none");
    },
    
    turnOFF: function() {
        HUD.setUp();
        HUD.setEcraInactivo();
        HUD.hideTopBar();
        HUD.clearInterface();
        // if ($("i.on-off-arrow").length) $("i.on-off-arrow").css("display","block");
        // HUD.animate_onoff_arrow();
    },

    nextEcra: function() {
        var i = HUD.ecrasOrdem.indexOf(HUD.ecraActual);
        if (i>=0 && i<HUD.ecrasOrdem.length-1) {
            HUD.ecraActual = HUD.ecrasOrdem[i+1];
            HUD.updateInterface();
        }
    },

    previousEcra: function() {
        var i = HUD.ecrasOrdem.indexOf(HUD.ecraActual);
        if (i>0) {
            HUD.ecraActual = HUD.ecrasOrdem[i-1];
            HUD.updateInterface();
        }
    },

    loadEcrasPadrao: function() {
        HUD.ecrasOrdem = [ infoVeiculoController, radioController, chamadasController, gpsController, help1Controller ]
        HUD.ecrasOrdem.map((e) => {if (e.setUp) e.setUp();});
        HUD.ecraActual = infoVeiculoController;
        HUD.updateInterface();
    },

    // contexto controlador padrão (quando não se está "dentro" de nenhum ecrã)
    setAccoesPadrao: function() {
        
        HUD.accoes.clickOK = function() {
            if (HUD.ecraActual) {
                switch(HUD.ecraActual.id){
                case ("HELP1") :
                    //HUD.nextEcra();
                    HUD.loadEcrasPadrao();
                    help1Controller.updateInterface();
                    break;
                case ("HELP2") :
                    HUD.loadEcrasPadrao();
                    break;
                case ("INFOVEICULO") :
                    //TODO: ir para contexto do INFOVEICULO
                    break;
                case ("RADIO") :
                    HUD.setEcraActivo();
                    radioController.opcaoActual = 0;
                    radioController.setAccoesIniciais();
                    radioController.updateInterface();
                    break;
                case ("CHAMADAS") :
                    HUD.setEcraActivo();
                    chamadasController.opcaoActual = 0;
                    chamadasController.setAccoesIniciais();
                    chamadasController.updateInterface();
                    break;
                case ("GPS") :
                    HUD.setEcraActivo();
                    gpsController.opcaoActual = 0;
                    gpsController.setAccoesIniciais();
                    gpsController.updateInterface();
                    break;
                }
                //TODO: os outros ecrãs
            }
        }
    
        HUD.accoes.clickBack = function() {
            if (HUD.ecraActual) {
                HUD.loadEcrasPadrao();
                return;
            }
        }
    
        HUD.accoes.clickONOFF = function() {
            if (HUD.estado == "OFF") {
                HUD.turnON();
            } else {
                HUD.turnOFF()
            }
        }
    
        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                if (scrollDirectionUP) {
                    HUD.previousEcra();
                } else {
                    HUD.nextEcra();
                }
            }
        }

        HUD.accoes.clickRIGHT = HUD.accoes.clickOK;
        HUD.accoes.clickLEFT = HUD.accoes.clickBack;

        if (!HUD.accoes.clickHANGUP) HUD.accoes.clickHANGUP = function(){};
    },

    loadEcraView: function() {
        if (HUD.ecraActual) {
            HUD.ecraActual.loadOwnEcraView();
        } else {
            $("#hud-screen-container-inner").html('');
        }
    },

    updateInterface: function() {
        // colocar os icons dos ecrãs registados
        $('#hud-icons-container').html(HUD.ecrasOrdem.map((c) => {return c.iconHtml}).join(''));
        // mudar a classe do icon do ecrã que está activo
        if (HUD.ecraActual) {
            $('#icon-ecra-'+HUD.ecraActual.id).addClass("hud-icon-active");
            // carregar view do ecrã activo
            HUD.loadEcraView();
        }
    },

    setEcraActivo: function() {
        $('#hud-screen-container-outer').addClass('hud-screen-active');
        $('#icon-ecra-'+HUD.ecraActual.id).removeClass("hud-icon-active");
    },

    setEcraInactivo: function() {
        $('#hud-screen-container-outer').removeClass('hud-screen-active');
        if(HUD.ecraActual) $('#icon-ecra-'+HUD.ecraActual.id).addClass("hud-icon-active");
    },

    showTopBar: function() {
        document.getElementById("hud-screen-top-bar").style.display = 'grid';
        HUD.showBreadCrumbs();
    },

    hideTopBar: function() {
        document.getElementById("hud-screen-top-bar").style.display = 'none';
    },

    setBreadCrumbs(html) {
        $("#breadcrumbs").html(html);
    },

    hideBreadCrumbs: function() {
        document.getElementById("breadcrumbs").style.display = 'none';
    },

    showBreadCrumbs: function() {
        document.getElementById("breadcrumbs").style.display = 'block';
    },

    // html tem que ser da forma: <span id="state-icon-em-chamada"><i class="fas fa-phone-volume"></i><span>
    addStateIcon: function(html) {
        var matches = html.match(new RegExp('id=["\'](.*?)["\']'));
        if (!matches) return;
        if ($('#'+matches[1]).length) return;
        $('#indicadores-actividade').append(html);
    },

    removeSateIcon(id) {
        $('#'+id).remove();
    },

    clearInterface: function() {
        $('#hud-icons-container').html('');
        $('#hud-screen-container-inner').html('');
    },

    animate_onoff_arrow() {
        var direction = 1;
        function go_animate() {
            var jobj = $("i.on-off-arrow");
            if (! jobj.length) return;
            if (HUD.estado == "ON") return;
            if (direction == 1)
                jobj.animate({color: "#ff0000"},1000);
            else
                jobj.animate({color: "#ffffff"},1000);
            direction = -direction;
            setTimeout(go_animate, 2000);
        }
        go_animate();
    }
}

