class MatVareKomponent extends HTMLElement {

    get antall() {
        return this.getAttribute('antall')
    }

    set antall(ny) {
        this.setAttribute('antall', ny)
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.antall = 0
        this.shadowRoot.innerHTML = `
        <style>
            #topp {
                background-color: var(--bakgrunn);
                padding:0px;
                border-radius: 16px;
                overflow: hidden;
                height: 100%;
                display: flex;
                flex-direction: row;
                box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.5);
                transition: filter 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
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
                width: 100px;
                height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #fff;
            }
           

            #bilde img {
                border-radius:0px;
                border-right:1px solid #16222c; 

                -webkit-backdrop-filter: blur(8px) saturate(1.5);

                backdrop-filter: blur(8px) saturate(1.5);
                padding: 20px;
                margin: -20px;
            }

            #forelder {
                background-repeat: no-repeat;
                background-image: url("${this.vare.bilde}");
                background-size: 75px;
            }

            #pris {
                font-family: 'Roboto', sans-serif;
            }

            img {
                width: 75px;
            }

            @media only screen and (min-width: 768px) {
                #topp {
                    flex-direction: column;
                }

                img {
                    width: 100px;
                }

                #forelder {
                    background-size: 100px;
                }

                #bilde {
                    width: 125px;
                    height: 125px;
                }

                #bilde img {
                    border-radius:0px;
                    border-right:1px solid #16222c; 
    
                    -webkit-backdrop-filter: blur(12px) saturate(1.5);
    
                    backdrop-filter: blur(12px) saturate(1.5);
                    padding: 20px;
                    margin: -20px;
                }
            }

        </style>
        <div id="topp">
            <div id="bilde">
                <div id="forelder">
                    <img src="${this.vare.bilde}">
                </div>
            </div>

            <div id="lol">
                <h3 id="pris">${this.vare.pris.toString().replace(".", ",")}kr</h3>
                <h3>${this.vare.navn}</h3>
                <p>${this.vare.info}</p>
            </div>
        </div>
        `
    }
}

customElements.define('matvare-komponent', MatVareKomponent);