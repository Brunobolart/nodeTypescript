import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { object, SchemaOf, ValidationError } from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T>(schema: SchemaOf<T>) => SchemaOf<T>;

type TAllSchemas = Record<TProperty, SchemaOf<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchema: TGetAllSchemas) => RequestHandler;

export const Validation: TValidation = (getAllSchema) => async (req, res, next) => {

    const schemas = getAllSchema(schema => schema);
    
    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {

        try {
            schema.validateSync(req[key as TProperty], { abortEarly: false });

        } catch (error) {
            const yupError = error as ValidationError;
            const validationErrors: Record<string, string> = {};

            yupError.inner.forEach(error => {
                if (error.path === undefined) return;
                validationErrors[error.path] = error.message

            });

            errorsResult[key] = validationErrors;

        }
    });

    if (Object.entries(errorsResult).length === 0) {
        return next();
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorsResult,
        });
    }


};