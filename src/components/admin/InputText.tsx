import TextareaAutosize from "react-textarea-autosize";

export default function InputText({label, name, className, defaultValue = "", rows}
    : {label: string, name: string, className?: string, defaultValue? : string, rows?: number,}) {
    return (
        <div className={className}>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-primary"
            >
                {label}
            </label>

            {rows ? (
                <TextareaAutosize
                    id={name}
                    name={name}
                    rows={rows}
                    defaultValue={defaultValue}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    defaultValue={defaultValue}
                    type="text"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                />
            )}
        </div>
    );
}