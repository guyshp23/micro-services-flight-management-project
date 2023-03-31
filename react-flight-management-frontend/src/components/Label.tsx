interface LabelProps {
    children: React.ReactNode;
    className?: string;
}

export function Label({ children, className }: LabelProps) {
    return (
        <label className={'first-letter:uppercase text-md text-left text-gray-700 font-medium' || className}>
            {children}
        </label>
    )
}