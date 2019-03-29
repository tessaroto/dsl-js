
class BlockString {
  constructor(raw) {
    this.raw = raw;
    this.position = 0;
    this.lines = raw.split(/\r\n|[\n\r]/g);;
  }

  currentPosition(){
    return this.position;
  }

  next() {

    while(this.lines.length > this.position++){
      if (!this.isEmpty(this.current()) && !this.isComment(this.current()))
        return true;
    }
    return false;
  }

  current() {
    return this.lines[this.position];
  }

  isEmpty(raw){
    return  raw==null || raw.trim().length==0;
  }

  isComment(raw){
    return  raw != null && raw.trim().startsWith("//");
  }

}

module.exports = BlockString;