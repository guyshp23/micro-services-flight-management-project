import React from 'react'

interface ErrorProps {
    title:   string;
    message: string;
    type:    'notFound' | 'general';
}

interface ScreenBlockProps {
    title:   string;
    image?:  React.ReactElement;
    message: string;
}

export default function ScreenBlock({title, image, message}: ScreenBlockProps) {
    return (
        <div className="flex flex-col items-center justify-center min-w-[55rem] h-full my-12 p-16 shadow-md text-center text-gray-600 bg-white border border-gray-200 rounded-md">
            {image || null}
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base">{message}</p>
        </div>
    )
}


export function Error({title, message, type}: ErrorProps) {

    function DecideImgBasedOnType(type: string): JSX.Element {
        switch (type) {
            case 'notFound':
                return <img alt="2 Empty Notepads"
                            className="h-60 mb-8"
                            src="http://localhost:3000/undraw_no_data.svg"
                        />

            case 'general':
                return <img alt="2 Empty Notepads"
                            className="h-60 mb-8"
                            src="http://localhost:3000/undraw_no_data.svg"
                        />

            default:
                return <img alt="2 Empty Notepads"
                            className="h-60 mb-8"
                            src="http://localhost:3000/undraw_no_data.svg"
                        />
        }
    }

  return (
        <ScreenBlock title={title} message={message} image={DecideImgBasedOnType(type)} />
  )
}
