class Webpage {
  
  renderHTML() {
    this.renderDocType();
    this.renderTitle();
    (new RSSFeed()).render();
    this.renderRssTitle();
    this.renderRssDescription();
   // ...
  }
  //HTML render can change
}

class RSSFeed {
  render() {
    this.renderDescription();
    this.renderTitle();
    this.renderPubDate();
    //...
  }  
  //RSS Format might change
  //Might have unitary tests 
  //etc
}

//Code Belongs to article
//https://github.com/mcsee/Software-Design-Articles/blob/main/Articles/Code%20Smells/Code%20Smell%20124%20-%20Divergent%20Change.md