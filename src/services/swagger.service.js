import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load(path.resolve('./swagger.yaml'));

const swaggerConnection = app => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default swaggerConnection;
