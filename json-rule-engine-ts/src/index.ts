import { Engine } from 'json-rules-engine';

async function main() {
  const engine = new Engine();

  // Define a rule
  const rule = {
    conditions: {
      all: [
        {
          fact: 'temperature',
          operator: 'greaterThan',
          value: 100
        }
      ]
    },
    event: {
      type: 'temperature-alert',
      params: {
        message: 'Temperature is too high!'
      }
    }
  };

  // Add the rule to the engine
  engine.addRule(rule);

  // Define facts
  const facts = {
    temperature: 110
  };

  // Run the engine
  const results = await engine.run(facts);

  // Check for events
  if (results.events.length > 0) {
    const event = results.events[0];
    console.log('Alert:', event.params?.message || 'No message');
  } else {
    console.log('No alerts');
  }
}

main().catch(console.error);