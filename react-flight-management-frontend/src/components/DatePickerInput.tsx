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
        maxDate: new Date("2030-01-01"),
        // Starting from today's date, can't select previous dates
        // because can't depart from the past
        minDate: new Date(),
        theme: {
            background: "bg-white",
            todayBtn: "",
            clearBtn: "focus:ring-2 focus:ring-sky-300",
            icons: "",
            text: "",
            disabledText: "text-gray-300",
            input: "",
            inputIcon: "",
            selected: "",
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
	// const handleChange = (selectedDate: Date) => {
	//  console.log(selectedDate)
	// }
	const handleClose = (state: boolean) => {
		setShow(state)
	}

	return (
		<div>
			<Datepicker classNames="bg-white" options={options} onChange={props.onChange} show={show} setShow={handleClose} />
		</div>
	)
}