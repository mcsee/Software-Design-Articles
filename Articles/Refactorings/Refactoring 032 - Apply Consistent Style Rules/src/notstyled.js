class User{
private name;
    public email;
  
constructor(name,email) {
this.name=name;
        this.email = email;
}

    private validateEmail() {
return this.email.includes('@');
    }

public getName(){
        return this.name;
}

  public setName(newName)
{
    this.name=newName;
  }
}