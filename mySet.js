class Group {

  constructor(arr = 0) {
    for (let i = 0, j = 0; i < arr.length; i++) {
      if (Group.equality(this, arr[i])) {
        this[j] = arr[i];
        j++;
      }
    }
  }

  add(value) {
    if (Group.equality(this, value) && Object.keys(this).length) {
      this[Object.keys(this).length] = value;
    } else if (Group.equality(this, value) && !Object.keys(this).length) {
      this[0] = value;
    }
  }

  delete(value) {
    let vals = Group.getValues(this);
    if (vals.indexOf(value) >= 0) {
      vals.splice(vals.indexOf(value), 1);
      return new Group(vals);
    }
  }
  
  has(value) {
    return !Group.equality(this, value);
  }
  
  static equality(obj, value) {
    for (let i in obj) {
      if (obj[i] === value) {
        return false;
      }
    }
    return true;
  }
  
  static getValues(obj) {
    let arr = [];
    for (let i in obj) {
      arr.push(obj[i]);
    }
    return arr;
  }
}

Group.prototype[Symbol.iterator] = function() {
  return new GroupIterator(this);
}

class GroupIterator {
  constructor(group) {
    this.index = 0;
    this.group = group;
  }
  
  next() {
    let props = Object.keys(this.group);
    if (this.index === props.length) {
      return {value: undefined, done: true};
    } 
    let value = this.group[props[this.index]];
    this.index++;
    return {value: value, done: false};
  }
}


let myGroup = new Group(['a', 'b', 'c', 1, 2, 3]);

for (let i of myGroup) {
  console.log(i);
}