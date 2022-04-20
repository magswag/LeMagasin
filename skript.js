const varer = [
    {
        navn: "Eple",
        pris: 5.2,
        info: "Rødt",
        bilde: "varer/eple.png",
        kategori: "frukt-grønt"
    },
    {
        navn: "Croissant",
        pris: 19.9,
        info: "m/Sjokolade",
        bilde: "varer/croissant.png",
        kategori: "bakevarer"
    },
    {
        navn: "Brød",
        pris: 34,
        info: "",
        bilde: "varer/brød.png",
        kategori: "bakevarer"
    },
    {
        navn: "Ananas",
        pris: 32.9,
        info: "stykk",
        bilde: "varer/ananas.png",
        kategori: "frukt-grønt"
    },
    {
        navn: "Dom Perignon",
        pris: 3298,
        info: "Brut 2012",
        bilde: "varer/dompa.png",
        kategori: "drikke"
    },
    {
        navn: "Brokkoli",
        pris: 8,
        info: "",
        bilde: "varer/brokkoli.png",
        kategori: "frukt-grønt"
    },
    {
        navn: "Gulrot",
        pris: 5,
        info: "",
        bilde: "varer/gulrot.png",
        kategori: "frukt-grønt"
    },
    {
        navn: "Sørlandschips",
        pris: 23,
        info: "Spansk paprika 195g",
        bilde: "varer/sørlandschips_spansk_paprika.png",
        kategori: "snacks-godis"
    },
    {
        navn: "Freeze",
        pris: 95,
        info: "5 no-7",
        bilde: "varer/freeze-5-no-7.png",
        kategori: "tobakk"
    },
    {
        navn: "Lettmelk 0,5%",
        pris: 19.9,
        info: "1l Tine",
        bilde: "varer/tinemelk-ekstra-lett.png",
        kategori: "drikke"
    },
    {
        navn: "Coca Cola",
        pris: 22.2,
        info: "0,33l flaske",
        bilde: "varer/coca-cola-halvliter.png",
        kategori: "drikke"
    },
    {
        navn: "Grandiosa Pizza",
        pris: 53.4,
        info: "575g Stabburet",
        bilde: "varer/grandiosa.png",
        kategori: "frysevarer"
    },
    {
        navn: "Jarlsberg",
        pris: 103,
        info: "Skorpefri 700g Tine",
        bilde: "varer/jarlsberg.png",
        kategori: "ost"
    },
]





const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

const kategoriVelger = document.querySelector("#kategori")
const søkefelt = document.querySelector("#søkefelt")
const sortering = document.querySelector("#sortering")

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
        if (kategoriVelger.value == "alle" || vare.kategori.toLowerCase() == kategoriVelger.value.toLowerCase()) {
            if (søkefelt.value == "" || vare.navn.toLowerCase().includes(søkefelt.value.toLowerCase())) {
                return true
            }
        }
    })

    switch (sortering.value) {
        case "alfabetisk":
            filtrerteVarer.sort((a,b) => {
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

        document.getElementById('varer').appendChild(komponent)
    }
}