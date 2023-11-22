/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
const path = require('path')

function createKeyMapping(obj, prefix = '') {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return null
  }

  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key

    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      acc[key] = createKeyMapping(obj[key], newKey)
    } else {
      acc[key] = newKey
    }

    return acc
  }, {})
}

function fileWrapper(json) {
  return `// THIS FILE IS AUTO GENERATED, DO NOT TOUCH
export const i18nKeys = ${json}`
}

function processAndSaveJson(inputPath, outputPath) {
  try {
    // Resolve absolute paths
    const absoluteInputPath = path.resolve(inputPath)
    const absoluteOutputPath = path.resolve(outputPath)

    // Read and parse input JSON file
    const fileContent = fs.readFileSync(absoluteInputPath, 'utf-8')
    const jsonData = JSON.parse(fileContent)

    // Create key mapping while maintaining structure
    const keyMapping = createKeyMapping(jsonData)

    // Create output directory if it doesn't exist
    const outputDir = path.dirname(absoluteOutputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Write result to output file
    fs.writeFileSync(
      absoluteOutputPath,
      fileWrapper(JSON.stringify(keyMapping, null, 2)),
      'utf-8'
    )

    console.log(`Successfully processed ${inputPath}`)
    console.log(`Output saved to ${outputPath}`)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

// Parse command line arguments
const args = process.argv.slice(2)

if (args.length !== 2) {
  console.error('Usage: json-key-mapper <input-file> <output-file>')
  console.error('Example: json-key-mapper input.json output.json')
  process.exit(1)
}

const [inputPath, outputPath] = args

// Process the file and save results
processAndSaveJson(inputPath, outputPath)
