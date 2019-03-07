// Create a Stitch Application, choose Functions and create a new public Function called "getEmbeddingUrl".
// Then paste in the following code, replacing the placeholders with appropriate values for you Charts instance.

exports = function(chartId) {

    // Remember, in a real application, you should ensure your user is authenticated and authorized to view the chart before you return the signed URL.
    
    // Replace these constants with the correct values for your Charts instance
    const CHARTS_EMBEDDING_BASE_URL = '~REPLACE-CHARTS_EMBEDDING_BASE_URL'; // Replace with the base URL to your Charts instance, e.g. https://charts.mongodb.com/charts-foo-abcde
    const CHARTS_TENANT_ID = '~REPLACE~CHARTS_TENANT_ID'; // Replace with your Charts Tenant ID from the Embed Chart snippet 
    const EMBEDDING_SIGNING_KEY = '~REPLACE~EMBEDDING_SIGNING_KEY'; // Replace with the Embedding Signing Key generated by your Charts admin
    const EXPIRY_TIME_SECONDS = 300; // Set to your preferred expiry period 
    
    const timestamp = Math.floor(Date.now() / 1000);
    const payload = `id=${chartId}&tenant=${CHARTS_TENANT_ID}&timestamp=${timestamp}&expires-in=${EXPIRY_TIME_SECONDS}`;
  
    const signature = utils.crypto.hmac(payload, EMBEDDING_SIGNING_KEY, 'sha256', 'hex');
  
    return `${CHARTS_EMBEDDING_BASE_URL}/embed/charts?${payload}&signature=${signature}`; 
  };