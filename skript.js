const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

let handleliste = JSON.parse(getCookie("handleliste"))


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
oppdaterSumHandleKurv()

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

    document.querySelector("#antall-res").innerHTML = "Antall resultater: " + filtrerteVarer.length
}

function lol() {
    location.href = "handlekurv.html"
}

function leggTilIHandleliste(id) {
    if (handleliste.some(e => e.id == id)) {
        handleliste[handleliste.findIndex(e => e.id == id)].antall++
    } else {
        handleliste.push({ "id": id, "antall": 1 })
    }
    oppdaterSumHandleKurv()
    
    setCookie("handleliste", JSON.stringify(handleliste), 1)
}

function oppdaterSumHandleKurv() {
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
    debounce(handScroll, 16.66666);
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