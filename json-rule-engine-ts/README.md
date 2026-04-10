# JSON Rule Engine TypeScript Project

This is a TypeScript project that demonstrates the use of a JSON rule engine using the `json-rules-engine` library, with an Express server providing a coupon validation endpoint.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. For development (with ts-node):
   ```bash
   npm run dev
   ```

## API Endpoint

### POST /validate-coupon

Validates a coupon code based on rules defined in the engine.

**Request Body:**
```json
{
  "couponCode": "SAVE10",
  "facts": {
    "amount": 150
  }
}
```

**Response:**
```json
{
  "valid": true,
  "events": [
    {
      "type": "coupon-applied",
      "params": {
        "discount": 10,
        "message": "10% discount applied!"
      }
    }
  ]
}
```

**Example Usage:**
```bash
curl -X POST http://localhost:3000/validate-coupon \
  -H "Content-Type: application/json" \
  -d '{"couponCode":"SAVE10","facts":{"amount":150}}'
```

## Description

The project includes a rule that applies a 10% discount if the coupon code is 'SAVE10' and the order amount is greater than 100.

You can extend this by adding more rules, conditions, and facts as needed.