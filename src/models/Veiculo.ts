import supabase from "../config/supabase.js";

type Filtros = { marca_id?: string; disponivel?: boolean; busca?: string; ordenar?: string };

async function findAll(filtros: Filtros = {}) {
    let query = supabase.from("veiculos").select("*, marcas(id, nome)");
    if (filtros.marca_id) query = query.eq("marca_id", filtros.marca_id);
    if (filtros.disponivel !== undefined) query = query.eq("disponivel", filtros.disponivel);
    if (filtros.busca) query = query.ilike("modelo", `%${filtros.busca}%`);
    if (filtros.ordenar === "preco_asc") query = query.order("preco", { ascending: true });
    if (filtros.ordenar === "preco_desc") query = query.order("preco", { ascending: false });
    const { data, error } = await query;
    if (error) throw error;
    return data;
}

async function findById(id: string) {
    const { data, error } = await supabase.from("veiculos").select("*, marcas(id, nome)").eq("id", id).single();
    if (error) throw error;
    return data;
}

async function create(veiculo: Record<string, unknown>) {
    const { data, error } = await supabase.from("veiculos").insert(veiculo).select().single();
    if (error) throw error;
    return data;
}

async function update(id: string, veiculo: Record<string, unknown>) {
    const { data, error } = await supabase.from("veiculos").update(veiculo).eq("id", id).select().single();
    if (error) throw error;
    return data;
}

async function remove(id: string) {
    const { data, error } = await supabase.from("veiculos").delete().eq("id", id).select().single();
    if (error) throw error;
    return data;
}

export default { findAll, findById, create, update, remove };
