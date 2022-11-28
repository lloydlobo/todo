import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
    HamburgerMenuIcon,
    DotFilledIcon,
    CheckIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons";

export function MenuDropdown() {
    return (
        <div className="shadow">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button
                        type="submit"
                        className="IconButton"
                        aria-label="Customise options"
                    >
                        <HamburgerMenuIcon />
                        <span className="sr-only" aria-hidden="false">
                            Settings Menu
                        </span>
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                    <DropdownMenu.Item>New Tab</DropdownMenu.Item>
                    <DropdownMenu.Item>New Window</DropdownMenu.Item>
                    <DropdownMenu.Item>New Private Window</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    );
}
