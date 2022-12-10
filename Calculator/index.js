var deleteBtn = document.getElementById("delete");
var reset = document.getElementById("reset");
var result = document.getElementById("result");
var selectionSpan = document.getElementById("selection");
var lastSpan = document.getElementById("last");
var possibilities = document.querySelectorAll(".possible");
var operators = document.querySelectorAll(".op");
var haveResult = false;
var afterResult = false;
var decimal = false;
var total = 0;
var selection = "";
var last = "";
var operatorStr = "";

possibilities.forEach((possibility) => {
    possibility.addEventListener("click", () => {
        if (afterResult)
            initialPosition();
        let value = possibility.getAttribute("id");
        value.trim();
        var treated = value.replace(",", ".");
        if (treated.trim() === ".") {
            treated = decimal ? "" : treated;
            decimal = true;
        }
        selection += treated !== "." || (treated === "." && selection !== "") ? treated : "";
        selectionSpan.textContent = selection;
    })
});

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        if (selection !== "") {
            let op = operator.getAttribute("id");
            op.trim();
            opFunc(op);
        }
    })
})

window.document.addEventListener("keyup", (e) => {
    var keyPressed = e[['key']];
    if (/0|1|2|3|4|5|6|7|8|9|,/.test(keyPressed)) {
        if (afterResult)
            initialPosition();
        keyPressed.trim();
        var treated = keyPressed.replace(",", ".");
        if (treated.trim() === ".") {
            treated = decimal ? "" : treated;
            decimal = true;
        }
        selection += treated !== "." || (treated === "." && selection !== "") ? treated : "";
        selectionSpan.textContent = selection;
    }
    if (/Backspace/.test(keyPressed)) {
        if (selection !== "") {
            var sliced = selection.slice(0, -1);
            selection = sliced;
            selectionSpan.textContent = selection;
        }
    }
    if (/Enter/.test(keyPressed))
        setResult();
    if (/Escape/.test(keyPressed))
        initialPosition();
    if (keyPressed === "+" || keyPressed === "-" || keyPressed === "*" || keyPressed === "/")
        opFunc(keyPressed.trim());
})

result.addEventListener("click", () => {
    setResult();
})

deleteBtn.addEventListener("click", () => {
    if (selection !== "") {
        var sliced = selection.slice(0, -1);
        selection = sliced;
        selectionSpan.textContent = selection;
    }
})

reset.addEventListener("click", () => {
    initialPosition()
});

function opFunc(op) {
    decimal = false;
    if (last === "") {
        last = selection;
        afterResult = false;
    }
    else {
        if (operatorStr === "+") {
            total = parseFloat(last) + parseFloat(selection);
        }
        else if (operatorStr === "-") {
            total = parseFloat(last) - parseFloat(selection);
        }
        else if (operatorStr === "/") {
            if (selection === "0") {
                alert("Can't divide by 0");
                selection = "1";
            }
            total = parseFloat(last) / parseFloat(selection);
        }
        else {
            total = parseFloat(last) * parseFloat(selection);
        }
        total = total.toFixed(2);
        last = total.toString();
    }
    operatorStr = op;
    selection = "";
    selectionSpan.textContent = selection;
    lastSpan.textContent = last;
}

function initialPosition() {
    decimal = false;
    total = 0;
    selection = "";
    last = "";
    selectionSpan.textContent = selection;
    lastSpan.textContent = last;
    afterResult = false;
}

function setResult() {
    decimal = false;
    if (last !== "") {
        if (operatorStr === "+") {
            total = parseFloat(last) + parseFloat(selection);
        }
        else if (operatorStr === "-") {
            total = parseFloat(last) - parseFloat(selection);
        }
        else if (operatorStr === "/") {
            if (selection === "0") {
                alert("Can't divide by 0");
                selection = "1";
            }
            total = parseFloat(last) / parseFloat(selection);
        }
        else {
            total = parseFloat(last) * parseFloat(selection);
        }
        total = total.toFixed(2);
        selection = total.toString();
        last = "";
        afterResult = true;
        selectionSpan.textContent = selection;
        lastSpan.textContent = last;
    }
}