export interface AuthStrategy {
    validate(code : string ) : Promise <any>;
}