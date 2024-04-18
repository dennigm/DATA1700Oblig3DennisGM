let billetter  = [];

function kjøp() {
    const input = {
        film: document.getElementById("film").value,
        antall: document.getElementById("antall").value,
        fornavn: document.getElementById("fornavn").value,
        etternavn: document.getElementById("etternavn").value,
        tlf: document.getElementById("tlf").value,
        epost: document.getElementById("epost").value,
    }

    let errorAntall = 0;

    const regexAntall = /[1-9]{1,25}/;
    let regexAntallCheck = regexAntall.test(input.antall);

    const regexFornavn = /[A-Å]{1,25}/;
    let regexFornavnCheck = regexFornavn.test(input.fornavn);

    const regexEtternavn = /[A-Å]{1,25}/;
    let regexEtternavnCheck = regexEtternavn.test(input.etternavn);

    const regexTlf = /[0-9]{8}/;
    let regexTlfCheck = regexTlf.test(input.tlf);

    const regexEpost = /[@.]/;
    let regexEpostCheck = regexEpost.test(input.epost);

    if(regexAntallCheck === false) {
        document.getElementById("errorAntall").innerHTML = "Feltet må fylles inn med et gyldig antall";
        errorAntall++
    }
    else{
        document.getElementById("errorAntall").innerHTML = " ";
    }

    if(regexFornavnCheck === false) {
        document.getElementById("errorFornavn").innerHTML = "Feltet må fylles inn med et gyldig fornavn";
        errorAntall++
    }
    else{
        document.getElementById("errorFornavn").innerHTML = " ";
    }

    if(regexEtternavnCheck === false) {
        document.getElementById("errorEtternavn").innerHTML = "Feltet må fylles inn med et gyldig etternavn";
        errorAntall++
    }
    else{
        document.getElementById("errorEtternavn").innerHTML = " ";
    }

    if(regexTlfCheck === false) {
        document.getElementById("errorTlf").innerHTML = "Feltet må fylles inn med et gyldig telefonnummer (8 siffer)";
        errorAntall++
    }
    else{
        document.getElementById("errorTlf").innerHTML = " ";
    }

    if(regexEpostCheck === false) {
        document.getElementById("errorEpost").innerHTML = "Feltet må fylles inn med en gyldig E-Post";
        errorAntall++
    }
    else{
        document.getElementById("errorEpost").innerHTML = " ";
    }

    if (errorAntall===0){
        $.post("/lagre", input, function () {
            hentBillett();
        });
    }







    if(errorAntall === 0){
        billetter.push(input);
        console.log(billetter)

        document.getElementById("antall").value = "";
        document.getElementById("fornavn").value = "";
        document.getElementById("etternavn").value = "";
        document.getElementById("tlf").value = "";
        document.getElementById("epost").value = "";

        visBilletter();
    }
}

function hentBillett(){
    $.get("/hentAlle", function (data){
        visBilletter(data)
    });
}

function  visBilletter(){
    let vis;
    let ut = "";
    for(let i =0;i<billetter.length;i++){
        ut += "Film "+billetter[i].film+"<br>"+
            "Antall Billetter: "+billetter[i].antall+"<br>"+
            "Navn: "+billetter[i].fornavn+" "+billetter[i].etternavn+"<br>"+
            "TelefonNr: "+billetter[i].tlf+"<br>"+
            "E-Post: "+billetter[i].epost+"<br>"+" "+"<br>";
        document.getElementById("visBilletter").innerHTML =ut;
    }
}


function slettBestillinger(){
    while(billetter.length>0) {
    billetter.pop()
}
    document.getElementById("visBilletter").innerHTML = " ";
    $.get("/slettAlle", function (){
        hentBillett();
    });}
