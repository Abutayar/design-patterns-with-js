const fs = require('fs');

class Journal
{
  constructor() {
    this.entries = {};
  }

  addEntry(text)
  {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index)
  {
    delete this.entries[index];
  }

  toString()
  {
    return Object.values(this.entries).join('\n');
  }

  // #### Moving below method to separate class so we have SRP
  // save(filename)
  // {
  //   fs.writeFileSync(filename, this.toString());
  // }
  //
  // load(filename)
  // {
  //   //
  // }
  //
  // loadFromUrl(url)
  // {
  //   //
  // }
}
Journal.count = 0;

class PersistenceManager
{
  preprocess(j)
  {
    //
  }

  saveToFile(journal, filename)
  {
    fs.writeFileSync(filename, journal.toString());
  }

  load(filename)
  {
    //
  }
  
  loadFromUrl(url)
  {
    //
  }
}

let j = new Journal();
j.addEntry('I cried today.');
j.addEntry('I ate a bug.');
console.log(j.toString());

let p =new PersistenceManager();
let filename = 'c:/temp/journal.txt';
p.saveToFile(j, filename);

// separation of concerns