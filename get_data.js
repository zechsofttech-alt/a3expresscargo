const { MongoClient } = require('mongodb');
const fs = require('fs');

async function main() {
  const uri = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB!');
    
    const adminDb = client.db().admin();
    const dbsList = await adminDb.listDatabases();
    
    const allImageData = {};

    for (const dbInfo of dbsList.databases) {
      const dbName = dbInfo.name;
      if (['admin', 'config', 'local'].includes(dbName)) continue;
      
      const db = client.db(dbName);
      const collections = await db.listCollections().toArray();
      
      for (const col of collections) {
        const documents = await db.collection(col.name).find({}).toArray();
        if (documents.length === 0) continue;
        
        // Let's check if any document in the collection contains any image field
        // We will inspect all fields of the first document to find image keys
        // or recursively scan the documents.
        let hasImage = false;
        
        const checkObjectForImages = (obj) => {
          if (!obj) return false;
          if (typeof obj === 'string') {
            return obj.startsWith('http') && (
              obj.match(/\.(jpeg|jpg|gif|png|webp|svg)/i) || 
              obj.includes('unsplash.com') || 
              obj.includes('public.blob.vercel-storage.com') ||
              obj.includes('bing.net')
            );
          }
          if (Array.isArray(obj)) {
            return obj.some(item => checkObjectForImages(item));
          }
          if (typeof obj === 'object') {
            return Object.values(obj).some(val => checkObjectForImages(val));
          }
          return false;
        };

        for (const doc of documents) {
          if (checkObjectForImages(doc)) {
            hasImage = true;
            break;
          }
        }
        
        if (hasImage) {
          if (!allImageData[dbName]) {
            allImageData[dbName] = {};
          }
          allImageData[dbName][col.name] = documents;
        }
      }
    }

    fs.writeFileSync('all_image_data_dump.json', JSON.stringify(allImageData, null, 2));
    console.log('Successfully wrote image databases dump to all_image_data_dump.json!');
    console.log('Keys of exported databases:', Object.keys(allImageData));
    for (const dbName of Object.keys(allImageData)) {
      console.log(`- Database: ${dbName} | Collections:`, Object.keys(allImageData[dbName]));
    }
  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    await client.close();
  }
}

main();
