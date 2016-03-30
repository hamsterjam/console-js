(function() {
   var oldLog = console.log;
   var oldInfo = console.info;
   var oldWarn = console.warn;
   var oldError = console.error;

   function appendInDiv(input, className) {
      function process(item) {
         if (typeof item === "string") {
            return '"' + item + '"';
         }
         else if (item instanceof Array) {
            return "Array["+item.length+"]";
         }
         else if (item.toString() === "[object Object]"){
            return "Object";
         }
         return item.toString();
      }

      var str = '';

      if (input === undefined) {
         str = 'undefined';
      }
      else if (input instanceof Array) {
         str += '[';
         for (let i=0; i < input.length; ++i) {
            str += process(input[i]) + ", ";
         }
         if (str.length > 1) str = str.slice(0, -2);
         str += ']';
      }
      else if (input.toString() === "[object Object]") {
         str += 'Object {';
         for (let prop in input) if (input.hasOwnProperty(prop)) {
            str += prop + ": " + process(input[prop]) + ", ";
         }
         if (str.length > 8) str = str.slice(0, -2);
         str += '}';
      }
      else {
         str = input.toString();
      }

      var consoleDiv = document.getElementById('console');

      var div = document.createElement("DIV");
      div.className = className + " message";
      div.appendChild(document.createTextNode(str));
      consoleDiv.appendChild(div);;;

      var spacer = document.createElement("DIV");
      spacer.className = "spacer";
      spacer.appendChild(document.createElement("BR"));
      consoleDiv.appendChild(spacer);
   }

   // Hijack log
   console.log = function(...args) {
      appendInDiv(args[0], "log");
      oldLog.call(console, ...args);
   };

   // Hijack info
   console.info = function(...args) {
      appendInDiv(args[0], "info");
      oldInfo.call(console, ...args);
   };

   // Hijack warn
   console.warn = function(...args) {
      appendInDiv(args[0], "warn");
      oldWarn.call(console, ...args);
   };

   //Hijack error
   console.error = function(...args) {
      appendInDiv(args[0], "error");
      oldError.call(console, ...args);
   }

   document.addEventListener('DOMContentLoaded', function() {
      var consoleDiv = document.createElement("DIV");
      consoleDiv.id = "console";

      // Auto scroll
      var observer = new MutationObserver(function() {
         document.body.scrollTop = document.body.scrollHeight;
      });
      observer.observe(consoleDiv, {childList: true});

      // Input bar
      var inText = document.createElement("INPUT");
      var inButt = document.createElement("BUTTON");

      inText.id = "console-input";
      inButt.id = "console-button";

      function doInput() {
         //This is slightly naiive, declaring variables won't work
         appendInDiv(eval(inText.value), "return");
         inText.value = '';
      }

      inButt.addEventListener('click', doInput);
      inText.addEventListener('keydown', function(e) {
         if (e.keyCode === 13) doInput();
      });

      consoleDiv.appendChild(inText);
      consoleDiv.appendChild(inButt);

      document.body.appendChild(consoleDiv);
   });

})();
