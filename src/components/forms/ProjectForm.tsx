import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { SPECIALITES } from "@/lib/constants";

export const ProjectForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const [formData, setFormData] = useState({
        titre: "",
        description: "",
        filiere: "",
        annee: new Date().getFullYear().toString(),
        etat: "en_cours"
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
            await api.fetch('/projets', { method: 'POST', body: formData });
            toast.success("Projet créé avec succès !");
            onSuccess();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Titre du projet" name="titre" value={formData.titre} onChange={handleChange} required />
            <FormField label="Description" name="description" value={formData.description} onChange={handleChange} required isTextArea />

            <FormField
                label="Année"
                name="annee"
                type="number"
                value={formData.annee}
                onChange={handleChange}
                required
            />

            <FormField
                label="Spécialité"
                name="filiere"
                value={formData.filiere}
                onChange={handleChange}
                type="select"
                options={[{ value: "", label: "Sélectionner une spécialité" }, ...SPECIALITES]}
                required
            />

            <Button type="submit" disabled={loading}>{loading ? 'Création...' : 'Créer le projet'}</Button>
        </form>
    );
};
