export class Room{
    "id": number;
    "name": string;
    "unread": number; 
    constructor(id: number, name: string, unread: number = 0){
        this.id = id;
        this.name = name;
        this.unread = unread;
    }
}