const XLSX = require('xlsx');

const filePath = 'C:\\Users\\HP FOLIO 9470m\\Downloads\\Traffic_Volume_Counts_20240214.csv';

const workbook = XLSX.readFile(filePath);

const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];
function columnToIndex(column) {
    return column.charCodeAt(0) - 65;
}

let RoadNetwork = new Map();
// Parcourir les cellules du fichier Excel et remplir la Map
for (const cellAddress in worksheet) {
    
    if (cellAddress[0] === '!') continue; // Ignorer les propriétés spéciales

    const cell = worksheet[cellAddress];
    const [_, column, row] = cellAddress.match(/^([A-Z]+)(\d+)$/);
    // Convertir la colonne en index de colonne
    const columnIndex = columnToIndex(column);
    const rowIndex = parseInt(row) - 1; // -1 car les indices de ligne commencent à 0
    // console.log(cell.v +" row "+ rowIndex +" col "+columnIndex);
    if (rowIndex == 0)
         continue;
    if(columnIndex ==1)
    {
        IdSegment=cell.v;
        RoadNetwork.set(IdSegment,0);
        continue;
    }
    if(7<=columnIndex && columnIndex<=25 )
    {
        RoadNetwork.set(IdSegment,RoadNetwork.get(IdSegment)+cell.v);
        continue;
    }
}

function normaliser(RoadNetwork) {
    // Obtenir la valeur maximale dans la Map
    let maxValue = Math.max(...RoadNetwork.values());

    // Parcourir chaque entrée de la Map
    for (let [key, value] of RoadNetwork) {
        // Diviser la valeur par la valeur maximale
        RoadNetwork.set(key, value / maxValue);
    }
}
// normaliser(RoadNetwork)
// RoadNetwork.forEach((Data, IdSe) => {
//    console.log(IdSe+" : "+Data);
// });

