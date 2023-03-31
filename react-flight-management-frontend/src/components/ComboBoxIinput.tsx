import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CircleFlag } from 'react-circle-flags';


interface Props {
  valuesArray?: any;
  value? : any;
  keydown? :any;
  onSelect? :any;
  onChangeFilterValues: any;
}


export function ComboBoxInput({valuesArray, value, onSelect, onChangeFilterValues}: Props) {
  const [openOptions,   setOpenOptions]   = useState(false);


  return (
    <Combobox
      onChange={(e: any) => {onSelect(e)}}
      >
      <div onFocus={() => setOpenOptions(true)}  
           onBlur={()  => setTimeout(() => setOpenOptions(false), 100)}
      >
      <Combobox.Input
        value={value}
        onChange={e => onChangeFilterValues(e)}
        className='focus:hover:border-0 focus:border-0 focus:ring-4 focus:ring-sky-200 hover:border-sky-200 border-gray-200 p-2 rounded-md'
      />
      <Combobox.Options
        static={openOptions}
        className={'bg-white shadow-md rounded-md'}
        >
        {valuesArray && valuesArray.length > 0 && valuesArray.map((val: any) => (
          <Combobox.Option 
            className={'relative py-[.9rem] cursor-pointer last:border-b-0 border-b text-gray-600 border-gray-200 hover:bg-gray-100'} 
            key={val.country_code}
            value={val.display_name}
          >
            <span className='flex justify-center my-[.9rem] items-center text-center'>
              <CircleFlag 
                className='absolute rounded-full border-2 border-gray-200 left-4 top-[1.4rem] h-10'
                countryCode={val.country_code}
                height="35"
              />
              <p className='ml-4 text-sm'>{val.display_name}</p>
            </span>
          </Combobox.Option>
        ))}
      </Combobox.Options>
      </div>
    </Combobox>
  )
}
