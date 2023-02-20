import { Footer } from "flowbite-react"


export default function FooterComponent(){

    return (
      <Footer container={true}>
        <div className="w-full mx-12">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <Footer.Brand
                href="https://flowbite.com"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Airplane_ballonicon2.svg/1280px-Airplane_ballonicon2.svg.png"
                alt="AeroThree Logo"
                name="AeroThree"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="about" />
                <Footer.LinkGroup col={true}>
                  <Footer.Link href="#">
                    AeroThree
                  </Footer.Link>
                  <Footer.Link href="#">
                    Tailwind CSS
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow us" />
                <Footer.LinkGroup col={true}>
                  <Footer.Link href="#">
                    YouTube
                  </Footer.Link>
                  <Footer.Link href="#">
                    Twitter
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col={true}>
                  <Footer.Link href="#">
                    Privacy Policy
                  </Footer.Link>
                  <Footer.Link href="#">
                    Terms & Conditions
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright
              href="#"
              by="AeroThree"
              year={new Date().getFullYear()}
            />
          </div>
        </div>
      </Footer>
    )
}
