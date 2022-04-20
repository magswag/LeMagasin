class MatVareKomponent extends HTMLElement {

    get pris() {
        return "35kr"
    }

    get navn() {
        return "Banan"
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            #topp {
                background-color: var(--bakgrunn);
                padding:0px;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.5);
                transition: filter 0.1s ease-in-out,box-shadow 0.1s ease-in-out;
                color: var(--tekstfarge);
            }

            #topp:hover {
                filter: brightness(0.85);
                box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.25);
                cursor: pointer;
            }

            h3 {
                margin: 0px;
                font-family: 'Times New Roman', serif;
            }

            #lol {
                padding: 16px
            }

            p {
                margin: 0px;
                margin-top: 4px;
                font-family: 'Roboto', sans-serif;
            }

            #bilde {
                width: 175px;
                height:175px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #fff;
            }

            #bilde img {
                border-radius:16px;

                -webkit-backdrop-filter: blur(14px) saturate(3);

                backdrop-filter: blur(14px) saturate(3);
                padding: 20px;
                margin: -20px;
            }

            #forelder {
                background-repeat: no-repeat;
                background-image: url("${this.vare.bilde}");
                background-size: 125px;
            }

            #pris {
                font-family: 'Roboto', sans-serif;
            }

        </style>
        <div id="topp">
            <div id="bilde">
                <div id="forelder">
                    <img src="${this.vare.bilde}" height="125" width="125">
                </div>
            </div>
            <div id="lol">
                <h3 id="pris">${
                    this.vare.pris.toString().replace(".", ",")
                }kr</h3>
                <h3>${this.vare.navn}</h3>
                <p>${this.vare.info}</p>
            </div>
        </div>
        `
    }
}

customElements.define('matvare-komponent', MatVareKomponent);