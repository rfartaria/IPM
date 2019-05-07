// controlador do ecrã GPS

var gpsController = {
    id: "GPS",
    url: "ecraGPS/gpsView.html",
    css: "ecraGPS/gpsStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-GPS"><i class="fas fa-globe-europe" style="font-size: 36px; line-height: 70px;"></i></div>`,

    listaLetras: ["<i class='fas fa-check' style='font-size: 14pt;'></i>","_","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],

    indiceInicial: 0,
    indiceFim: 6,
    numElem: 7,

    setAccoesIniciais: function() {
        var aSelecionar = $('#alfabeto li:eq(0)');
        aSelecionar.addClass("selecionado");
        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                if (scrollDirectionUP) {
                    gpsController.previousLetra();
                } else {
                    gpsController.nextLetra();
                }
            }
        }
        HUD.accoes.clickBack = function() {
            var aRemover = $('#alfabeto li:eq(0)');
            aRemover.removeClass("selecionado");
            // $('#opcoes-radio li:eq('+(radioController.opcaoActual)+')').removeClass('RADIO-opcao-seleccionada');
            /*radioController.opcaoActual = undefined;
            radioController.updateInterface();*/
            HUD.setEcraInactivo();
            HUD.setAccoesPadrao();
        }
    },

    previousLetra: function(){
        if(gpsController.indiceInicial == 0){
            gpsController.indiceInicial = 27;
        }else{
            gpsController.indiceInicial--;
        }
        if(gpsController.indiceFim == 0){
            gpsController.indiceFim = 27;
        }else{
            gpsController.indiceFim--;
        }
        for(var i = 0; i < gpsController.numElem; i++){
            var aux = i + 1;
            document.getElementById("letra"+aux).innerHTML = gpsController.listaLetras[(gpsController.indiceInicial+i)%28];
        }
    },

    nextLetra: function(){
        if(gpsController.indiceInicial == 27){
            gpsController.indiceInicial = 0;
        }else{
            gpsController.indiceInicial++;
        }
        if(gpsController.indiceFim == 27){
            gpsController.indiceFim = 0;
        }else{
            gpsController.indiceFim++;
        }
        for(var i = 0; i < gpsController.numElem; i++){
            var aux = i + 1;
            document.getElementById("letra"+aux).innerHTML = gpsController.listaLetras[(gpsController.indiceInicial+i)%28];
            //$("#letra"+aux).text(gpsController.listaLetras[gpsController.indiceInicial+i]);
        }
    }
}

