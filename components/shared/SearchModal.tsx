import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CtrlK } from "../../lib/util/key-bindings";
import { CrossIcon } from "../ui/icons";
import SearchNavIcon from "../ui/SearchNavIcon";
import Search from "./Search";

export function SearchModal() {
    let [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(!isOpen);
    };
    const openModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <CtrlK onPress={() => setIsOpen(!isOpen)} />
            <button
                title="search icon"
                type="button"
                onClick={openModal}
                className=""
            >
                <SearchNavIcon />
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="h-[85vh] w-full max-w-xl transform overflow-hidden rounded-2xl bg-gray7 p-6 text-left align-middle shadow-xl transition-all xl:max-w-6xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-center text-gray-900 fnt-display"
                                    >
                                        Search
                                    </Dialog.Title>

                                    <div className="mt-2">
                                        <Search />
                                    </div>

                                    <div className="absolute top-0 right-0 m-6">
                                        <button
                                            title="close modal"
                                            type="button"
                                            className=""
                                            onClick={closeModal}
                                        >
                                            <CrossIcon />
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
