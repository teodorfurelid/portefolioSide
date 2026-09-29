"use strict";

class Knapper {
    #tabellelement

    constructor(formelement, tabellelement) {
        formelement.addEventListener("submit", event => event.#leggTilListe(event));
        this.#tabellelement = tabellelement;

        const namnInput = formelement.elements["namnn"];
        namnInput.addEventListener(
            "input",
            event => event.#sjekkBokstavKontrol(event.target)
        );

        const emailInput = formelement.elements["email"];
        emailInput.addEventListener(
            "input",
            event => event.#sjekkBokstavKontrol(event.target)
        )

        this.#fyllListe();
    }


    #leggTilListe(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const medlem = {
            "namn": formData.get("namn"),
            "email": formData.get("email")
        }

        this.#visDeltager(medlem);
        event.target.reset();
    }

    #sjekkBokstavKontrol(event) {
        
    }

    #visDeltager(medlem) {
        const tbody = this.#tabellelement.tBodies[0];
        const HTMLTbodyRowsAsArray = Array.from(tbody.rows);
        const namnet = medlem.namn;
        const index = HTMLTbodyRowsAsArray.findIndex(
            rekke => {
                const trnummer = Number(rekke.cells[0].textContent);
                return namnet < trnummer;
            }
        )

        const newRow = this.#tabellelement.tBodies[index];
        newRow.dataset.namn = medlem.namn;
        newRow.insertCell(-1).textContent = medlem.namn;
        newRow.insertCell(-1).textContent = medlem.email;
    }
}

const formelement = document.getElementById("nyPerson");
const tabellelement = document.getElementById("output");
new Knapper(formelement, tabellelement);