const me = "@jul_enrique";

const resultado = document.querySelector("#LugarResultado");
const resLive = document.querySelector("#resultadoLive");

resultado.textContent = me;

const btnNumero = document.getElementsByClassName("nro");
const btnCalcu = document.getElementsByClassName("tecla");

const btnSum = document.getElementById("suma");
const btnRes = document.getElementById("res");
const btnMul = document.getElementById("mul");
const btnDiv = document.getElementById("div");
const btnPer = document.getElementById("percentage");

const btnIgual = document.getElementById("igual");
const btnClearAll = document.getElementById("clear-all");
const btnClear = document.getElementById("clear");
const btnMe = document.getElementById("me");
const btnDot = document.getElementById("dot");

let is_after = false;
let n_operacion = 0;
let n_nroTemp = 0;
let n_nroTempAfter = 0;
let n_nroTempBefore = 0;
let s_nroTempScreen = "";

let n_dots = 0;

const variablesToZero = () => {
  s_nroTempScreen = "";
  n_nroTempAfter = 0;
  n_nroTempAfter = 0;
};
variablesToZero();

const printConsole = () => {
  console.clear();
  console.group("Consola");

  console.table({
    n_nroTempBefore: n_nroTempBefore,
    n_nroTempAfter: n_nroTempAfter,
    s_nroTempScreen_length: s_nroTempScreen.length,
    s_nroTempScreen: s_nroTempScreen,
    n_operacion: n_operacion,
    n_nroTemp: n_nroTemp,
    is_after: is_after,
  });

  console.groupEnd();
};

const preOperacion = () => {
  if (!is_after) {
    n_nroTempBefore = Number(s_nroTempScreen);
    n_dots = 0;
    return;
  }
  n_nroTempAfter = Number(s_nroTempScreen);
  n_dots = 0;
};

const operacionLive = (par1, par2) => {
  resLive.textContent =
    "= " +
    String(
      (() => {
        if (n_operacion == 1) {
          return par1 + par2;
        } else if (n_operacion == 2) {
          return par1 - par2;
        } else if (n_operacion == 3) {
          return par1 * par2;
        } else if (n_operacion == 4) {
          return par1 / par2;
        }
      })()
    );
};

const Operacion = (p_operationActual) => {
  switch (p_operationActual) {
    case 1:
      n_nroTempBefore += n_nroTempAfter;
      n_nroTemp = n_nroTempBefore;
      variablesToZero();
      n_nroTempBefore = n_nroTemp;

      console.log("sumó!");
      break;

    case 2:
      n_nroTempBefore -= n_nroTempAfter;
      n_nroTemp = n_nroTempBefore;
      variablesToZero();
      n_nroTempBefore = n_nroTemp;

      console.log("restó!");
      break;

    case 3:
      n_nroTempBefore *= n_nroTempAfter;
      n_nroTemp = n_nroTempBefore;
      variablesToZero();
      n_nroTempBefore = n_nroTemp;

      console.log("mutitplico!");
      break;

    case 4:
      n_nroTempBefore /= n_nroTempAfter;
      n_nroTemp = n_nroTempBefore;
      variablesToZero();
      n_nroTempBefore = n_nroTemp;

      console.log("dividio!");
      break;

    case 5:
      n_nroTempBefore /= 100;
      n_nroTemp = n_nroTempBefore;
      variablesToZero();
      n_nroTempBefore = n_nroTemp;

      console.log("saco su porcentaje");
      break;

    default:
      console.warn("No hay operacion actual.");
      break;
  }
};

(function updateCalculator() {
  for (const iterator of btnNumero) {
    iterator.onclick = () => {
      if (s_nroTempScreen.includes(".")) {
        n_dots = 1;
      }

      btnDot.textContent = n_dots == 1 ? "" : ".";

      if (s_nroTempScreen.length < 16) {
        s_nroTempScreen += iterator.textContent;
        toPrint(s_nroTempScreen);
        preOperacion();
        printConsole();
        // console.log(s_nroTempScreen[s_nroTempScreen.length - 1]);
        if (is_after) {
          //dot after bug = new operation ok
          if ((s_nroTempScreen[s_nroTempScreen.length - 1] /= ".")) {
            s_nroTempScreen = String(n_nroTempBefore);
            Operacion(n_operacion);
          }
          operacionLive(n_nroTempAfter, n_nroTempBefore);
        }
      }
    };
  }
})();

// [+][+][+][+][+][+][+][+][+][+][+][+][+][+][+][+][+][+][+][+][+][+][+]
btnSum.onclick = () => {
  Operacion(1);
  n_operacion = 1;
  toPrint("+");
  s_nroTempScreen = "";
  is_after = true;
};

// [-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-][-]
btnRes.onclick = () => {
  Operacion(2);
  n_operacion = 2;
  toPrint("-");
  s_nroTempScreen = "";
  is_after = true;
  // console.log("termino btnRes");
};

//[*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*][*]
btnMul.onclick = () => {
  Operacion(3);
  n_operacion = 3;
  toPrint("*");
  s_nroTempScreen = "";
  is_after = true;
};

//[/][/][/][/][/][/][/][/][/][/][/][/][/][/][/][/][/][/][/][/][/][/][/][/]
btnDiv.onclick = () => {
  Operacion(4);
  n_operacion = 4;
  toPrint("/");
  s_nroTempScreen = "";
  is_after = true;
};
//[%][%][%][%][%][%][%][%][%][%][%][%][%][%][%][%][%][%][%][%][%][%][%][%]
btnPer.onclick = () => {
  Operacion(5);
  s_nroTempScreen = String(n_nroTempBefore);
  toPrint(s_nroTempScreen);
  is_after = false;
};

//[=][=][=][=][=][=][=][=][=][=][=][=][=][=][=][=][=][=][=][=][=][=][=][=]
btnIgual.onclick = () => {
  Operacion(n_operacion);
  // n_nroTempBefore.toFixed(6
  s_nroTempScreen = String(parseFloat(n_nroTempBefore));
  toPrint(s_nroTempScreen);
  is_after = false;
  // n_operacion = 0;
  // preOperacion();
};

btnMe.onclick = () => {
  toPrint(me);
};

btnClearAll.onclick = () => {
  console.clear();
  variablesToZero();
  resLive.textContent = "";
  n_nroTemp = 0;
  toPrint(0);
  is_after = false;
};

btnClear.onclick = () => {
  s_nroTempScreen = s_nroTempScreen.slice(0, -1);
  toPrint(s_nroTempScreen);
  operacionLive(n_nroTempAfter, n_nroTempBefore);
  preOperacion();
};

const toPrint = (value) => {
  resultado.textContent = value;
};
