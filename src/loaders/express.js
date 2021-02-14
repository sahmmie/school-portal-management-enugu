import bodyParser from 'body-parser';
import cors from 'cors';
//import morgan from 'morgan';
import config from '../config/index';
import routes from '../api';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Fibus Api',
            description: "Fibus Api information",
            contact: {
                name: "Sahmmie"
            },
            servers: ["http://localhost:8200"]
        }
    },
    apis: ['../api/routes/*.js']
}

export default async(app, io) => {
    app.use(cors());
    app.enable('trust proxy');
    //app.use(morgan('combine'));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // swagger documentation
    const swaggerDocs = swaggerJsDoc(swaggerOptions)
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.get('/', (req, res) => {
        res.status(202).send({
            memory_useage: process.memoryUsage(),
            up_time: process.uptime(),
            pid: process.pid,
            uid: process.getuid,
            allowedNodeENV: process.allowedNodeEnvironmentFlags
        });
    });

    app.use(config.api.prefix, routes(io));

    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
            errors: {
                message: err.message,
            },
        });
    });

    return app;
};