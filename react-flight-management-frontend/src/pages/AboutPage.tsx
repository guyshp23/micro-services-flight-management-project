
export default function AboutPage(){
    return (
                <div class=WordSection1>

                <p class=MsoNormal align=center style='text-align:center'><u><span
                style='font-size:14.0pt;line-height:107%;font-family:"Arial",sans-serif'>Aero
                Three – Python Project</span></u></p>

                <p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
                "Arial",sans-serif'>Aero Three is a comprehensive tourism app designed to be a
                one-stop shop for all your travel needs. While currently only the
                &quot;Flights&quot; section is available, the app is intended to include
                additional features in the future, such as finding hotels, car rentals, and
                more.</span></p>

                <p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
                "Arial",sans-serif'>&nbsp;</span></p>

                <p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
                "Arial",sans-serif'>To ensure that the app can accommodate any future
                directions the business may take, it has been built using Micro Services
                Architecture. This allows us to expand the app as needed, while keeping each section
                self-contained and manageable.<u><br>
                <br>
                App Workflow schema:</u></span></p>

                <p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
                "Arial",sans-serif'><img width=624 height=397 id="תמונה 2"
                src="AeroThree_Rev_0.3_files/image001.jpg"></span></p>

                <p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
                "Arial",sans-serif'>&nbsp;</span></p>

                <p class=MsoNormal><u><span style='font-size:12.0pt;line-height:107%;
                font-family:"Arial",sans-serif'>Technology and usage:</span></u></p>

                <p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
                "Arial",sans-serif'>The app's main backend platform is built on the Django
                Framework, along with Django REST API. Django is responsible for orchestrating
                the connections of all the different parts of the app and managing user
                credentials. All requests are routed through the Django &quot;url&quot; file,
                and each request is forwarded to the corresponding &quot;view&quot; file, which
                is split into different files based on entities. The view files call the
                corresponding service files and return the data as REST API calls.</span></p>

                <p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
                "Arial",sans-serif'>&nbsp;</span></p>

                <p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
                "Arial",sans-serif'>For micro services that receive and send requests, we use
                Fast API. This lightweight and fast framework contains all of the business
                logic needed for the different sections of the app, both current and future.
                Since it is focused on REST API calls, it's easy to forward requests to
                cloud-based APIs and process the received data for storage in the database. The
                available API calls can be examined by navigating to the &quot;/docs&quot; URL.</span></p>

                <p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
                "Arial",sans-serif'>&nbsp;</span></p>

                <p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
                "Arial",sans-serif'>In the future, each business section will be a closed micro
                service. The micro service will receive API requests and call different cloud
                services to retrieve the necessary data. Once the data is received, the micro
                service will process it according to the app's business logic and return the
                appropriate response to the main Django app.</span></p>

                <p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
                "Arial",sans-serif'>&nbsp;</span></p>

                <p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
                "Arial",sans-serif'>Our main database is MySQL, which is connected to each
                section of the app. As the business grows, we can add more connections to the
                database as needed. Since the database is separated from the main frameworks,
                it can be used with a load balancer and redundant mirror connections. The
                database for this project is located on a separate server, and it can also be
                accessed through the PHP My Admin interface.<br>
                <br>
                <br>
                Using React JS as the Frontend of our app enabled us to create dynamic user
                interfaces. It is a powerful tool that could also be integrated in future
                updates. With React, we break down the app into components, making it easier to
                manage and update individual parts of the application. Additionally, React helped
                us improve the app's performance by rendering only the necessary components. The
                use of React JS can help enhance the user experience of the Aero Three app and
                make it more scalable in the future.</span></p>

                <p class=MsoNormal><u><span style='font-size:14.0pt;line-height:107%;
                font-family:"Arial",sans-serif'><span style='text-decoration:none'>&nbsp;</span></span></u></p>

                <p class=MsoNormal align=center style='text-align:center'><u><span
                style='font-size:14.0pt;line-height:107%;font-family:"Arial",sans-serif'>User
                Manual</span></u></p>

                <p class=MsoNormal><u><span style='font-size:12.0pt;line-height:107%;
                font-family:"Arial",sans-serif'>User Search Box:</span></u><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'><br>
                 <img width=624 height=222 id="תמונה 3"
                src="AeroThree_Rev_0.3_files/image002.jpg"></span></p>

                <p class=MsoListParagraphCxSpFirst style='text-indent:-.25in'><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>1.<span
                style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><u><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>Input
                Field – From:</span></u><span style='font-size:12.0pt;line-height:107%;
                font-family:"Arial",sans-serif'> Hardcoded into the app DB 1000+ International
                airports from around the world with their IATA code, City and Country. By
                typing at least 3 chars the app will try to autocomplete and help you choose
                the desire departure destination.</span></p>

                <p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>2.<span
                style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><u><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>Input
                Field – To:</span></u><span style='font-size:12.0pt;line-height:107%;
                font-family:"Arial",sans-serif'> Same as the &quot;From&quot;, just choose your
                desired destination.</span></p>

                <p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>3.<span
                style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><u><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>Date
                Picker – Departing</span></u><span style='font-size:12.0pt;line-height:107%;
                font-family:"Arial",sans-serif'>:  Choose the date you are interested for the
                app to search for a flight. <i>Due to API limitations the departing date can
                only be searched a week a head from today and up to a month in advance! – <b>This
                is not a bug, it's a Feature!!!</b></i></span></p>

                <p class=MsoListParagraphCxSpLast style='text-indent:-.25in'><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>4.<span
                style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><u><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>Featured
                &amp; Recent Searches:</span></u><span style='font-size:12.0pt;line-height:
                107%;font-family:"Arial",sans-serif'> In order to help users to quickly find
                flights and also see the most frequent searches, the app shows a recent search
                bar at the bottom of the main search window. The first few searches are
                Hardcoded to help the user find most traveled destinations the rest are the
                user searches.</span></p>

                <p class=MsoNormal style='margin-left:.25in'><b><i><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></i></b></p>

                <p class=MsoNormal><u><span style='font-size:12.0pt;line-height:107%;
                font-family:"Arial",sans-serif'>User Search Results Box:<br>
                <br>
                </span></u></p>

                <p class=MsoNormal><span lang=HE style='font-size:12.0pt;line-height:107%;
                font-family:"Arial",sans-serif'><img width=504 height=373 id="תמונה 4"
                src="AeroThree_Rev_0.3_files/image003.jpg"></span></p>

                <p class=MsoListParagraphCxSpFirst style='text-indent:-.25in'><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>1.<span
                style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>Date and
                Time of the flight found in API or DB.</span></p>

                <p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>2.<span
                style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>Departure
                location details and next to it Landing location details.</span></p>

                <p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>3.<span
                style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>Airline
                and flight number – Codeshare flights are not show due to duplications.</span></p>

                <p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>4.<span
                style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>Standard
                Ticket price.*</span></p>

                <p class=MsoListParagraphCxSpMiddle style='text-indent:-.25in'><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>5.<span
                style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>Book
                button – Anon users will be redirected to the Sign Up / Registration page, if
                they are already registered users they can login. <b>A Flights can only be
                booked once!</b></span></p>

                <p class=MsoListParagraphCxSpLast style='text-indent:-.25in'><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>6.<span
                style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>Remaining
                tickets shows how many tickets are available, When a user book a flight the
                counter is deducting a ticket from the total available seats.*</span></p>

                <p class=MsoNormal style='margin-left:.25in'><b><i><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'>*</span></i></b><i><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'>- Our
                API provider – &quot;Flight Aviation&quot; isn't providing us with Flights
                Prices and Seats availability. Therefore once a user is searching for a flight,
                our app is auto generating a random reasonable price and seats availability and
                write it to the DB. From this stage every change to the flight considered the
                auto generated fields as it was part of the data given to us by the API. </span></i></p>

                <p class=MsoNormal style='margin-left:.25in'><u><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'>Registration:</span></u></p>

                <p class=MsoNormal style='margin-left:.25in'><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'><img width=232 height=341
                id="תמונה 6" src="AeroThree_Rev_0.3_files/image004.png"></span><u><span
                style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'><br>
                </span></u><span style='font-size:12.0pt;line-height:107%;font-family:"Arial",sans-serif'><br>
                Users that want's to book a flight need to <i>Registered users</i>, this can be
                achieved either by clicking on the &quot;Sign Up&quot; button at the top right
                corner of the app or after pressing the &quot;Book&quot; button in the search
                results box. </span></p>

                <p class=MsoNormal style='margin-left:.25in'><u><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'>From Registered user to
                Customer:</span></u></p>

                <p class=MsoNormal style='margin-left:.25in'><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'><img width=506 height=226
                id="תמונה 9" src="AeroThree_Rev_0.3_files/image005.png"></span></p>

                <p class=MsoNormal style='margin-left:.25in'><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'>Once a registered user is
                interesting in booking a flights the &quot;Book Your Flight&quot; windows will
                open and allow the user to enter personal details and payment options*</span></p>

                <p class=MsoNormal style='margin-left:.25in'><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'>This is only entered once and
                the system saves the information for future use so the next time a registered
                user is booking a flight they are already treated as customers and the no more
                information is needed.<br>
                <br>
                * To Keep this project manageable and for convenience reasons the information
                in this page is partially auto generated since it is getting too complicated as
                it is </span><span style='font-size:12.0pt;line-height:107%;font-family:Wingdings'>J</span></p>

                <p class=MsoNormal style='margin-left:.25in'><u><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'>Administrator Search Results
                Box: <br>
                <br>
                </span></u></p>

                <p class=MsoNormal style='margin-left:.25in'><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'><img width=236 height=191
                id="תמונה 1" src="AeroThree_Rev_0.3_files/image006.png"></span></p>

                <p class=MsoNormal style='margin-left:.25in'><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'>When logged as Admin an option
                menu appears inside the search result box.</span></p>

                <p class=MsoNormal style='margin-left:.25in'><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'>Delete - Delete this flights
                from the DB.</span></p>

                <p class=MsoNormal style='margin-left:.25in'><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'><img width=513 height=374
                id="תמונה 5" src="AeroThree_Rev_0.3_files/image007.png"></span></p>

                <p class=MsoNormal style='margin-left:.25in'><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'>Edit – The header shows the
                Flight ID in the DB and since the price and seats are randomly generated by the
                system (at first search by the user), an Admin can override these values.</span></p>

                <p class=MsoNormal style='margin-left:.25in'><b><u><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'>More Admin operations that
                including managing and controlling users and customers can be done in the
                Django Admin Panel</span></u></b></p>

                <p class=MsoNormal style='margin-left:.25in'><b><u><span style='font-size:12.0pt;
                line-height:107%;font-family:"Arial",sans-serif'><span style='text-decoration:
                 none'>&nbsp;</span></span></u></b></p>

                </div>
    )
}
