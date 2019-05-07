rollList = {
    listaLetras: ["<i class='fas fa-check' style='font-size: 14pt;'></i>","_","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],

    indiceInicial: 0,
    indiceFim: 6,
    numElem: 7,

    previousLetra: function(){
        if(rollList.indiceInicial == 0){
            rollList.indiceInicial = 27;
        }else{
            rollList.indiceInicial--;
        }
        if(rollList.indiceFim == 0){
            rollList.indiceFim = 27;
        }else{
            rollList.indiceFim--;
        }
        for(var i = 0; i < rollList.numElem; i++){
            var aux = i + 1;
            document.getElementById("letra"+aux).innerHTML = rollList.listaLetras[(rollList.indiceInicial+i)%28];
        }
    },

    nextLetra: function(){
        if(rollList.indiceInicial == 27){
            rollList.indiceInicial = 0;
        }else{
            rollList.indiceInicial++;
        }
        if(rollList.indiceFim == 27){
            rollList.indiceFim = 0;
        }else{
            rollList.indiceFim++;
        }
        for(var i = 0; i < rollList.numElem; i++){
            var aux = i + 1;
            document.getElementById("letra"+aux).innerHTML = rollList.listaLetras[(rollList.indiceInicial+i)%28];
            //$("#letra"+aux).text(gpsController.listaLetras[gpsController.indiceInicial+i]);
        }
    }
}