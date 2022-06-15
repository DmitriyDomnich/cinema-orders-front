import { InjectionToken } from "@angular/core";
import { ISeat } from "../core/models/seat-model";

export type TicketsCache = Map<string, { tickets: ISeat[] }>;

export const SESSIONS_TOKEN = new InjectionToken<TicketsCache>("sessions");
