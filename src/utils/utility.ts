import slugify from 'slugify';

export class Util {

    static evaluateExistValue(value: any): boolean {
        return value !== null && value !== undefined;
    }

    static createSlug(title: string): string {
        const options = {
            replacement: '-', // Reemplaza espacios en blanco con guiones
            remove: /[*+~.()'"!:@]/g, // Elimina caracteres especiales
            lower: true, // Convierte todo a minúsculas
        };

        return slugify(title, options);
    }


}