import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { SPECIALITES } from "@/lib/constants";

export const StageForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const [formData, setFormData] = useState({
        entreprise: "",
        ville: "",
        duree: "",
        description: "",
        domaine: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.fetch('/stages', { method: 'POST', body: formData });
            toast.success("Stage ajouté avec succès !");
            onSuccess();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Entreprise" name="entreprise" value={formData.entreprise} onChange={handleChange} required />

            <FormField
                label="Spécialité"
                name="domaine"
                value={formData.domaine}
                onChange={handleChange}
                type="select"
                options={[{ value: "", label: "Sélectionner une spécialité" }, ...SPECIALITES]}
                required
            />

            <FormField label="Ville" name="ville" value={formData.ville} onChange={handleChange} required />
            <FormField label="Durée" name="duree" value={formData.duree} onChange={handleChange} required placeholder="ex: 3 mois" />
            <FormField label="Description du poste" name="description" value={formData.description} onChange={handleChange} isTextArea placeholder="Description, technologies..." />

            <Button type="submit" disabled={loading}>{loading ? 'Ajout...' : 'Ajouter le stage'}</Button>
        </form>
    );
};
