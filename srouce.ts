// Micro:Bit Environment. Edit and Compile at makecode.microbit.org

let expectedInput = ""
let randomValue = 0
let gameState = 0
let currentInstructions: string[] = []
let currentInstructionIndex = 0
let score = 0

function gameStart() {
    score = 0
    currentInstructions = []
    currentInstructionIndex = 0
    basic.showLeds(`
        . . . . .
        . # . # .
        # # . # #
        . # . # .
        . . . . .
        `)
}

input.onButtonPressed(Button.A, function () {
    if (gameState != 2) {
        return
    }

    expectedInput = currentInstructions[currentInstructionIndex]
    if (expectedInput == "B") {
        gameState = 3
    } else {
        currentInstructionIndex += 1

        if (currentInstructionIndex == currentInstructions.length) {
            score = score + 1
            gameState = 1
        }
    }
})

input.onButtonPressed(Button.AB, function () {
    gameState = 1
})

input.onButtonPressed(Button.B, function () {
    if (gameState != 2) {
        return
    }

    expectedInput = currentInstructions[currentInstructionIndex]

    if (expectedInput == "A") {
        gameState = 3
    } else {
        currentInstructionIndex += 1

        if (currentInstructionIndex == currentInstructions.length) {
            score = score + 1
            gameState = 1
        }
    }
})

function gameOver() {
    basic.showString("GG")
    basic.showNumber(score)
    basic.pause(500)
    gameState = 0
}

function showInstructions() {
    randomValue = Math.randomRange(0, 1)
    if (randomValue == 0) {
        currentInstructions.push("A")
    } else if (randomValue == 1) {
        currentInstructions.push("B")
    }

    for (let i = 0; i < currentInstructions.length; i++) {
        basic.showString(currentInstructions[i])
        basic.pause(200)
        basic.clearScreen()
        basic.pause(100)
    }

    currentInstructionIndex = 0
    gameState = 2
}

function waitForPlayerInput() {
    basic.showLeds(`
        . . # . .
        . . # . .
        # # # # #
        . # # # .
        . . # . .
        `)
}

basic.forever(function () {
    if (gameState == 0) {
        gameStart()
    }
    if (gameState == 1) {
        showInstructions()
    }
    if (gameState == 2) {
        waitForPlayerInput()
    }
    if (gameState == 3) {
        gameOver()
    }
})
