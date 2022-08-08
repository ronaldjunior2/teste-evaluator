import { signInSchema, signUpSchema, shortenSchema } from "../models/joiModels.js";

export default function schemaValidation (req, res, next){
    const data = res.locals.cleanData;
    console.log(data)
    let validation;
    switch (true) {
        case data.confirmPassword != undefined:
            validation = signUpSchema.validate(data, {abortEarly: false});
           
            if(validation.error) return res.status(422).send(validation.error);
            break;
        case data.url !== undefined:
            validation = shortenSchema.validate(data, {abortEarly: false});
            if(validation.error) return res.status(422).send(validation.error);
            break;
        default:
            validation = signInSchema.validate(data, {abortEarly: false});
            if(validation.error) return res.status(422).send(validation.error);
            break;
    }
    next();
}

