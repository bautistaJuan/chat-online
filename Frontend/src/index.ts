import { state } from "./state";
import "./router";
import "./pages/home";
import "./pages/chat";
import "./components/buble";
import "./components/title";
(function () {
  console.log("Index.ts");
  state.init();
})();
