import injector from "./core/injector";
import {Server} from "./server";

let server: Server;
server = injector.get(Server);
server.startServer();