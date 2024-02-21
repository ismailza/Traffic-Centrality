const XLSX = require('xlsx');
const fs = require('fs');

const filePath = 'C:\\Users\\HP FOLIO 9470m\\Downloads\\Average_Daily_Traffic_Counts.csv';

const workbook = XLSX.readFile(filePath);

const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];
function columnToIndex(column) {
    return column.charCodeAt(0) - 65;
}


let RoadNetwork = new Map();
var obj;
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
    if(columnIndex ==2  )
    { 
        obj={
            street:cell.v,
            flow:'',
            lat:'',
            lon:'',
        };
        continue;
    }
    if(columnIndex ==4  )
    {
        obj.flow=cell.v;
        continue;
    }

    if(columnIndex ==6  )
    {
        obj.lat=cell.v;
        continue;
    }
    if(columnIndex ==7 )
    {
        obj.lon=cell.v;
        RoadNetwork.set(obj.street,obj);
        continue;
    }
}



function normaliser(RoadNetwork) {
    // Obtenir la valeur maximale dans la Map
    let maxValue=0;
    for (let [key, value] of RoadNetwork) {
        if(maxValue<value.flow)
        maxValue=value.flow;
    }
    // let maxValue = Math.max(...RoadNetwork.values().flow);

    // Parcourir chaque entrée de la Map
    for (let [key, value] of RoadNetwork) {
        // Diviser la valeur par la valeur maximale
        value.flow=value.flow / maxValue
        RoadNetwork.set(key, value);
    }
}

normaliser(RoadNetwork);

for (let [key, value] of RoadNetwork) {
    console.log(value);
}

// normaliser(RoadNetwork)
// RoadNetwork.forEach((Data, IdSe) => {
//    console.log(IdSe+" : "+Data);
// });






let ob = {};
for (let [key, value] of RoadNetwork) {
    ob[key] = value;
}

// Convertir l'objet en JSON
let jsonData = JSON.stringify(ob, null, 2); // Le deuxième paramètre est pour l'espacement pour la lisibilité

// Écrire les données JSON dans un fichier
fs.writeFile('output.json', jsonData, (err) => {
    if (err) {
        console.error('Erreur lors de l\'écriture du fichier :', err);
        return;
    }
    console.log('La Map a été écrite avec succès dans le fichier output.json');
});
