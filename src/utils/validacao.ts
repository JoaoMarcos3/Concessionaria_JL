const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isUuid(valor: unknown): valor is string {
    return typeof valor === "string" && UUID_REGEX.test(valor);
}

function isTextoOpcional(valor: unknown): boolean {
    return valor === undefined || valor === null || typeof valor === "string";
}

function isBooleanOpcional(valor: unknown): boolean {
    return valor === undefined || typeof valor === "boolean";
}

function isErroChaveEstrangeira(error: any): boolean {
    return error?.code === "23503";
}

export default { isUuid, isTextoOpcional, isBooleanOpcional, isErroChaveEstrangeira };
