import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import type { DataSource } from "typeorm";
export declare const initSocket: (server: HttpServer, dataSource: DataSource) => Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
//# sourceMappingURL=socket.d.ts.map