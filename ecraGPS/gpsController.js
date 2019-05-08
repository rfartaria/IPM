// controlador do ecrã GPS

var gpsController = {
    id: "GPS",
    url: "ecraGPS/gpsView.html",
    css: "ecraGPS/gpsStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-GPS"><i class="fas fa-globe-europe" style="font-size: 36px; line-height: 70px;"></i></div>`,

    listaLetras: ["<i class='fas fa-check' style='font-size: 14pt;'></i>","_","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    indiceInicial: 0,
    indiceFim: 6,
    numElem: 7,

    listaSugestoes: ["RUA DAS FLORES","RUA DOS DIAMANTES","AVENIDA AVENIDO","LARGO DOS PATOS","RUA FELIZ","AVENIDA DA IGUALDADE"],
    nSugestoes : 0,

    sugestaoSelecionada: 0,

    setAccoesIniciais: function() {
        var aSelecionar = $('#alfabeto li:eq(0)');
        aSelecionar.addClass("opcao-seleccionada");
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
                aRemover.removeClass("opcao-seleccionada");
            // $('#opcoes-radio li:eq('+(radioController.opcaoActual)+')').removeClass('RADIO-opcao-seleccionada');
            /*radioController.opcaoActual = undefined;
            radioController.updateInterface();*/
                HUD.setEcraInactivo();
                HUD.setAccoesPadrao();
            }else{
                gpsController.apagaLetra();
                $(".barra_de_texto").append("|");

                gpsController.atualizaSugestao();
            }
        }
        //OK
        HUD.accoes.clickOK = function() {
            var letra = gpsController.listaLetras[gpsController.indiceInicial];

            if(gpsController.listaLetras[gpsController.indiceInicial] == "<i class='fas fa-check' style='font-size: 14pt;'></i>" &&
                nSugestoes > 0){
                var aRemover = $('#alfabeto li:eq(0)');
                aRemover.removeClass("opcao-seleccionada");
                var aSelecionar = $('#lista-sugestoes li:eq('+gpsController.sugestaoSelecionada+')');
                aSelecionar.addClass("opcao-seleccionada");
                gpsController.setAccoesSugestoes();
            }else{
                gpsController.adicionaLetra(letra);
                gpsController.atualizaSugestao();
            }
        }
    },

    atualizaSugestao: function(){
        gpsController.limpaSugestoes();
        var texto = $(".barra_de_texto").text();
        texto = texto.substring(0, texto.length - 1);
        if(texto !=""){
            for(var i = 0; i < gpsController.listaSugestoes.length && gpsController.nSugestoes < 4; i++){
                if(gpsController.listaSugestoes[i].startsWith(texto)){
                    document.getElementById("sugestao"+(gpsController.nSugestoes+1)).innerHTML = 
                    gpsController.listaSugestoes[i];
                    gpsController.nSugestoes++;
                }  
            }
            for(var i = 0; i < gpsController.listaSugestoes.length && gpsController.nSugestoes < 4; i++){
                if(!gpsController.listaSugestoes[i].startsWith(texto) && gpsController.listaSugestoes[i].includes(texto)){
                    document.getElementById("sugestao"+(gpsController.nSugestoes+1)).innerHTML = 
                    gpsController.listaSugestoes[i];
                    gpsController.nSugestoes++;
                }
            }
        }
    },

    limpaSugestoes: function(){
        for(var i = 0; i < 5; i++){
            var aRetirar = $('#lista-sugestoes li:eq('+i+')');
            aRetirar.text("");
        }
        gpsController.nSugestoes = 0;
    },

    adicionaLetra: function(l){
        //apagar o | 
        gpsController.apagaChar();
        if(l == "_"){
            $(".barra_de_texto").append(" |");
        }else{
            //vai buscar class barra e adiciona ao fim a letra selecionada
            $(".barra_de_texto").append(l + "|");
        }
    },

    //apenas apaga o ultimo char na barra de texto.
    apagaChar: function(){
        var texto = $(".barra_de_texto").text();
        texto = texto.substring(0, texto.length - 1);
        $(".barra_de_texto").text(texto);
    },

    //apaga o "|" e a letra apenas. Dever ser escrito algo a seguir de imediato
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
    },
    
    setAccoesSugestoes: function(){
        var aSelecionar = $('#lista-sugestoes li:eq('+gpsController.sugestaoSelecionada+')');
        aSelecionar.addClass('opcao-seleccionada');
        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                if (scrollDirectionUP) {
                    gpsController.previousOpcao();
                } else {
                    gpsController.nextOpcao();
                }
            }
        }
        //VOLTAR
        HUD.accoes.clickBack = function() {
            var aRemover = $('#lista-sugestoes li:eq('+(gpsController.sugestaoSelecionada)+')');
            aRemover.removeClass('opcao-seleccionada');
            gpsController.setAccoesIniciais();
        }
        //OK
        HUD.accoes.clickOK = function() {
            var aTirar = $('#lista-sugestoes li:eq('+(gpsController.sugestaoSelecionada)+')');
            aTirar.removeClass('opcao-seleccionada');

            HUD.setEcraInactivo();
            HUD.setAccoesPadrao();
            
        }
    },

    previousOpcao: function(){
        if(gpsController.sugestaoSelecionada != 0){
            gpsController.sugestaoSelecionada--;
            var aRemover = $('#lista-sugestoes li:eq('+(gpsController.sugestaoSelecionada+1)+')');
            aRemover.removeClass('opcao-seleccionada');
            var aSelecionar = $('#lista-sugestoes li:eq('+gpsController.sugestaoSelecionada+')');
            aSelecionar.addClass('opcao-seleccionada');
        }
    },

    nextOpcao: function(){
        if(gpsController.sugestaoSelecionada != gpsController.nSugestoes-1){
            gpsController.sugestaoSelecionada++;
            var aRemover = $('#lista-sugestoes li:eq('+(gpsController.sugestaoSelecionada-1)+')');
            aRemover.removeClass('opcao-seleccionada');
            var aSelecionar = $('#lista-sugestoes li:eq('+gpsController.sugestaoSelecionada+')');
            aSelecionar.addClass('opcao-seleccionada');
        }
    }
}

