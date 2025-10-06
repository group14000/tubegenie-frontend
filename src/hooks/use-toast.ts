import { toast as sonnerToast } from 'sonner';
import * as React from "react";

type Toast = {
    title?: React.ReactNode;
    description?: React.ReactNode;
    variant?: 'default' | 'destructive';
};

function toast({ title, description, variant = 'default' }: Toast) {
    const message = title ? `${title}${description ? `\n${description}` : ''}` : description || '';

    if (variant === 'destructive') {
        sonnerToast.error(message);
    } else {
        sonnerToast(message);
    }
}

function useToast() {
    return {
        toast,
        dismiss: () => { }, // Sonner handles dismissal internally
        toasts: [], // No toasts array needed with Sonner
    };
}

export { useToast, toast };
