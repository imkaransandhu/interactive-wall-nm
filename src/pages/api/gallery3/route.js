const { BlobServiceClient } = require("@azure/storage-blob");
export default async function get(request, res) {
  const accountName = process.env.ACCOUNT_NAME;
  const key = process.env.AZURE_BLOB_KEY;
  const connStr = `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${key};EndpointSuffix=core.windows.net`;
  const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
  const containerName = "gallery";
  const containerClient = blobServiceClient.getContainerClient(containerName);
  let blobs = containerClient.listBlobsFlat();
  const array = [];
  for await (const blob of blobs) {
    // console.log(`Blob ${i++}: ${JSON.stringify(blob)}`);    // Get a blob client
    const blobClient = containerClient.getBlobClient(blob.name);
    // Get the URL for the blob
    const blobUrl = blobClient.url;
    console.log(`Blob URL: ${blobUrl}`);
    array.push({ url: blobUrl });
  }
  console.log(array);
  res.send(array);
}
