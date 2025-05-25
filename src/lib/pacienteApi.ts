import { type PatientFormData } from "@/lib/schemas";

export async function createPaciente(data: PatientFormData) {
    const baseUrl = typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_API_URL
        : "";
    const res = await fetch(`${baseUrl}/api/pacientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    let result = null;

    try {
        result = await res.json();
        console.log(res)
    } catch {
        // resposta não é JSON → provavelmente erro 404 ou 500 com HTML
        throw new Error(`Erro HTTP ${res.status}: ${res.statusText}`);
    }

    if (!res.ok) {
        throw new Error(result?.error || "Erro ao criar paciente");
    }

    return result;
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updatePaciente(id: string, data: any) {
    const res = await fetch(`/api/pacientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deletePaciente(id: string) {
    const res = await fetch(`/api/pacientes/${id}`, { method: "DELETE" });
    return res.json();
}
