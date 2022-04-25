const varer = [
    {
        navn: "Eple",
        pris: 5.2,
        info: "Rødt",
        bilde: "varer/eple.png",
        kategorier: ["frukt-grønt", "frukt"]
    },
    {
        navn: "Croissant",
        pris: 19.9,
        info: "m/Sjokolade",
        bilde: "varer/croissant.png",
        kategorier: ["bakevarer"]
    },
    {
        navn: "Brød",
        pris: 34,
        info: "",
        bilde: "varer/brød.png",
        kategorier: ["bakevarer"]
    },
    {
        navn: "Ananas",
        pris: 32.9,
        info: "stykk",
        bilde: "varer/ananas.png",
        kategorier: ["frukt-grønt", "frukt"]
    },
    {
        navn: "Mango",
        pris: 32.9,
        info: "stykk",
        bilde: "varer/mango.png",
        kategorier: ["frukt-grønt", "frukt"]
    },
    {
        navn: "Kjøttdeig",
        pris: 32.9,
        info: "stykk",
        bilde: "varer/kjøttdeig.png",
        kategorier: ["kjøtt", "storfe"]
    },
    {
        navn: "Appelsin",
        pris: 32.9,
        info: "stykk",
        bilde: "varer/appelsin.png",
        kategorier: ["frukt-grønt", "frukt"]
    },
    {
        navn: "Dom Perignon",
        pris: 3298,
        info: "Brut 2012",
        bilde: "varer/dompa.png",
        kategorier: ["drikke", "alkohol"]
    },
    {
        navn: "Brokkoli",
        pris: 8,
        info: "",
        bilde: "varer/brokkoli.png",
        kategorier: ["frukt-grønt", "grønnsak"]
    },
    {
        navn: "Gulrot",
        pris: 5,
        info: "",
        bilde: "varer/gulrot.png",
        kategorier: ["frukt-grønt", "grønnsak"]
    },
    {
        navn: "Sørlandschips",
        pris: 23,
        info: "Spansk paprika 195g",
        bilde: "varer/sørlandschips_spansk_paprika.png",
        kategorier: ["snacks-godis", "potetgull"]
    },
    {
        navn: "Freeze",
        pris: 95,
        info: "5 no-7",
        bilde: "varer/freeze-5-no-7.png",
        kategorier: ["tobakk", "snus"]
    },
    {
        navn: "Lettmelk 0,5%",
        pris: 19.9,
        info: "1l Tine",
        bilde: "varer/tinemelk-ekstra-lett.png",
        kategorier: ["drikke", "melk"]
    },
    {
        navn: "Coca Cola",
        pris: 22.2,
        info: "0,5l flaske",
        bilde: "varer/coca-cola-halvliter.png",
        kategorier: ["drikke", "leskedrikke"]
    },
    {
        navn: "Grandiosa Pizza",
        pris: 53.4,
        info: "575g Stabburet",
        bilde: "varer/grandiosa.png",
        kategorier: ["frysevarer", "frossenpizza"]
    },
    {
        navn: "Jarlsberg",
        pris: 103,
        info: "Skorpefri 700g Tine",
        bilde: "varer/jarlsberg.png",
        kategorier: ["ost"]
    },
    {
        navn: "Fanta",
        pris: 22.2,
        info: "0,5l flaske",
        bilde: "varer/fanta.png",
        kategorier: ["drikke", "leskedrikke"]
    },
    {
        navn: "Solo",
        pris: 22.2,
        info: "0,5l flaske",
        bilde: "varer/solo.png",
        kategorier: ["drikke", "leskedrikke"]
    },
    {
        navn: "Pringles",
        pris: 23,
        info: "Spansk paprika 194g",
        bilde: "varer/pringles-original.png",
        kategorier: ["snacks-godis", "potetgull"]
    },
]

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


let handleliste = []

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

const kategoriVelger = document.querySelector("#kategori")
const søkefelt = document.querySelector("#søkefelt")
const sortering = document.querySelector("#sortering")
const antallKurv = document.querySelector("#antall-kurv")


let filterKategori = urlParams.get('kategori')
let søk = urlParams.get('søk')

if (søk != undefined) {
    søkefelt.value = søk
}

if (filterKategori != undefined) {
    kategoriVelger.value = filterKategori
}

sortering.addEventListener('change', oppdaterSøk)

kategoriVelger.addEventListener("change", () => {
    oppdaterSøk()
})

søkefelt.addEventListener("keyup", () => {
    oppdaterSøk()
})

oppdaterSøk()

function oppdaterSøk() {
    const url = new URL(window.location);

    if (kategoriVelger.value != "alle") {
        url.searchParams.set('kategori', kategoriVelger.value)
    } else {
        url.searchParams.delete('kategori')
    }

    if (søkefelt.value != "") {
        url.searchParams.set('søk', søkefelt.value)
    } else {
        url.searchParams.delete('søk')
    }
    window.history.pushState({}, '', url);

    document.getElementById("varer").innerHTML = ""

    let filtrerteVarer = varer.filter(vare => {
        if (kategoriVelger.value == "alle" || vare.kategorier.includes(kategoriVelger.value.toLowerCase())) {
            if (søkefelt.value == "" || vare.navn.toLowerCase().includes(søkefelt.value.toLowerCase())) {
                return true
            }
        }
    })

    switch (sortering.value) {
        case "alfabetisk":
            filtrerteVarer.sort((a, b) => {
                return a.navn.toLowerCase().localeCompare(b.navn.toLowerCase());
            })
            break;
        case "pris":
            filtrerteVarer.sort((a, b) => {
                return a.pris - b.pris
            })
            break;
    }

    for (let vare of filtrerteVarer) {
        const komponent = document.createElement('matvare-komponent')
        komponent.vare = vare
        komponent.id = varer.findIndex(varee => vare.navn == varee.navn)
        komponent.addEventListener("lagtTil", (e) => {
            leggTilIHandleliste(e.detail.id)
        })

        document.getElementById('varer').appendChild(komponent)
    }
}

function lol() {

}

function leggTilIHandleliste(id) {
    if (handleliste.some(e => e.id == id)) {
        handleliste[handleliste.findIndex(e => e.id == id)].antall++
    } else {
        handleliste.push({ "id": id, "antall": 1 })
    }

    let sum = 0

    for (let vare of handleliste) {
        sum += vare.antall
    }
    antallKurv.innerHTML = sum

}

function debounce(method, delay) {
    clearTimeout(method._tId);
    method._tId = setTimeout(function () {
        method();
    }, delay);
}

const header = document.querySelector("header")
const body = document.body;
const main = document.querySelector("main");
const logo = document.querySelector("#logo");

let headerHeight = header.offsetHeight;
main.style.paddingTop = headerHeight + "px";
let lastScroll = 0;
var gang = 0;
window.addEventListener("scroll", () => {
    debounce(handScroll, 100/60);
})

function handScroll() {
    headerHeight = header.offsetHeight;
    let currentScroll = window.pageYOffset;



    let komme = false

    if (currentScroll > headerHeight - (logo.offsetHeight + 32)) {
        header.classList.add("scroll-up");
        komme = true
    } else {
        header.classList.remove("scroll-up");
        komme = false
    }
    let hmm = komme ? logo.offsetHeight + 32 : 0

    gang = clamp(gang + (currentScroll - lastScroll), hmm, headerHeight)
    header.style.top = -gang + "px"

    lastScroll = currentScroll;
}