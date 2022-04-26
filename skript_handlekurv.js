let handleliste = JSON.parse(getCookie("handleliste"))
console.log(handleliste)
let pris = 0
handleliste.forEach(vare => {
    let en = document.createElement("div")
    en.innerHTML = varer[vare.id].navn + " x" + vare.antall
    document.getElementById("kurv").appendChild(en)

    pris += varer[vare.id].pris * vare.antall
})

document.getElementById("pris").innerHTML = pris.toString().replace(".", ",") + "kr"