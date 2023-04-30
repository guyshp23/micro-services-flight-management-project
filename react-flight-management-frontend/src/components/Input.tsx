import { ErrorMessage, useField } from "formik";

export const Input = ({ name, label, ...props }: any) => {
    const [field, meta] = useField(name);
    return (
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium" htmlFor={field.name}>
          {label}
        </label>
        <input
          className={`${
            meta.error && meta.touched ? "border-red-400" : ""
          } shadow appearance-none border-2 border-gray-100 focus:ring-2 focus:ring-sky-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          {...field}
          {...props}
        />
        <ErrorMessage
          name={field.name}
          component="div"
          className="text-red-500 text-xs"
        />
      </div>
    );
};
