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
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <style>
            #topp {
                align-self: start;
                background-color: var(--overflate-variant);
                padding:0px;
                border-radius: 24px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.4);
                transition: filter 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
                color: var(--tekstfarge);
            }

          

            h3 {
                margin: 0px;
                font-family: 'Times New Roman', serif;
            }

            #lol {      
                display: flex;
                padding: 16px;
                flex-direction: column;
                gap: 8px;
            }

            p {
                margin: 0px;
                font-family: 'Roboto', sans-serif;
            }

            #bilde {
                border-radius: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: var(--sekundær);
            }

            img {
                width: 100%;
                aspect-ratio: 1 / 1;
                padding: 24px;
                border-radius: 12px;
                box-sizing: border-box;
                -webkit-filter: drop-shadow(0px 8px 12px rgba(0,0,0,0.75));
                filter: drop-shadow(0px 8px 12px rgba(0,0,0,0.75));
            }

            #forelder {
                border-radius: 12px;
                background-repeat: no-repeat;
                background-image: url("${this.vare.bilde}");
                background-size: 75px;
            }

            #pris {
                font-family: 'Roboto', sans-serif;
            }

            button {
                background-color: var(--sekundær);
                color: var(--på-primær);
                border: 0;
                border-radius: 500px;
                align-self: flex-end;
                padding: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 4px;
                transition: filter 0.05s ease-in-out;
            }

            @media only screen and (min-width: 768px) {

                button:hover {
                    filter: brightness(0.75);
                    cursor: pointer;
                }
                #topp {
                    flex-direction: column;
                    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.5);
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
                    
                    -webkit-backdrop-filter: blur(0px) saturate(1.5);
    
                    backdrop-filter: blur(0px) saturate(1.5);
                    padding: 20px;
                    margin: -20px;
                }
            }

        </style>
        <div id="topp">
            <div id="bilde">
                <img src="${this.vare.bilde}">
            </div>

            <div id="lol">
                <h3>${this.vare.navn}</h3>
                <p>${this.vare.info}</p>
                <button>
                <h3 style="display: inline;" id="pris">${this.vare.pris.toString().replace(".", ",")}kr</h3>
                <i class="material-icons" style="font-size:24px;">add_shopping_cart</i>
                </button>
            </div>
        </div>
        `


        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            this.antall++
            this.dispatchEvent(new CustomEvent('lagtTil', {
                detail: {
                    id: this.id
                }
            }))
        })
    }

}

customElements.define('matvare-komponent', MatVareKomponent);