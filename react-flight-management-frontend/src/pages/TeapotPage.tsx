import { useEffect } from 'react';
import '../teapot.css';


export default function TeapotPage(){

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.gstatic.com/teapot/teapot.min.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
        }
      }, []);

    return (
        <div className='container relative px-24 py-6 my-48'>
            <title>Error 418 (I'm a teapot)!?</title>
            <p className='text-3xl font-extrabold text-gray-700'><b>418.</b>{' '}<ins className='font-medium no-underline'>I'm a teapot.</ins></p>
            <p className='mt-2 text-lg text-gray-600'>The requested entity body is short and stout. <ins className='font-medium no-underline'>Tip me over and pour me out.</ins></p>
            <div id="teaset">
                <div id="teabot"></div>
                <div id="teacup"></div>
            </div>
        </div>
    )
}