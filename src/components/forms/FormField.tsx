import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    required?: boolean;
    isTextArea?: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
}

export const FormField = ({
    label, name, type = "text", value, onChange, required, isTextArea, placeholder, options
}: FormFieldProps) => (
    <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        {isTextArea ? (
            <Textarea id={name} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} />
        ) : options ? (
            <select
                id={name} name={name} value={value} onChange={onChange} required={required}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        ) : (
            <Input id={name} name={name} type={type} value={value} onChange={onChange} required={required} placeholder={placeholder} />
        )}
    </div>
);
