export class userDetail{
    public firstName:string;
    public lastName:string;
    public email:string;
    public gender:string;
    public skills:any;
    public city:string;
    public imagePath:string;
    
    constructor(firstName:string, lastName:string, email:string, gender:string, skills:any, city:string, imagePath:string){
         this.firstName = firstName;
         this.lastName = lastName;
         this.email = email;
         this.gender = gender;
         this.skills = skills;
         this.city = city;
         this.imagePath = imagePath;
    }
}