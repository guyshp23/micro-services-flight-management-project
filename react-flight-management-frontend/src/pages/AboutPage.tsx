
export default function AboutPage(){
    return (
        <div className="flex justify-center items-start">
                <div className="flex flex-col min-w-[55rem] max-w-6xl h-full my-12 p-16 shadow-md text-left text-gray-700 bg-white border border-gray-200 rounded-md">
                    <section className="text-lg">
                        <h2 className="text-2xl text-gray-800 font-medium underline">Introduction</h2>
                        <p>
                            AeroThree is a “One Stop Shop” Tourism app.
                            <br/>
                            The app is <span className="underline decoration-wavy decoration-sky-300">intended to be a full tourism portal</span> in order to serve all of a person's needs when visiting another country.
                            <br/>
                            Right now the only section that is working is the “Flights” section but in the future, the app can also be used to find related services such as Hotels, Car Rentals, etc. due to <span className="underline decoration-wavy decoration-sky-300">its micro-services architecture which allows the app to scale and expand quickly</span>.
                        </p>
                    </section>

                    <section className="mt-8 text-lg">
                        <h2 className="text-2xl text-gray-800 font-medium underline">Workflow schema</h2>
                        <img
                            className="mb-4"
                            src={`${window.location.origin}/workflow_ill.jpg`}
                            alt='workflow scheme'
                        />
                        <p>The Idea behind the app is <span className="underline decoration-wavy decoration-sky-300">the ability to expand the app as the business grows</span>, therefore the app is built using the Micro-Services Architecture to accommodate every future direction the business will decide to approach.</p>
                    </section>

                    <section className="mt-8 text-lg">
                        <h2 className="text-2xl text-gray-800 font-medium underline">Technology and usage</h2>
                        <ul>
                            <li className="text-xl mt-6 font-medium text-gray-800">Django</li>
                            <p className="pl-6">
                                This Framework together with Django REST API is used as the main backend platform.
                                <br/>
                                Django is mainly used for orchestrating the connections of all the working parts of the app and mainly responsible to manage users and credentials.
                                <br/>
                                As the main backend framework for the system, all of the requests are routed through the Django “urls” file.
                                <br/>
                                Each request is being forwarded to the “view” that is split to different files according to entities.
                                <br/>
                                The View files are in charge to call the corresponding service files and return the data as REST API calls.
                            </p>
                            <li className="text-xl mt-6 font-medium text-gray-800">FastAPI</li>
                            <p className="pl-6">
                                For Micro Service that is intended to receive and send requests, FastAPI is ideal since it is fast and lightweight and doesn't require many lines of code in order to get the job done.
                                <br/>
                                This framework allows us to contain all of the business logic needed for the different current and future sections of the app in one place.
                                <br/>
                                Since it is focused on REST API calls it is very easy to forward the requests to any cloud based API and receive more data that later can be processed easily and be stored in the DB and sent back to the Django for further use.
                                <br/>
                                By using the ………/docs url it is possible to examine all of the available API Calls
                                <br/>
                                In the future, each business section is supposed to be in a closed Micro Service, The Micro Service purpose is to receive API requests and call different cloud services.
                                <br/>
                                Once the Data is received from different sources, the Micro Service will receive and process the data according to the business logic needed by the app, and return the right response back to the Main Django app.
                            </p>

                            <li className="text-xl mt-6 font-medium text-gray-800">React</li>
                            <p className="pl-6">
                                Used as the Main Frontend technology <span className="bg-red-100 text-red-500 font-medium px-2 p-1 rounded">EXPAND THIS SECTION!</span>
                            </p>

                            <li className="text-xl mt-6 font-medium text-gray-800">MySQL</li>
                            <p className="pl-6">
                                As the main DB of the system, each section of the app has a connection to the DB. 
                                <br/>
                                As the business grows more connections for the DB can be added as needed and also since the DB is separated from the main Frameworks it can be used with a load balancer and or redundant mirror connections. 
                                <br/>
                                The DB for this projects sits on a separate server and all other parts of the system are connected to it. 
                                <br/>
                                The DB can also be accessed using "PHPMyAdmin" (PMA) interface.
                            </p>

                            <li className="text-xl mt-6 font-medium text-gray-800">Nginx</li>
                            <p className="pl-6">
                                Nginx is used as the main web server for the system.
                                <br/>
                                It is used to route the requests to the correct server and also to serve the static files.
                                <br/>
                                And as a reverse proxy for the Django app and the FastAPI app.
                                <br/>
                            </p>

                            <li className="text-xl mt-6 font-medium text-gray-800">How to use the system</li>
                            <p className="pl-6">
                                A short description perhaps? A couple of images for good faith?

                                <h3 className="text-lg font-medium mt-4 text-gray-800">Modules and features</h3>
                                <p className="pl-6">...</p>

                                <h3 className="text-lg font-medium mt-4 text-gray-800">Main controls, buttons, and pages</h3>
                                <p className="pl-6">...</p>
                            </p>
                        </ul>
                    </section>
                </div>
        </div>
    )
}