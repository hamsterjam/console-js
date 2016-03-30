(function() {
   var oldLog = console.log;
   var oldInfo = console.info;
   var oldWarn = console.warn;
   var oldError = console.error;

   function appendInDiv(str, className) {
      var div = document.createElement("DIV");
      div.className = className + " message";
      div.appendChild(document.createTextNode(str));
      document.getElementById('console').appendChild(div);

      var spacer = document.createElement("DIV");
      spacer.className = "spacer";
      spacer.appendChild(document.createElement("BR"));
      document.getElementById('console').appendChild(spacer);

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
})();

document.addEventListener('DOMContentLoaded', function() {
   var con = document.createElement("DIV");
   con.id = "console";
   document.body.appendChild(con);
});

