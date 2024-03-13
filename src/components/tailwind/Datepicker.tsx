import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

export default function DatePicker({
    name,
    value,
    onChange,
    label,
    addClass,
    placeholder = 'DD/MM/YYY',
}: {
    name: string;
    value: any;
    onChange: any;
    label?: string;
    addClass?: string;
    placeholder?: string;
}) {
    return (
        <div className='flex flex-col group  relative w-full'>
            {label && <label className='-mt-3 text-xs left-3 top-1 z-30 absolute group-hover:text-blue-400 bg-gray-800 w-fit px-1 text-white' htmlFor={name}>{label}</label>}
            <Flatpickr name={name} placeholder={placeholder} value={value} options={{ dateFormat: 'd-m-Y', position: 'auto left' }} onChange={onChange} className={`form-input bg-gray-800 border-2 border-black/10 px-3 focus:border-blue-500 rounded h-10 ${addClass}`} />
        </div>
    );
}
