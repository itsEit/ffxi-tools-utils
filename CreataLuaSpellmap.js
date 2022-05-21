import fs from "fs";

// Function will take lua files from input folder and create json file in output folder
function luaToJson(fileName) {
  fs.readFile("./input/" + fileName + ".lua", (error, data) => {
    if (error) {
      throw error;
    }



    let string = data.toString();
    let match = string.match(/\{.+\}/g);
    let stuff = 'return {\n';

    let arr = string.split("\r\n");

    for (let i = 0; i < arr.length; i++) {
      const line = arr[i];
      if (/(?<=\[)(.*?)(?=\])/.test(line)) {
        const itemId = line.match(/(?<=\[)(.*?)(?=\])/)[0];
        const id = line.match(/(id=)(.*?)(?=[,}])/)[0];
        const en = line.match(/(en=)(.*?)(?=[,}])/)[0];
        const type = line.match(/(type=)(.*?)(?=[,}])/)[0];
        stuff = stuff + `    [${itemId}] = {${id},${en},${type}},\n`
      }
    }
    stuff = stuff + `}`


    fs.writeFileSync("./output/" + fileName + ".lua", stuff);
  });
}

luaToJson("spells");

// (en=)(.*?)(?=[,}])
// (?<=\[)(.*?)(?=\])
