const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Helper to clean up strings for fuzzy matching
function cleanForMatch(str) {
  return str.toLowerCase()
    .replace(/^\d+[\.\s]*/, '') // Remove numbers like "1. " or "2 " at start
    .replace(/[^a-z0-9]/g, ''); // Keep only alphanumeric
}

async function main() {
  const uri = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB!');

    const baseDir = path.join(__dirname, 'public', 'products');
    const categories = fs.readdirSync(baseDir);
    
    const allProducts = [];

    for (const catDir of categories) {
      const catPath = path.join(baseDir, catDir);
      if (!fs.statSync(catPath).isDirectory()) continue;

      console.log(`Processing category folder: ${catDir}`);
      
      // Read files in directory
      const files = fs.readdirSync(catPath);
      
      // Find the description file
      const descFile = files.find(f => f.toLowerCase().startsWith('description'));
      let descriptions = {};

      if (descFile) {
        const descContent = fs.readFileSync(path.join(catPath, descFile), 'utf-8');
        const lines = descContent.split('\n').map(l => l.trim()).filter(Boolean);
        
        let currentName = '';
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          
          // Check if this line is a description (usually in quotes or looks like one)
          if (line.startsWith('"') || line.startsWith('“') || line.length > 50) {
            if (currentName) {
              descriptions[cleanForMatch(currentName)] = line.replace(/^["“']|["”']$/g, ''); // strip quotes
            }
          } else {
            // Treat as product name candidate
            if (!line.startsWith('###') && !line.startsWith('---') && line !== catDir.toUpperCase()) {
              currentName = line;
            }
          }
        }
      }

      // Map image files to products
      const imageFiles = files.filter(f => f.match(/\.(jpeg|jpg|png|webp|svg)$/i));

      for (const img of imageFiles) {
        const ext = path.extname(img);
        const baseName = path.basename(img, ext);
        
        // Clean name for display
        const displayName = baseName
          .replace(/^\d+[\.\s]*/, '') // remove numbers
          .replace(/[_-]/g, ' ')       // replace underscores/dashes with spaces
          .trim();
        
        // Match description
        const matchKey = cleanForMatch(displayName);
        const description = descriptions[matchKey] || descriptions[cleanForMatch(baseName)] || `Premium quality ${displayName} under the ${catDir} category.`;

        // Determine packaging type and capacity default
        let packagingType = 'Package';
        let weightHoldingCapacity = 'N/A';
        let color = 'Standard';

        if (catDir.toLowerCase().includes('chemical')) {
          packagingType = 'Drum/Bottle';
          weightHoldingCapacity = '25kg';
          color = 'White/Clear';
        } else if (catDir.toLowerCase().includes('cloth')) {
          packagingType = 'Bag/Box';
          weightHoldingCapacity = 'Standard';
          color = 'Assorted';
        } else if (catDir.toLowerCase().includes('food')) {
          packagingType = 'Packet/Box';
          weightHoldingCapacity = '1kg';
          color = 'Natural';
        } else if (catDir.toLowerCase().includes('lubricant')) {
          packagingType = 'Canister/Can';
          weightHoldingCapacity = '1L/5L';
          color = 'Amber';
        } else if (catDir.toLowerCase().includes('mineral')) {
          packagingType = 'Bag';
          weightHoldingCapacity = '50kg';
          color = 'Powder/Granule';
        } else if (catDir.toLowerCase().includes('tile')) {
          packagingType = 'Crate';
          weightHoldingCapacity = 'Box of 10';
          color = 'Patterned';
        }

        // Clean category name
        const cleanCatName = catDir
          .replace(/[_-]/g, ' ')
          .toLowerCase()
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        allProducts.push({
          name: displayName,
          category: cleanCatName,
          thumbnail: `/products/${catDir}/${img}`,
          packagingType,
          color,
          weightHoldingCapacity,
          additionalInfo: [
            { key: 'Description', value: description },
            { key: 'Category Group', value: cleanCatName },
            { key: 'Quality Status', value: 'Export Premium Grade' }
          ]
        });
      }
    }

    console.log(`\nFound and parsed ${allProducts.length} products total!`);

    // Write to a3_cargo_dump.json in root
    fs.writeFileSync('a3_cargo_dump.json', JSON.stringify(allProducts, null, 2));
    console.log('Successfully wrote parsed products to a3_cargo_dump.json!');

    // Let's populate the local MongoDB test and a3_cargo databases
    const targetDbs = ['test', 'a3_cargo'];
    for (const dbName of targetDbs) {
      const db = client.db(dbName);
      const collection = db.collection('products');
      
      // Clear existing
      await collection.deleteMany({});
      console.log(`Cleared existing products in database "${dbName}".`);
      
      // Insert new
      const result = await collection.insertMany(allProducts);
      console.log(`Inserted ${result.insertedCount} products into database "${dbName}".`);
    }

    console.log('\nDatabase population complete!');

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    await client.close();
  }
}

main();
