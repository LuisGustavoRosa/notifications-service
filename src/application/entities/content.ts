export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }
  private validateContentLenght(content : string){
    return content.length >= 5 && content.length <= 240;
  }
  constructor(content : string){
    const isContentLenghtValid = this.validateContentLenght(content);
    if(!isContentLenghtValid){
        throw new Error("Content length error.");
        
    }
    this.content = content
  }
}
