// controlador do ecrã HELP1

var gpsController = {
    id: "GPS",
    url: "ecraGPS/gpsView.html",
    css: "ecraGPS/gpsStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-GPS"><i class="fas fa-globe-europe" style="font-size: 36px; line-height: 70px;"></i></div>`,

    listaLetras: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","ok","_"],

    indiceInicial: 0,
    indiceFim: 6,
    indiceEscolhido: 0,

    setAccoesIniciais: function() {
        var aColocar = $("#alfabeto li:eq(0)");
        aColocar.addClass("selecionado");
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
            // $('#opcoes-radio li:eq('+(radioController.opcaoActual)+')').removeClass('RADIO-opcao-seleccionada');
            gpsController.indiceInicial = 0;
            gpsController.indiceFim = 6;
            gpsController.indiceEscolhido = 0;
            HUD.setEcraInactivo();
            HUD.setAccoesPadrao();
        }
    },

    previousLetra: function(){
        var aux2 = gpsController.indiceEscolhido;
        if(gpsController.indiceEscolhido != gpsController.indiceInicial){
            if(gpsController.indiceEscolhido == 0){
                gpsController.indiceEscolhido = 27;
            }else{
                gpsController.indiceEscolhido--;
            }

        }else{
            
            if(gpsController.indiceEscolhido == 0){
                gpsController.indiceEscolhido = 27;
            }else{
                gpsController.indiceEscolhido--;
            }
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
        
        for(var i = 0; i < 7; i++){
            var aux = i + 1;
            document.getElementById("letra"+aux).innerHTML = gpsController.listaLetras[gpsController.indiceInicial+i];
        }
    }
    var aTirar = $("#alfabeto li:eq("+aux2+")");
    aTirar.removeClass("selecionado");
    var aColocar = $("#alfabeto li:eq("+gpsController.indiceEscolhido+")");
        aColocar.addClass("selecionado");
    },

    nextLetra: function(){
        var aux2 = gpsController.indiceEscolhido;
        if(gpsController.indiceEscolhido != gpsController.indiceFim){
            if(gpsController.indiceEscolhido == 27){
                gpsController.indiceEscolhido = 0;
            }else{
                gpsController.indiceEscolhido++;
            }

        }else{
            
            if(gpsController.indiceEscolhido == 27){
                gpsController.indiceEscolhido = 0;
            }else{
                gpsController.indiceEscolhido++;
            }
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
        for(var i = 0; i < 7; i++){
            var aux = i + 1;
            document.getElementById("letra"+aux).innerHTML = gpsController.listaLetras[gpsController.indiceInicial+i]
            //$("#letra"+aux).text(gpsController.listaLetras[gpsController.indiceInicial+i]);
        }
    }
    var aTirar = $("#alfabeto li:eq("+aux2+")");
    aTirar.removeClass("selecionado");
    var aColocar = $("#alfabeto li:eq("+gpsController.indiceEscolhido+")");
        aColocar.addClass("selecionado");
    }
}

