// controlador do ecrã GPS

var escritaController = {
    id: "ESCRITA",
    url: "ecraGPS/escritaView.html",
    css: "ecraGPS/escritaStyles.css",
    iconHtml: `<div class="hud-icon" id="icon-ecra-GPS"><i class="fas fa-globe-europe" style="font-size: 40px; line-height: 70px;"></i></div>`,

    listaLetras: ["<i class='fas fa-check' style='font-size: 14pt;'></i>","_","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    indiceInicial: 0,
    indiceFim: 6,
    numElem: 7,

    listaSugestoes: ["RUA\xa0DAS\xa0FLORES","RUA\xa0DOS\xa0DIAMANTES","AVENIDA\xa0AVENIDO","LARGO\xa0DOS\xa0PATOS","RUA\xa0FELIZ","AVENIDA\xa0DA\xa0IGUALDADE"],
    nSugestoes : 0,

    sugestaoSelecionada: 0,

    setAccoesIniciais: function() {
        escritaController.indiceInicial = 0;
        escritaController.indiceFim = 6;
        //SCROLL
        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                if (scrollDirectionUP) {
                    escritaController.previousLetra();
                } else {
                    escritaController.nextLetra();
                }
            }
        }
        //VOLTAR
        HUD.accoes.clickBack = function() {
            //Se a barra estiver vazia, sair do ecra
            if($("#barra_de_texto").text() == "|"){
                var aRemover = $('#alfabeto li:eq(0)');
                aRemover.removeClass("opcao-seleccionada");
                escritaController.indiceInicial = 0;
                escritaController.indiceFim = 0;
            // $('#opcoes-radio li:eq('+(radioController.opcaoActual)+')').removeClass('RADIO-opcao-seleccionada');
            /*radioController.opcaoActual = undefined;
            radioController.updateInterface();*/
                /*HUD.setEcraInactivo();
                HUD.setAccoesPadrao();*/
                gpsController.loadOwnEcraView();
                gpsController.setAccoesIniciais();
            }else{
                escritaController.apagaLetra();
                $("#barra_de_texto").append("|");

                escritaController.atualizaSugestao();
            }
        }
        //OK
        HUD.accoes.clickOK = function() {
            var letra = escritaController.listaLetras[escritaController.indiceInicial];

            if(escritaController.listaLetras[escritaController.indiceInicial] == "<i class='fas fa-check' style='font-size: 14pt;'></i>"){
                    if(escritaController.nSugestoes > 0){
                        escritaController.sugestaoSelecionada = 0;
                        var aRemover = $('#alfabeto li:eq(0)');
                        aRemover.removeClass("opcao-seleccionada");
                        var aSelecionar = $('#lista-sugestoes li:eq('+escritaController.sugestaoSelecionada+')');
                        aSelecionar.addClass("opcao-seleccionada");
                        escritaController.setAccoesSugestoes();
                    }
            }else{
                escritaController.adicionaLetra(letra);
                escritaController.atualizaSugestao();
            }
        }

        HUD.accoes.clickRIGHT = function(){};

        HUD.accoes.clickLEFT = function(){ 
            //if(escritaController.nSugestoes > 0){
                escritaController.sugestaoSelecionada = 0;
                var aRemover = $('#alfabeto li:eq(0)');
                aRemover.removeClass("opcao-seleccionada");
                var aSelecionar = $('#lista-sugestoes li:eq('+escritaController.sugestaoSelecionada+')');
                aSelecionar.addClass("opcao-seleccionada");
                escritaController.setAccoesSugestoes();
            /*}else{
                gpsController.loadOwnEcraView();
                gpsController.updateInterface()
                gpsController.setAccoesIniciais();
                HUD.accoes.clickBack();
        }*/
        }
        
    },

    atualizaSugestao: function(){
        escritaController.limpaSugestoes();
        var texto = $("#barra_de_texto").text();
        texto = texto.substring(0, texto.length - 1);
        if(texto !=""){
            for(var i = 0; i < escritaController.listaSugestoes.length && escritaController.nSugestoes < 4; i++){
                if(escritaController.listaSugestoes[i].startsWith(texto)){
                    document.getElementById("sugestao"+(escritaController.nSugestoes+1)).innerHTML = 
                    escritaController.listaSugestoes[i];
                    escritaController.nSugestoes++;
                }  
            }
            for(var i = 0; i < escritaController.listaSugestoes.length && escritaController.nSugestoes < 4; i++){
                if(!escritaController.listaSugestoes[i].startsWith(texto) && escritaController.listaSugestoes[i].includes(texto)){
                    document.getElementById("sugestao"+(escritaController.nSugestoes+1)).innerHTML = 
                    escritaController.listaSugestoes[i];
                    escritaController.nSugestoes++;
                }
            }
        }
    },

    limpaSugestoes: function(){
        for(var i = 0; i < 5; i++){
            var aRetirar = $('#lista-sugestoes li:eq('+i+')');
            aRetirar.text("");
        }
        escritaController.nSugestoes = 0;
    },

    adicionaLetra: function(l){
        //apagar o | 
        escritaController.apagaChar();
        if(l == "_"){
            $("#barra_de_texto").append("\xa0|");
        }else{
            //vai buscar class barra e adiciona ao fim a letra selecionada
            $("#barra_de_texto").append(l + "|");
        }
    },

    //apenas apaga o ultimo char na barra de texto.
    apagaChar: function(){
        var texto = $("#barra_de_texto").text();
        texto = texto.substring(0, texto.length - 1);
        $("#barra_de_texto").text(texto);
    },

    //apaga o "|" e a letra apenas. Dever ser escrito algo a seguir de imediato
    apagaLetra: function(){
        escritaController.apagaChar();
        escritaController.apagaChar();
    },

    previousLetra: function(){
        if(escritaController.indiceInicial == 0){
            escritaController.indiceInicial = 27;
        }else{
            escritaController.indiceInicial--;
        }
        if(escritaController.indiceFim == 0){
            escritaController.indiceFim = 27;
        }else{
            escritaController.indiceFim--;
        }
        for(var i = 0; i < escritaController.numElem; i++){
            var aux = i + 1;
            document.getElementById("letra"+aux).innerHTML = escritaController.listaLetras[(escritaController.indiceInicial+i)%28];
        }
    },

    nextLetra: function(){
        if(escritaController.indiceInicial == 27){
            escritaController.indiceInicial = 0;
        }else{
            escritaController.indiceInicial++;
        }
        if(escritaController.indiceFim == 27){
            escritaController.indiceFim = 0;
        }else{
            escritaController.indiceFim++;
        }
        for(var i = 0; i < escritaController.numElem; i++){
            var aux = i + 1;
            document.getElementById("letra"+aux).innerHTML = escritaController.listaLetras[(escritaController.indiceInicial+i)%28];
            //$("#letra"+aux).text(escritaController.listaLetras[escritaController.indiceInicial+i]);
        }
    },
    
    setAccoesSugestoes: function(){
        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                if (scrollDirectionUP) {
                    escritaController.previousOpcao();
                } else {
                    escritaController.nextOpcao();
                }
            }
        }
        //VOLTAR
        HUD.accoes.clickBack = function() {
            var aRemover = $('#lista-sugestoes li:eq('+(escritaController.sugestaoSelecionada)+')');
            aRemover.removeClass('opcao-seleccionada');
            var aSelecionar = $('#alfabeto li:eq(0)');
            aSelecionar.addClass("opcao-seleccionada");
            escritaController.setAccoesIniciais();
        }
        //OK
        HUD.accoes.clickOK = function() {
            if(escritaController.nSugestoes > 0){
                var aTirar = $('#lista-sugestoes li:eq('+(escritaController.sugestaoSelecionada)+')');
                aTirar.removeClass('opcao-seleccionada');
                escritaController.nSugestoes = 0;

                gpsController.loadOwnEcraView();
                gpsController.setAccoesIniciais();
                gpsController.destinoAtual = aTirar.text();
                HUD.addStateIcon('<span id="state-icon-gps"><i class="fas fa-globe-europe" style="padding-left:10px;"></i><span>');
                infoVeiculoController.gpsON = true;
            }
        }

        HUD.accoes.clickRIGHT = HUD.accoes.clickBack;
        HUD.accoes.clickLEFT = function(){
            gpsController.loadOwnEcraView();
            gpsController.updateInterface()
            gpsController.setAccoesIniciais();
            HUD.accoes.clickBack();
        };
    },

    previousOpcao: function(){
        if(escritaController.sugestaoSelecionada != 0){
            escritaController.sugestaoSelecionada--;
            var aRemover = $('#lista-sugestoes li:eq('+(escritaController.sugestaoSelecionada+1)+')');
            aRemover.removeClass('opcao-seleccionada');
            var aSelecionar = $('#lista-sugestoes li:eq('+escritaController.sugestaoSelecionada+')');
            aSelecionar.addClass('opcao-seleccionada');
        }
    },

    nextOpcao: function(){
        //<3 para impedir fazer scroll down infinito quando nSugestoes = 0
        if(escritaController.sugestaoSelecionada != escritaController.nSugestoes-1 && escritaController.sugestaoSelecionada < 3){
            escritaController.sugestaoSelecionada++;
            var aRemover = $('#lista-sugestoes li:eq('+(escritaController.sugestaoSelecionada-1)+')');
            aRemover.removeClass('opcao-seleccionada');
            var aSelecionar = $('#lista-sugestoes li:eq('+escritaController.sugestaoSelecionada+')');
            aSelecionar.addClass('opcao-seleccionada');
        }
    },

    //Carrega o HTML do proprio ecra
    loadOwnEcraView: function() {
        //$("#hud-screen-container-inner").load(opcoesControllers[opcaoActual].url);
        if (HUD.ecraActual) {
            $.get(escritaController.url, function(data) {
                $("#hud-screen-container-inner").html(data);
                var aSelecionar = $('#alfabeto li:eq(0)');
                aSelecionar.addClass("opcao-seleccionada");
                HUD.setBreadCrumbs('<span>GPS</span> > <span>ESCRITA</span>');
                HUD.showTopBar();
            })
            .fail(function(){
                alert("não consegui obter html da view!");
            });
        } else {
            $("#hud-screen-container-inner").html('');
        }
    },
}

