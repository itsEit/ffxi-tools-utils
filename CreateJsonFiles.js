import fs from "fs";

// Function will take lua files from input folder and create json file in output folder
function luaToJson(fileName) {
  fs.readFile("./input/" + fileName + ".lua", (error, data) => {
    if (error) {
      throw error;
    }

    let string = data.toString();
    let match = string.match(/\{.+\}/g);
    let stuff = {};

    for (let i = 0; i < match.length - 1; i++) {
      let element = match[i];
      // Replace any colons with double underscore as workaround to JSON Parse issue
      element = element.replace(/:/g, "__");
      // Replace any "=" with colon for proper key:value structure
      element = element.replace(/=/g, ":");
      // Add Double quotes for Key for proper JSON structure
      element = element.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
      element = JSON.parse(element)
      // Replace underscores back to to Colon
      element = {...element,...{en:element.en.replace(/__/g, ":")}}
      stuff[element.id] = element
    }
    fs.writeFileSync("./output/" + fileName + ".json", JSON.stringify(stuff));
  });
}

luaToJson("jobs");
luaToJson("slots");
luaToJson("items");
luaToJson("item_descriptions");