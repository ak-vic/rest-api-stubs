function joinAbsoluteUrlPath(...args) {
    return args.map(pathPart => pathPart.toString().replace(/(^\/|\/$)/g, "")).join("/");
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function arrayIncludesNested(array, nested){
    let includes = true;
    nested.forEach(element => {
      if(!array.includes(element)){
        includes = false;
        return;
      }
    });
    return includes;
  }

module.exports.joinAbsoluteUrlPath = joinAbsoluteUrlPath;
module.exports.uuidv4 = uuidv4;
module.exports.arrayIncludesNested = arrayIncludesNested;
