const JsConfuser = require('js-confuser');
const fs = require('fs');
const path = require('path');

const inputFile = './stealer.js';
const outputFolder = '../build';
const outputFile = './AzRkApq1MdmLapQ.js';

const originalCode = fs.readFileSync(inputFile, 'utf-8');

JsConfuser.obfuscate(originalCode, {
    "target": "node",
    "controlFlowFlattening": 1,
    "minify": true,
    "globalConcealing": true,
    "stringCompression": 1,
    "stringConcealing": 1,
    "stringEncoding": 1,
    "stringSplitting": 1,
    "deadCode": 1,
    "calculator": 1,
    "compact": true,
    "movedDeclarations": true,
    "objectExtraction": true,
    "stack": true,
    "duplicateLiteralsRemoval": 1,
    "flatten": true,
    "dispatcher": true,
    "opaquePredicates": 1,
    "shuffle": { "hash": 1, "true": 1 },
    "renameVariables": true,
    "renameGlobals": true
}).then((obfuscatedCode) => {

    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }

    const outputPath = path.join(outputFolder, outputFile);
    fs.writeFileSync(outputPath, obfuscatedCode);

    console.log(`Arquivo obfuscado salvo em: ${outputPath}`);
}).catch((error) => {
    console.error('Erro durante a obfuscação:', error);
});
