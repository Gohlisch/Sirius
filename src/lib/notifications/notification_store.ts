import type { Subscriber, Unsubscriber, Writable } from "svelte/store";
import {writable} from "svelte/store";

export class NotificationStore implements SvelteStore<Message[]> {
    private _messages: Message[] = [];
    private _messagesWritable: Writable<Message[]> = writable(this._messages)

    constructor() {
        this._messagesWritable.subscribe((ms) => this._messages = ms);
    }

    subscribe(run: Subscriber<Message[]>, invalidate?: (value?: Message[]) => void): Unsubscriber {
        return this._messagesWritable.subscribe(run, invalidate);
    }

    set(messages: Message[]) {
        this._messagesWritable.set(messages);
    }

    show(message: Message, options?: NotificationOptions) {
        this._messagesWritable.update((_ms) => _ms.concat([message]));
        if(options && options.msVisible) {
            setTimeout(()=> this.remove(message), options.msVisible);
        }
    }

    remove(message: Message) {
        this._messagesWritable.update((_ms) => _ms.filter(m => m !== message));
    }
}

export const notificationStore = new NotificationStore();

export interface NotificationOptions {
    msVisible: number
}

export interface Message {
    title: string,
    content: string,
    type: MessageType,
    iconPath?: string
}

export enum MessageType {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error"
}