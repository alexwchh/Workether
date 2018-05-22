export class Project {
  
  constructor(
   
    public project_name: string,
    public project_create_time: Date,
    public isStarred:boolean,
    public isActive:boolean,
    
  ) {}
  public project_owner:string
  public user_id:string
  public _id:any
}
