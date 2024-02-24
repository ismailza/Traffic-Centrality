import fs from 'fs/promises';
import path from 'path';
import stringify from 'json-stringify-pretty-compact';
import 'dotenv/config';

const inputDir = process.env.INPUT_DATA_DIR;
const outputDir = process.env.OUTPUT_DATA_DIR;

const csvParse = await import('csv-parse/sync');
const parse = csvParse.parse;

/**
 * Reads a CSV file and returns parsed data. Returns null if the file does not exist or an error occurs.
 * @param {string} filePath - The path to the CSV file.
 * @returns {Array|null} Parsed data as an array of objects, or null if an error occurs.
 */
const readCsvFile = async filePath => {
  try {
    const csvData = await fs.readFile(filePath, 'utf-8');
    return parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });
  } catch (error) {
    console.error(`Error reading file: ${filePath}`, error);
    return null;
  }
}

/**
 * loadCoordinates - Load coordinates from a CSV file and return a mapping of roadway names to coordinates.
 * @param { string } coordinatesFilePath
 * @returns { object } coordinatesMapping
 */
const loadCoordinates = async (coordinatesFilePath) => {
  const csvData = await fs.readFile(coordinatesFilePath, 'utf-8');
  const records = parse(csvData, { columns: true, skip_empty_lines: true });
  const coordinatesMapping = [];
  records.forEach(record => {
    coordinatesMapping[record.RoadwayName] = {
      Latitude: record.Latitude,
      Longitude: record.Longitude
    };
  });
  return coordinatesMapping;
};

/**
 * Processes the parsed CSV data, organizing it by time slot and normalizing flow values within each time slot.
 * @param {Array} records - The parsed CSV data as an array of objects.
 * @returns {Object} The processed data organized by time slots, with normalized flow values.
 */
const processData = (records, coordinatesMapping) => {
  const output = {};
  const timeSlots = Object.keys(records[0]).filter(key => key.match(/\d{1,2}:\d{2}-\d{1,2}:\d{2}[AP]M/));

  // Process each time slot
  let count = 0;
  timeSlots.forEach(timeSlot => {
    // Normalize flow values for the current time slot
    const normalizedFlows = normalizeFlow(records, timeSlot);
    records.forEach((record, index) => {
      const timeSlotFormatted = timeSlot.replace(/\s+/g, ''); // Format time slot string
      if (!output[timeSlotFormatted]) {
        output[timeSlotFormatted] = [];
      }
      const coords = coordinatesMapping[record['Roadway Name']] || coordinatesMapping[record.From] || coordinatesMapping[record.To] || { Latitude: 'Not Available', Longitude: 'Not Available' };
      if (coords.Latitude != 'Not Available' && coords.Longitude != 'Not Available') {
        output[timeSlotFormatted].push({
          SegmentID: record.SegmentID,
          RoadwayName: record['Roadway Name'],
          From: record.From,
          To: record.To,
          Direction: record.Direction,
          Date: record.Date,
          flow: normalizedFlows[index],
          Latitude: coords.Latitude,
          Longitude: coords.Longitude
        });
      } else {
        count++;
      }
    });
  });
  console.log('Number of records with no coordinates:', count);
  return output;
}

/**
 * Normalizes the flow values for a given time slot across all records.
 * @param {Array} records - Array of record objects.
 * @param {String} timeSlot - The time slot for which to normalize flow values.
 * @returns {Object} An object containing normalized flow values keyed by record indices.
 */
const normalizeFlow = (records, timeSlot) => {
  let minFlow = Infinity;
  let maxFlow = -Infinity;

  // Find min and max flow values for the specified time slot
  records.forEach(record => {
    const flow = parseFloat(record[timeSlot]);
    if (flow < minFlow) minFlow = flow;
    if (flow > maxFlow) maxFlow = flow;
  });

  // Calculate normalized flow values
  const normalizedFlows = records.map(record => {
    const flow = parseFloat(record[timeSlot]);
    // Avoid division by zero in case all flows are the same
    const normalizedFlow = maxFlow - minFlow > 0 ? (flow - minFlow) / (maxFlow - minFlow) : 0;
    return normalizedFlow;
  });

  return normalizedFlows;
}

/**
 * writeJsonFile - Write the processed data to a JSON file
 * @param { object } output 
 * @param { string } outputPath
 */
const writeJsonFile = async (output, outputPath) => {
  try {
    await fs.writeFile(outputPath, stringify(output, { indent: 2 }), 'utf-8');
    console.log(`JSON file has been successfully created at ${outputPath}`);
  } catch (error) {
    console.error(`Error writing file: ${outputPath}`, error);
  }
}

/**
 * processCsvFile - Read a CSV file, process the data, and write the output to a JSON file
 * @param { string } filePath: Path to the CSV file
 * @param { string } outputPath: Path to the output JSON file
 * @returns { void }
 */
const processCsvFile = async (filePath, outputPath, coordinatesMapping) => {
  const records = await readCsvFile(filePath);
  if (records) {
    const processedData = processData(records, coordinatesMapping);
    await writeJsonFile(processedData, outputPath);
  }
};

/**
 * main - Entry point
 */
const main = async () => {
  try {
    const coordinatesFilePath = path.join('app/data', 'coordinates.csv'); // Ensure this path is correct
    const coordinatesMapping = await loadCoordinates(coordinatesFilePath); // Load coordinates mapping

    const files = await fs.readdir(inputDir);
    const csvFiles = files.filter(file => file.endsWith('.csv') && file !== 'coordinates.csv');

    for (const file of csvFiles) {
      const csvFilePath = path.join(inputDir, file);
      const jsonOutputPath = path.join(outputDir, `${path.parse(file).name}.json`);
      await processCsvFile(csvFilePath, jsonOutputPath, coordinatesMapping); // Pass coordinatesMapping to processCsvFile
    }
  } catch (error) {
    console.error('Error processing files:', error);
  }
};

// Run the main function
main();
