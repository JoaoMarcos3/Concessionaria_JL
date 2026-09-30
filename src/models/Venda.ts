import supabase from "../config/supabase.js";

async function findAll() {
    const { data, error } = await supabase.from("vendas").select("*, veiculos(id, modelo), clientes(id, nome)");
    if (error) throw error;
    return data;
}

async function findById(id: string) {
    const { data, error } = await supabase.from("vendas").select("*, veiculos(id, modelo), clientes(id, nome)").eq("id", id).single();
    if (error) throw error;
    return data;
}

async function create(venda: Record<string, unknown>) {
    const { data, error } = await supabase.from("vendas").insert(venda).select().single();
    if (error) throw error;
    return data;
}

async function update(id: string, venda: Record<string, unknown>) {
    const { data, error } = await supabase.from("vendas").update(venda).eq("id", id).select().single();
    if (error) throw error;
    return data;
}

async function remove(id: string) {
    const { data, error } = await supabase.from("vendas").delete().eq("id", id).select().single();
    if (error) throw error;
    return data;
}

export default { findAll, findById, create, update, remove };
