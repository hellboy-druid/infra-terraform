// parser.js
// Parses configuration files for infra-terraform.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Parses a configuration file. Supports JSON and YAML formats.
 * @param {string} filePath - The path to the configuration file.
 * @returns {object} - The parsed configuration object.
 * @throws {Error} - If the file does not exist or if parsing fails.
 */
function parseConfigFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Configuration file not found: ${filePath}`);
    }

    const fileExtension = path.extname(filePath).toLowerCase();
    const fileContent = fs.readFileSync(filePath, 'utf8');

    switch (fileExtension) {
      case '.json':
        return JSON.parse(fileContent);
      case '.yaml':
      case '.yml':
        return yaml.load(fileContent);
      default:
        throw new Error(`Unsupported file format: ${fileExtension}`);
    }
  } catch (error) {
    throw new Error(`Failed to parse configuration file: ${error.message}`);
  }
}

/**
 * Validates the parsed configuration object against a schema.
 * @param {object} config - The parsed configuration object.
 * @param {object} schema - The JSON schema to validate against.
 * @returns {boolean} - True if the configuration is valid, false otherwise.
 */
function validateConfig(config, schema) {
  const Ajv = require('ajv');
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(config);

  if (!valid) {
    console.error('Configuration validation errors:');
    validate.errors.forEach(error => {
      console.error(`  ${error.dataPath} ${error.message}`);
    });
    return false;
  }

  return true;
}

/**
 * Merges multiple configuration objects into a single object.
 * Later configurations override earlier ones.
 * @param  {...object} configs - The configuration objects to merge.
 * @returns {object} - The merged configuration object.
 */
function mergeConfigs(...configs) {
  return configs.reduce((acc, config) => {
    if (config && typeof config === 'object') {
      return { ...acc, ...config };
    }
    return acc;
  }, {});
}

module.exports = {
  parseConfigFile,
  validateConfig,
  mergeConfigs,
};