let jogo = []
let possibilidades = []
let tentativas = 0
const bordaCima = ["0_0", "0_1", "0_2", "0_3", "0_4", "0_5", "0_6", "0_7", "0_8", "3_0", "3_1", "3_2", "3_3", "3_4", "3_5", "3_6", "3_7", "3_8", "6_0", "6_1", "6_2", "6_3", "6_4", "6_5", "6_6", "6_7", "6_8"]
const bordaBaixo = ["8_0", "8_1", "8_2", "8_3", "8_4", "8_5", "8_6", "8_7", "8_8"]
const bordaEsquerda = ["0_0", "1_0", "2_0", "3_0", "4_0", "5_0", "6_0", "7_0", "8_0", "0_3", "1_3", "2_3", "3_3", "4_3", "5_3", "6_3", "7_3", "8_3", "0_6", "1_6", "2_6", "3_6", "4_6", "5_6", "6_6", "7_6", "8_6"]
const bordaDireita = ["0_8", "1_8", "2_8", "3_8", "4_8", "5_8", "6_8", "7_8", "8_8"]

function init() {
    var bd = document.getElementById("body")
    for (let l = 0; l < 9; l++) {
        jogo[l] = []
        var linha = document.createElement("div")
        for (let c = 0; c < 9; c++) {
            const celula = document.createElement("input")
            celula.id = `${l}_${c}`
            celula.style.border = "gray solid 1px"
            celula.style.textAlign = "center"
            linha.appendChild(celula)
            jogo[l][c] = celula;
        }
        bd.appendChild(linha)
    }
    montarPossibilidades()
    bordaCima.forEach(i => document.getElementById(i).style.borderTop = "black solid 4px")
    bordaBaixo.forEach(i => document.getElementById(i).style.borderBottom = "black solid 4px")
    bordaEsquerda.forEach(i => document.getElementById(i).style.borderLeft = "black solid 4px")
    bordaDireita.forEach(i => document.getElementById(i).style.borderRight = "black solid 4px")
}

function montarPossibilidades() {
    for (let i = 0; i < 9; i++) {
        possibilidades[i] = []
        for (let j = 0; j < 9; j++) {
            possibilidades[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    }
}

function limpar() {
    possibilidades = []
    jogo.forEach(l => l.forEach(c => c.value = ''))
    montarPossibilidades()
}

function validarPossibilidades() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (possibilidades[i][j] != [] && possibilidades[i][j].length == 1) {
                jogo[i][j].value = possibilidades[i][j][0]
                possibilidades[i][j] = []
                tentativas = 0
            }
        }
    }
}

function limpaPosssibilidade() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (jogo[i][j].value != '') {
                possibilidades[i][j] = []
            }
        }
    }
}


function atualizaPossibilidades() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (jogo[i][j].value != '') {
                validaLinha(i, jogo[i][j].value)
                validaColuna(j, jogo[i][j].value)
                validaQuadrante(i, j, jogo[i][j].value)
            }
        }
    }
}

function exceptPossibilidades() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (jogo[i][j].value == '') {
                exceptLinha(i, j)
                exceptColuna(i, j)
                exceptQuadrante(i, j,)
            }
        }
    }
}

function validaLinha(iLinha, valor) {
    for (let j = 0; j < 9; j++) {
        possibilidades[iLinha][j] = possibilidades[iLinha][j].filter(i => i != valor)
    }
}

function exceptLinha(iLinha, iColuna) {
    let except = possibilidades[iLinha][iColuna].slice();
    for (let j = 0; j < 9; j++) {
        if (j != iColuna) {
            except = except.filter(p => !possibilidades[iLinha][j].includes(p))
        }
    }
    if (except.length == 1)
        possibilidades[iLinha][iColuna] = except
}

function exceptColuna(iLinha, iColuna) {
    let except = possibilidades[iLinha][iColuna].slice();
    for (let j = 0; j < 9; j++) {
        if (j != iColuna) {
            except = except.filter(p => !possibilidades[j][iColuna].includes(p))
        }
    }
    if (except.length == 1)
        possibilidades[iLinha][iColuna] = except
}

function exceptQuadrante(iLinha, iColuna) {
    let except = possibilidades[iLinha][iColuna].slice();

    var quadranteLinha = Math.floor(iLinha / 3)
    var quadranteColuna = Math.floor(iColuna / 3)

    for (let i = (quadranteLinha * 3); i < (quadranteLinha * 3) + 3; i++) {
        for (let j = (quadranteColuna * 3); j < (quadranteColuna * 3) + 3; j++) {
            if (!(i == iLinha && j == iColuna)) {
                except = except.filter(p => !possibilidades[i][j].includes(p))
            }
        }
    }
    if (except.length == 1)
        possibilidades[iLinha][iColuna] = except
}


function validaColuna(iColuna, valor) {
    for (let j = 0; j < 9; j++) {
        possibilidades[j][iColuna] = possibilidades[j][iColuna].filter(i => i != valor)
    }
}

function validaQuadrante(iLinha, iColuna, valor) {
    var quadranteLinha = Math.floor(iLinha / 3)
    var quadranteColuna = Math.floor(iColuna / 3)

    for (let i = (quadranteLinha * 3); i < (quadranteLinha * 3) + 3; i++) {
        for (let j = (quadranteColuna * 3); j < (quadranteColuna * 3) + 3; j++) {
            possibilidades[i][j] = possibilidades[i][j].filter(a => a != valor)
        }
    }
}

function validarCompleto(){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if(jogo[i][j].value =='')
            return false 
        }
    }
    return true
}


function resolver() {
    let completo = false
    tentativas = 0
    while (tentativas < 5 && !completo) {
        tentativas++
        limpaPosssibilidade()
        atualizaPossibilidades()
        exceptPossibilidades()
        validarPossibilidades()
        completo = validarCompleto()
    }
    if(completo){   
        alert("Finalizado!")
    }else if (tentativas >= 5)
        alert("Não foi possível resover o jogo")
}
