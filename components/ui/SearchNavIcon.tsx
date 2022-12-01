import { SearchIcon } from "./icons";
import { KBDIcon } from "./kbd";

export default function SearchNavIcon() {
    return (
        <>
            <div className="hidden h-10 w-[18ch] cursor-pointer select-none border border-gray4 bg-gray6/90 pr-1 pl-4 hover:border-pink-500 hover:bg-gray5/90 hover:drop-shadow-[0_0_5px_rgba(225,34,94,0.5)] sm:flex sm:inline-flex">
                <div className="flex w-full items-center gap-2 text-[0.85rem] font-bold">
                    <SearchIcon className="h-4 w-4 stroke-[4px]" />
                    <span className="mr-auto">Search</span>
                    <div className="flex scale-[80%] items-center space-x-1">
                        <KBDIcon>
                            <span className="text-[10px]">Ctrl</span>
                        </KBDIcon>
                        <span className="text-[10px]">+</span>
                        <KBDIcon>
                            <span className="text-[10px]">K</span>
                        </KBDIcon>
                    </div>
                </div>
            </div>
            <SearchIcon className="flex aspect-square h-fit w-4 items-center stroke-[3px] sm:hidden " />
        </>
    );
}
