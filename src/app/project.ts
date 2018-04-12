export class Project {
  
  constructor(
   
    public project_name: string,
    public project_create_time: number,
    public isStarred:boolean,
    public isActive:boolean
  ) {}
  public _id:any
}
