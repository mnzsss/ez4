import type { StreamAnyChange, Database } from '@ez4/database';
import type { Environment, Service } from '@ez4/common';
import type { TestEngine } from '../common/engines';

export declare class TestDatabase extends Database.Service<TestEngine> {
  tables: [
    Database.UseTable<{
      name: 'testTable';
      schema: TestSchema;
      indexes: {};
      stream: {
        handler: typeof streamHandler;
      };
    }>
  ];

  variables: {
    TEST_VAR1: 'test-literal-value';
    TEST_VAR2: Environment.Variable<'TEST_ENV_VAR'>;
  };

  services: {
    selfVariables: Environment.ServiceVariables;
  };
}

declare class TestSchema implements Database.Schema {
  foo: string;
}

function streamHandler(_change: StreamAnyChange<TestSchema>, context: Service.Context<TestDatabase>) {
  const { selfVariables } = context;

  // Ensure variables are property referenced.
  selfVariables.TEST_VAR1;
  selfVariables.TEST_VAR2;
}
