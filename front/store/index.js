import { configure } from "mobx";

configure({ enforceActions: "never" });
const axios = require("axios");
axios.defaults.baseURL = "http://localhost:8085";
import userStore from "./user";
import pageStore from "./page";
import postStore from "./post";

export { pageStore, userStore, postStore };
