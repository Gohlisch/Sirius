import { api } from "./_api";
import type { Readable, Writable, Subscriber, Unsubscriber } from "svelte/store";
import { writable } from "svelte/store";
import { notificationStore, MessageType } from "$lib/notifications/notification_store.ts"

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
            this.getAll().catch(e => console.error(e));
        return this._store.subscribe(run, invalidate);
    }

    public get(primaryKeyValue: string): Promise<T> {
        return api(`${this.endpoint}/${primaryKeyValue}`, {method: "GET"})
            .then(response => response.json())
            .then(t => this.dtoToEntity(t)) as unknown as Promise<T>;
    }

    public getAll(): Promise<Array<T>> {
        return api(`${this.endpoint}/`, {method: "GET"})
            .then(response => response.json())
            .then(instances => instances.map(t => this.dtoToEntity(t)))
            .then(instances => this._store.set(instances)) as unknown as Promise<Array<T>>;
    }

    public post(instance: T): Promise<T> {
        return api(`${this.endpoint}`, {method: "POST", body: JSON.stringify(instance)})
            .then(response => response.json())
            .then(t => { this.saveInstance(this.dtoToEntity(t)); return t; }) as unknown as Promise<T>;
    }

    public delete(primaryKeyValue: string): Promise<T> {
        return api(`${this.endpoint}/${primaryKeyValue}`, {method: "DELETE"})
            .then(response => response.json())
            .then(t => { this.deleteInstance(this.dtoToEntity(t)); return t; }) as unknown as Promise<T>;
    }

    private saveInstance(instance: T): void {
        const index = this._instances.findIndex(t => t[this.primaryKey] = instance[this.primaryKey]);

        if(index === -1) {
            this._instances.push(instance);
        } else {
            this._instances[index] = instance;
        }

        this._store.set(this._instances); // inform subscribers
    }

    private deleteInstance(instance: T): void {
        const index = this._instances.findIndex(t => t[this.primaryKey] = instance[this.primaryKey]);

        if(index !== -1) {
            this._instances.splice(index, 1);
            this._store.set(this._instances); // inform subscribers
        }
    }
}