import { AlertData } from "@/sanity/lib/types";
import { Alert as AlertComponent } from "@/components/alert";

export function Alert({ value }: { value: AlertData }) {
    if (!value) return null;
    return <AlertComponent {...value} />
}
