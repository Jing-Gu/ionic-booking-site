export class Place {
  constructor(
    public id: string, 
    public title: string, 
    public description: string, 
    public imageUrl: string,
    public price: number,
    public availableFrom: Date,
    public availableTo : Date,
    public userId: string
    ){}
    /* id: string
    title: string
    description: string
    imageUrl: string
    price: number

    constructor(id, title, description, imageUrl, price){
        this.id = id
        this.title = title,
        this.description = description,
        this.imageUrl = imageUrl,
        this.price = price
    } */
}