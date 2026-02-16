#!/bin/zsh
# Script to delete and recreate the "documents" collection in Qdrant
# Usage: ./reset-qdrant-vector-store.sh [HOST] [API_KEY]
# Examples:
#   ./reset-qdrant-vector-store.sh
#   ./reset-qdrant-vector-store.sh "https://your-qdrant-host.com:6333"
#   ./reset-qdrant-vector-store.sh "https://your-qdrant-host.com:6333" "your-api-key"

# Optional HOST (if provided as first argument, default is localhost:6333)
QDRANT_HOST="${1:-http://localhost:6333}"

# Optional API Key (if provided as second argument)
API_KEY="${2:-}"

# Prepare headers
if [[ -n "$API_KEY" ]]; then
  AUTH_HEADER=(-H "api-key: $API_KEY")
else
  AUTH_HEADER=()
fi

echo "Resetting Qdrant 'documents' collection on $QDRANT_HOST..."

# Delete the collection if it exists
echo "Deleting 'documents' collection..."
curl -X DELETE "$QDRANT_HOST/collections/documents" \
  "${AUTH_HEADER[@]}"

# Create the collection
echo "Creating new 'documents' collection..."
curl -X PUT "$QDRANT_HOST/collections/documents" \
  "${AUTH_HEADER[@]}" \
  -H 'Content-Type: application/json' \
  -d '{
    "vectors": {
      "size": 768,
      "distance": "Cosine"
    }
  }'

echo "Reset complete!"