"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_rules_engine_1 = require("json-rules-engine");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const engine = new json_rules_engine_1.Engine();
// Define a coupon validation rule
const couponRule = {
    conditions: {
        all: [
            {
                fact: 'couponCode',
                operator: 'equal',
                value: 'SAVE10'
            },
            {
                fact: 'amount',
                operator: 'greaterThan',
                value: 100
            }
        ]
    },
    event: {
        type: 'coupon-applied',
        params: {
            discount: 10,
            message: '10% discount applied!'
        }
    }
};
// Add the rule to the engine
engine.addRule(couponRule);
// Endpoint to validate coupon
app.post('/validate-coupon', async (req, res) => {
    try {
        const { couponCode, facts } = req.body;
        const allFacts = { ...facts, couponCode };
        const results = await engine.run(allFacts);
        res.json({
            valid: results.events.length > 0,
            events: results.events.map(event => ({
                type: event.type,
                params: event.params
            }))
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
