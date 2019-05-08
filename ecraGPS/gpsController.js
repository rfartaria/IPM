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

    listaSugestoes: ["Rua das Flores", "Rua dos Diamantes", "Avenida Avenido", "Largo do Patos", "Rua Feliz", "Avenida da Igualdade"],
    nSugestoes : 0,

    setAccoesIniciais: function() {
        var aSelecionar = $('#alfabeto li:eq(0)');
        aSelecionar.addClass("selecionado");
        //SCROLL
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
        //VOLTAR
        HUD.accoes.clickBack = function() {
            //Se a barra estiver vazia, sair do ecra
            if($(".barra_de_texto").text() == "|"){
                var aRemover = $('#alfabeto li:eq(0)');
                aRemover.removeClass("selecionado");
            // $('#opcoes-radio li:eq('+(radioController.opcaoActual)+')').removeClass('RADIO-opcao-seleccionada');
            /*radioController.opcaoActual = undefined;
            radioController.updateInterface();*/
                HUD.setEcraInactivo();
                HUD.setAccoesPadrao();
            }else{
                gpsController.apagaLetra();
                $(".barra_de_texto").append("|");
            }
        }
        //OK
        HUD.accoes.clickOK = function() {
            var letra = gpsController.listaLetras[gpsController.indiceInicial];
            gpsController.adicionaLetra(letra);

            gpsController.atualizaSugestao();
        }
    },

    atualizaSugestao: function(){
        var texto = $(".barra_de_texto").text();
        for(var i = 0; i < gpsController.listaSugestoes.length; i++){
            if(gpsController.listaSugestoes[i].includes(texto)){
                
            }
        }
    },

    adicionaLetra: function(l){
        //apagar o | 
        gpsController.apagaChar();
        //vai buscar class barra e adiciona ao fim a letra selecionada
        $(".barra_de_texto").append(l + "|");
    },

    //apenas apaga o ultimo char na barra de texto.
    apagaChar: function(){
        var texto = $(".barra_de_texto").text();
        texto = texto.substring(0, texto.length - 1);
        $(".barra_de_texto").text(texto);
    },

    //apaga o "|" e a letra apenas.
    apagaLetra: function(){
        gpsController.apagaChar();
        gpsController.apagaChar();
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

