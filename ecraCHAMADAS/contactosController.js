// controlador do ecrã de contactos

class contactosControllerBase {
    constructor(listaContactos, breadCrumbs) {
        this.id = "CONTACTOS";
        this.url = "ecraCHAMADAS/contactosView.html";
        this.css = "ecraCHAMADAS/contactosStyles.css";
        this.iconHtml = `<div class="hud-icon" id="icon-ecra-CHAMADAS"><i class="fas fa-phone-volume" style="font-size: 34pt; line-height: 70px;"></i></div>`;
        this.opcaoActual =  undefined;
        this.contactos = listaContactos;
        this.viewLoaded = false;
        this.breadCrumbs = breadCrumbs;
        this.linhas = 5;
    }

    setAccoesIniciais() {
        var self = this;

        HUD.accoes.clickOK = function() {
            if (HUD.ecraActual) {
                // efectuar chamada
                emChamadaController.contacto = self.contactos[self.opcaoActual];
                emChamadaController.parent = self;
                emChamadaController.setAccoesIniciais();
                emChamadaController.loadOwnEcraView();
            }
        }
    
        HUD.accoes.clickBack = function() {
            if (HUD.ecraActual) {
                self.opcaoActual = undefined;
                chamadasController.loadOwnEcraView();
                chamadasController.setAccoesIniciais();
            }
        }
    
        HUD.accoes.scroll = function(e) {
            var scrollDirectionUP = e.deltaY < 0;
            if (HUD.ecraActual) {
                if (scrollDirectionUP) {
                    self.previousOption();
                } else {
                    self.nextOption();
                }
            }
        }

        HUD.accoes.clickRIGHT = function(){};
        HUD.accoes.clickLEFT = function(){
            chamadasController.loadOwnEcraView();
            chamadasController.setAccoesIniciais();
            HUD.accoes.clickBack();
        };
    }

    nextOption() {
        this.opcaoActual = (this.opcaoActual + 1) % this.contactos.length;
        if (this.opcaoActual < 0) this.opcaoActual += this.contactos.length;
        //console.log("opcaoActual: "+this.opcaoActual+"   "+this.contactos[this.opcaoActual]);
        this.setDisplayedOptions();
    }

    previousOption() {
        this.opcaoActual = (this.opcaoActual - 1) % this.contactos.length;
        if (this.opcaoActual < 0) this.opcaoActual += this.contactos.length;
        //console.log("opcaoActual: "+this.opcaoActual+"   "+this.contactos[this.opcaoActual]);
        this.setDisplayedOptions();
    }

    setDisplayedOptions() {
        var self = this;
        var middle = Math.trunc(self.linhas / 2);
        var start = self.opcaoActual - middle;
        if (start<0) start += self.contactos.length;
        var displayed = [];
        var i = 0;
        for (i=start; i<start+self.linhas; i++) {
            var j = i % self.contactos.length;
            var k = (i-1) % self.contactos.length;
            if (k<0) k += self.contactos.length;
            if (self.contactos[j].substring(0,1) == self.contactos[k].substring(0,1)) {
                displayed.push("<li class='li-0'>"+self.contactos[j]+"</li>");
            } else {
                displayed.push("<li class='li-"+self.contactos[j].substring(0,1)+"'>"+self.contactos[j]+"</li>");
            }
        }
        $("#CONTACTOS-opcoes").html(displayed);
        $("#CONTACTOS-opcoes li").eq(middle).addClass('opcao-seleccionada');
    }

    //Carrega o HTML do proprio ecra
    loadOwnEcraView() {
        var self = this;
        if (HUD.ecraActual) {
            $.get(this.url, function(data) {
                // breadcrumbs
                $("#hud-screen-container-inner").html(data);
                HUD.setBreadCrumbs(self.breadCrumbs);
                HUD.showTopBar();
                self.setDisplayedOptions();
                self.updateInterface();
            })
            .fail(function(){
                alert("não consegui obter html da view!");
            });
        } else {
            $("#hud-screen-container-inner").html('');
        }
    }

    updateInterface() {
        //$("#CONTACTOS-opcoes li").eq(this.opcaoActual).addClass("opcao-seleccionada");
    }
}

var contactos_todos = [
    "Paulo Fernandes Ferreira",
    "Paulo Melo Rodrigues",
    "Eduarda Silva Correia",
    "Clara Lima Fernandes",
    "Agatha Lima Cardoso",
    "Julieta Carvalho Goncalves",
    "Isabela Azevedo Alves",
    "Aline Pereira Cunha",
    "Marina Barros Pinto",
    "Ana Martins Souza",
    "Isabelle Pereira Araujo",
    "Emily Silva Martins",
    "Victor Almeida Goncalves",
    "Camila Araujo Alves",
    "Bruno Goncalves Souza",
    "Melissa Pereira Carvalho",
    "Leila Oliveira Rodrigues",
    "Luana Barbosa Gomes",
    "Alice Rodrigues Santos",
    "Kaua Cardoso Almeida",
    "Amanda Castro Barbosa",
    "Isabela Carvalho Rodrigues"
];

var contactos_favoritos = contactos_todos.slice(0,7);
contactos_favoritos.sort();

var contactosFavoritosController = new contactosControllerBase(contactos_favoritos, "<span>CHAMADAS</span> > <span>CONTACTOS FAVORITOS</span>");

contactos_todos.sort();
var contactosTodosController = new contactosControllerBase(contactos_todos, "<span>CHAMADAS</span> > <span>TODOS OS CONTACTOS</span>");

