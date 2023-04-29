import { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import {
    Button,
    Label,
    Modal,
    TextInput,
} from "flowbite-react";


export default function EditUserModal() {
    const [isOpen, setOpen] = useState(false);
  
    return (
      <>
        <Button className="bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:border-none focus:ring-sky-200" onClick={() => setOpen(true)}>
          <div className="flex items-center gap-x-2">
            <HiOutlinePencilAlt className="text-lg" />
            Edit
          </div>
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Edit</strong>
          </Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <div className="mt-1">
                  <TextInput
                    id="firstName"
                    name="firstName"
                    placeholder="Donald"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="SurName">Sur Name</Label>
                <div className="mt-1">
                  <TextInput id="SurName" name="SurName" placeholder="Trump" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <TextInput
                    id="email"
                    name="email"
                    placeholder="example@company.com"
                    type="email"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="mt-1">
                  <TextInput
                    id="phone"
                    name="phone"
                    placeholder="e.g., +(12)3456 789"
                    type="tel"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="credit_card">Credit Card</Label>
                <div className="mt-1">
                  <TextInput
                    id="credit_card"
                    name="credit_card"
                    placeholder="4222 2222 2222 2222"
                  />
                </div>
              </div>
              <div>
              <div>
                <Label htmlFor="related_user">Related User</Label>
                <div className="mt-1">
                  <TextInput
                    id="related_user"
                    name="related_user"
                    placeholder="4"
                  />
                </div>
              </div>
              </div>
              <div>
                <Label htmlFor="passwordNew">New password</Label>
                <div className="mt-1">
                  <TextInput
                    id="passwordNew"
                    name="passwordNew"
                    placeholder="••••••••"
                    type="password"
                  />
                  <Label htmlFor="passwordNew" className="mt-2">
                    <span className="text-xs text-gray-400">
                      Leave blank to keep the same
                    </span>
                  </Label>
                </div>
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="success" onClick={() => setOpen(false)}>
              Save all
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };