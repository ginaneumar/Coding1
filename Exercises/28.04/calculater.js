function calculate() {
  var seriesNum = document.getElementById("seriesNum").value;
  var numElements = document.getElementById("numElements").value;
  var fnValue = document.getElementById("fnValue").value;
  var output = ""; // leere Variable

  switch (seriesNum) {
    case "1":
      var Fn = fnValue || 1;
      output += Fn + ", "; //Startwert zur Ausgabe hinzufügen
      for (var i = 2; i <= numElements; i++) { //Schleife für die restlichen elemente
        Fn = i * i;
        output += Fn; // Ergebnis wird an Ausgabe hinzugefügt
        if (i != numElements) output += ", "; //kein Komma am Ende falls letzes Element 
      }
      break;

    case "2":
      var Fn = fnValue || 1;
      output += Fn + ", ";
      for (var i = 2; i <= numElements; i++) {
        Fn *= 2;
        output += Fn;
        if (i != numElements) output += ", "; //kein Komma am Ende
      }
      break;

    case "3":
      var Fn1 = 0;
      var Fn2 = fnValue || 1;
      var Fn3;
      output += Fn2 + ", ";
      for (var i = 2; i <= numElements; i++) {
        Fn3 = Fn2 - Fn1 + i;
        output += Fn3;
        Fn1 = Fn2;
        Fn2 = Fn3;
        if (i != numElements) output += ", ";//kein Komma am Ende
      }
      break;

    case "4":
      var primeCount = 0;
      var n = fnValue || 1;
      while (primeCount < numElements) {
        if (isPrime(n)) {
          output += n;
          primeCount++;
          if (primeCount != numElements) output += ", ";//kein Komma am Ende
        }
        n++;
      }
      break;

    default:
      output = "Invalid series number!";
      break;
  }

  document.getElementById("seriesOutput").innerHTML = output;
}

function isPrime(num) {
  if (num < 2) {
    return false;
  }
  for (var i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}
