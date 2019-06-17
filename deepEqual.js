function deepEqual(obj1,obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  } else {
    for (let prop in obj1) {
      if (typeof obj1[prop] === "object" && typeof obj2[prop] === "object") {
        deepEqual(obj1[prop],obj2[prop]);
      } else if (obj1[prop] !== obj2[prop]) {
        return false;
      }
    }
    return true;
  }
}

let object = {hello: {"is": "an"}, lul: 2};
let object2 = {hello: {"is": "an"}, lulz: 2};
console.log(deepEqual(object,object2));