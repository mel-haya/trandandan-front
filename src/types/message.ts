export class Message{
    "id": number;
    "channelId": number;
    "author": string;
    "content": string;
    "from" : string;
    constructor(id: number, channelId: number, author: string, content: string, from: string){
        this.id = id;
        this.channelId = channelId;
        this.author = author;
        this.content = content;
        this.from = from;
    }
}