import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CircleFlag } from 'react-circle-flags';


interface Props {
  valuesArray?: any;
  value? : any;
  onSelect? :any;
}


export function ComboBoxInput({valuesArray, value, onSelect}: Props) {
  const [filteredValue, setFilteredValue] = useState(valuesArray)
  const [currentValue, setCurrentValue] = useState('')
  const [openOptions, setOpenOptions] = useState(false);


    const onChangeFilterValues = (e: any) => {
      // console.log('e=',e.target.value)
      setFilteredValue(valuesArray.filter((val: any) => {
        setCurrentValue(e.target.value)
        return val.display_string.toLowerCase().includes(e.target.value.toLowerCase())
      }))
    }

  return (
    <Combobox
      onChange={(e: any)  => {onSelect(e); setCurrentValue(e)}}
      >
      <div onFocus={() => setOpenOptions(true)}  onBlur={() => setTimeout(() => setOpenOptions(false), 100)}>
      <Combobox.Input 
        onClick={() => {currentValue === '' && setCurrentValue(' ')}}
        value={currentValue}
        onChange={(e) => onChangeFilterValues(e)}
        className='border-2 hover:border-sky-200 border-gray-200 p-2 rounded-md'
      />
      <Combobox.Options
        static={openOptions}
        className={'bg-white shadow-md rounded-md'}
        >
        {filteredValue.map((val: any) => (
          <Combobox.Option 
            className={'relative py-[.9rem] cursor-pointer last:border-b-0 border-b text-gray-600 border-gray-200 hover:bg-gray-100'} 
            key={val.country_code}
            value={val.display_string}
          >
            <span className='flex justify-center my-[.9rem] items-center text-center'>
              <CircleFlag 
                className='absolute rounded-full border-2 border-gray-200 left-4 top-[1.4rem] h-10'
                countryCode={val.country_code}
                height="35"
              />
              <p className='ml-4 text-sm'>{val.display_string}</p>
            </span>
          </Combobox.Option>
        ))}
      </Combobox.Options>
      </div>
    </Combobox>
  )
}
