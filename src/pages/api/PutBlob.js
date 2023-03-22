const { BlobServiceClient } = require("@azure/storage-blob");

export default async function updateblob(req, res) {
  // Create a BlobServiceClient object using your connection string
  const connectionString = `https://interactivewallgallery.blob.core.windows.net/`;
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);

  // Create a container client
  const containerName = "YOUR_CONTAINER_NAME";
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Set up the blob options
  const blobName = "YOUR_BLOB_NAME";
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const blobOptions = {
    blobHTTPHeaders: { blobContentType: "YOUR_CONTENT_TYPE" },
  };

  // Upload the blob data
  const data = "YOUR_DATA";
  const uploadBlobResponse = await blockBlobClient.upload(
    data,
    data.length,
    blobOptions
  );
  console.log(`Upload block blob ${blobName} successfully`);

  res.send("Done");
}
