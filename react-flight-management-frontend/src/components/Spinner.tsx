import { Spinner } from "flowbite-react";
// import tw from "twin.macro";

export default function SpinnerComponent(){
    return (
        <Spinner
            aria-label="Large spinning spinner"
            className="fill-sky-500"
            light={true}
            size="xl"
        />
    )
}