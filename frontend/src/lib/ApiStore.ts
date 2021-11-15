import { api } from "../routes/_api";
import type { Readable, Writable, Subscriber, Unsubscriber } from "svelte/store";
import { writable } from "svelte/store";

export type FetchFunction = (info: RequestInfo, init?: RequestInit) => Promise<Response>;
export type ErrorHandler = (result: Response)=>void;

export class ApiStore<T> implements Readable<Array<T>> {

    private _instances: Array<T> = [];
    private _store: Writable<Array<T>>;
    private _initialRequest: boolean = false;

    constructor(private endpoint: string, private primaryKey: string, private dtoToEntity: (t)=>T = (t: T)=>t) {
        this._store = writable(this._instances);
    }

    public subscribe(run: Subscriber<Array<T>>, invalidate?: (value?: Array<T>)=>void): Unsubscriber {
        if(!this._initialRequest)
            this.getAll();
        return this._store.subscribe(run, invalidate);
    }

    public get(primaryKeyValue: string, errorHandler: ErrorHandler = ()=>{}): Promise<T> {
        return api(`${this.endpoint}/${primaryKeyValue}`, {method: "GET"})
            .then(response => response.json())
            .then(t => this.dtoToEntity(t))
            .catch(errorHandler) as unknown as Promise<T>;
    }

    public getAll(errorHandler: ErrorHandler = ()=>{}): Promise<Array<T>> {
        return api(`${this.endpoint}/`, {method: "GET"})
            .then(response => response.json())
            .then(instances => instances.map(t => this.dtoToEntity(t)))
            .then(instances => this._store.set(this._instances.concat(instances)))
            .catch(errorHandler) as unknown as Promise<Array<T>>;
    }

    public post(instance: T, errorHandler: ErrorHandler = ()=>{}): Promise<T> {
        return api(`${this.endpoint}`, {method: "POST", body: JSON.stringify(instance)})
            .then(response => response.json())
            .then(t => this.dtoToEntity(t))
            .catch(errorHandler) as unknown as Promise<T>;
    }

    public delete(primaryKeyValue: string, errorHandler: ErrorHandler = ()=>{}): Promise<T> {
        return api(`${this.endpoint}/${primaryKeyValue}`, {method: "DELETE"})
            .then(response => response.json())
            .then(t => this.dtoToEntity(t))
            .catch(errorHandler) as unknown as Promise<T>;
    }
}