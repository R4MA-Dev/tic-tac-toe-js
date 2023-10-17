let botBtn = document.getElementById("bot-btn"); 


botBtn.addEventListener("click", ()=>{
    let audioWin = new Audio("../audio/win.mp3");
    let audioPedo = new Audio("../audio/pedo.mp3");
    let audioLose = new Audio("../audio/lose.mp3");

    let tablero = document.getElementById("tablero");
    let turno = 1;
    let fichas = ["O", "X"];
    let puestas = 0;
    let partidaAcabada = false;
    let textoVictoria = document.getElementById("tablero-victoria");
    let elegirContainer = document.getElementById("elegir");
    let botones = Array.from(document.getElementsByTagName("button"));
    
    elegirContainer.style.display = "none"
    tablero.style.display = "flex"

    botones.forEach(x => x.addEventListener("click", ponerFicha));

    function ponerFicha(event){
        let botonPulsado = event.target

        if(!partidaAcabada && botonPulsado.innerHTML == ""){
            botonPulsado.innerHTML = fichas[turno]
            botonPulsado.style.color = "blue"

            puestas += 1

            let estadoPartida = estado();
            if(estadoPartida == 0){
                cambiarTurno();
                if(puestas < 9){
                    ia();
                    estadoPartida = estado();
                    puestas += 1;
                    cambiarTurno();
                }
            }
            
            if(estadoPartida == 1){
                audioWin.play()
                textoVictoria.style.color = "green"
                textoVictoria.innerHTML = "Has ganado :)"
                partidaAcabada = true
            }
            else if(estadoPartida == -1){
                audioLose.play()
                textoVictoria.style.color = "red"
                textoVictoria.innerHTML = "Has perdido :("
                partidaAcabada = true
            }
            else if(estadoPartida == 0 && puestas === 9){
                audioPedo.play();
                textoVictoria.style.color = "yellow"
                textoVictoria.innerHTML = "Empate!"
                partidaAcabada = true
            }

            if(partidaAcabada === true){
                let btnReiniciar = document.getElementById("btn-reiniciar")
                btnReiniciar.style.display = "block"

                btnReiniciar.addEventListener("click", ()=>{
                    location.reload();
                })
            }
        }
    }

    function cambiarTurno(){
        if(turno==1){
            turno = 0;
        }
        else{
            turno = 1
        }
        return turno
    }

    function estado(){
    let posicionVictoria = 0;
    let nEstado = 0;

    function sonIguales(...args){
        let valores = args.map(x=>x.innerHTML);
        if(valores[0] != "" && valores.every((x, i, arr) => x === arr[0])){
                args.forEach(x => x.style.backgroundColor = "rgb(198, 31, 198)");
                return true
        }
        else{
            return false
        }
    }

    if(sonIguales(botones[0], botones[1], botones[2])){
        posicionVictoria = 1;
    }
    else if(sonIguales(botones[3], botones[4], botones[5])){
            posicionVictoria = 2;       
    }
    else if(sonIguales(botones[6], botones[7], botones[8])){
        posicionVictoria = 3;       
    }
    else if(sonIguales(botones[0], botones[3], botones[6])){
        posicionVictoria = 4;       
    }
    else if(sonIguales(botones[1], botones[4], botones[7])){
        posicionVictoria = 5;       
    }
    else if(sonIguales(botones[2], botones[5], botones[8])){
        posicionVictoria = 6;       
    }
    else if(sonIguales(botones[0], botones[4], botones[8])){
        posicionVictoria = 7;       
    }
    else if(sonIguales(botones[2], botones[4], botones[6])){
        posicionVictoria = 8;       
    }

    if(posicionVictoria > 0){
        if(turno == 1){
            nEstado = 1;
        }
        else{
            nEstado = -1
        }
    }
    return nEstado
    }

    function ia(){
        function aleatorio(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
        let valores = botones.map(x => x.innerHTML);
        let pos = -1

        if(valores[4]===""){
            pos = 4
        }
        else{
            let n = aleatorio(0, botones.length-1);
            while(valores[n]!=""){
                n = aleatorio(0, botones.length-1)
            }
            pos = n
        }
        botones[pos].innerHTML = "O";
        botones[pos].style.color = "red"
        return pos;
    }
})