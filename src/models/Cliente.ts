import supabase from "../config/supabase.js";

async function findAll() {
    const { data, error } = await supabase.from("clientes").select("*");
    if (error) throw error;
    return data;
}

async function findById(id: string) {
    const { data, error } = await supabase.from("clientes").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
}

async function create(cliente: Record<string, unknown>) {
    const { data, error } = await supabase.from("clientes").insert(cliente).select().single();
    if (error) throw error;
    return data;
}

async function update(id: string, cliente: Record<string, unknown>) {
    const { data, error } = await supabase.from("clientes").update(cliente).eq("id", id).select().single();
    if (error) throw error;
    return data;
}

async function remove(id: string) {
    const { data, error } = await supabase.from("clientes").delete().eq("id", id).select().single();
    if (error) throw error;
    return data;
}

export default { findAll, findById, create, update, remove };
