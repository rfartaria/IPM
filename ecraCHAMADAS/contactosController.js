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
                emChamadaController.updateInterface();
            }
        }
    
        HUD.accoes.clickBack = function() {
            if (HUD.ecraActual) {
                self.opcaoActual = undefined;
                chamadasController.loadOwnEcraView();
                chamadasController.updateInterface();
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
    }

    nextOption() {
        this.opcaoActual = (this.opcaoActual + 1) % this.contactos.length;
        this.setDisplayedOptions();
    }

    previousOption() {
        this.opcaoActual = (this.opcaoActual - 1) % this.contactos.length;
        this.setDisplayedOptions();
    }

    setDisplayedOptions() {
        var self = this;
        var middle = Math.trunc(self.linhas / 2);
        var start = self.opcaoActual - middle;
        if (start<0) start += self.contactos.length;
        var displayed = [];
        var i = 0;
        for (i=start; i<start+self.linhas; i++)
            displayed.push(self.contactos[i % self.contactos.length]);
        $("#CONTACTOS-opcoes").html(displayed.map(o => '<li>'+o+'</li>'));
        $("#CONTACTOS-opcoes li").eq(middle).addClass('opcao-seleccionada');
    }

    //Carrega o HTML do proprio ecra
    loadOwnEcraView() {
        var self = this;
        if (HUD.ecraActual) {
            $.get(this.url, function(data) {
                // breadcrumbs
                var ndata = data.replace(/CHAMADAS > CONTACTOS/, self.breadCrumbs);
                $("#hud-screen-container").html(ndata);
                self.setDisplayedOptions();
                self.updateInterface();
            })
            .fail(function(){
                alert("não consegui obter html da view!");
            });
        } else {
            $("#hud-screen-container").html('');
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
    "&Aacute;gatha Lima Cardoso",
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

var contactosFavoritosController = new contactosControllerBase(contactos_favoritos, "CHAMADAS > CONTACTOS FAVORITOS");

contactos_todos.sort();
var contactosTodosController = new contactosControllerBase(contactos_todos, "CHAMADAS > TODOS OS CONTACTOS");

