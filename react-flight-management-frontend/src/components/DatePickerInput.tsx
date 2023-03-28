import { useState } from "react"
import Datepicker from "tailwind-datepicker-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // regular, brands, icon

interface Props{
    title?: string,
    // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChange: any
}

export const DatePickerInput = ({...props}: Props) => {
    const options = {
        title: props.title || "Select a date",
        autoHide: true,
        todayBtn: true,
        clearBtn: true,
        // 30 days from today
        maxDate: new Date(new Date().getTime()+(30*24*60*60*1000)), 
        // Starting from today's date, can't select previous dates
        // because can't depart from the past
        minDate: new Date(new Date().getTime()+(-1*24*60*60*1000)), 
        theme: {
            background: "bg-white",
            todayBtn: "bg-sky-400 hover:bg-sky-500 hover:shadow-md focus:ring-4 focus:ring-sky-200",
            clearBtn: "focus:ring-4 focus:ring-sky-200",
            icons: "",
            text: "text-gray-500",
            disabledText: "text-gray-300",
            input: "focus:ring-0",
            inputIcon: "",
            selected: "bg-sky-500 hover:bg-sky-600 hover:shadow-md",
        },
        icons: {
            // () => ReactNode | JSX.Element
            prev: () => <FontAwesomeIcon icon={solid('left-long')} />,
            next: () => <FontAwesomeIcon icon={solid('right-long')} />,
        },
        datepickerClassNames: "top-12",
        defaultDate: new Date(),
        language: "en",
    }

    const [show, setShow] = useState <boolean>(false)
	const handleClose = (state: boolean) => {
		setShow(state)
	}

	return (
		<div>
			<Datepicker classNames="bg-white" options={options} onChange={props.onChange} show={show} setShow={handleClose} />
		</div>
	)
}