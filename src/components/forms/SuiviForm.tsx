import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export const SuiviForm = ({ onSuccess, projectIds, stageIds }: { onSuccess: () => void, projectIds: any[], stageIds: any[] }) => {
    const [formData, setFormData] = useState({
        id_projet: "",
        id_stage: "",
        pourcentage_avancement: 0,
        description_travaux: ""
    });
    const [loading, setLoading] = useState(false);

    // Todo: Allow selecting project OR stage. Currently simplified.

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.fetch('/suivi', { method: 'POST', body: formData });
            toast.success("Avancement mis à jour !");
            onSuccess();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label>Contexte</Label>
                <select
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) => {
                        const [type, id] = e.target.value.split(':');
                        setFormData(prev => ({
                            ...prev,
                            id_projet: type === 'projet' ? id : "",
                            id_stage: type === 'stage' ? id : ""
                        }));
                    }}
                >
                    <option value="">Sélectionner un projet ou stage</option>
                    <optgroup label="Mes Projets">
                        {projectIds.map(p => (
                            <option key={`projet:${p.id}`} value={`projet:${p.id}`}>{p.titre}</option>
                        ))}
                    </optgroup>
                    <optgroup label="Mes Stages">
                        {stageIds.map(s => (
                            <option key={`stage:${s.id}`} value={`stage:${s.id}`}>{s.entreprise}</option>
                        ))}
                    </optgroup>
                </select>
            </div>

            <div className="space-y-2">
                <Label>Avancement ({formData.pourcentage_avancement}%)</Label>
                <Slider
                    defaultValue={[0]}
                    max={100}
                    step={5}
                    onValueChange={(val) => setFormData(prev => ({ ...prev, pourcentage_avancement: val[0] }))}
                />
            </div>

            <div className="space-y-2">
                <Label>Description des tâches effectuées</Label>
                <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    name="description_travaux"
                    value={formData.description_travaux}
                    onChange={handleChange}
                    required
                    placeholder="Décrivez ce que vous avez fait cette semaine..."
                />
            </div>

            <Button type="submit" disabled={loading}>{loading ? 'Envoi...' : 'Enregistrer'}</Button>
        </form>
    );
};
