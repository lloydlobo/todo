import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
    CheckIcon,
    ChevronRightIcon,
    DotFilledIcon,
    GearIcon,
} from "@radix-ui/react-icons"; // https://icons.radix-ui.com/

//
// https://www.radix-ui.com/docs/primitives/components/dropdown-menu
export function MenuDropdown() {
    return (
        <div>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button
                        type="submit"
                        className="IconButton"
                        aria-label="Customise options"
                    >
                        <GearIcon />
                        <span className="sr-only" aria-hidden="false">
                            Settings Menu
                        </span>
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content sideOffset={5} className="text-xs">
                        <DropdownMenu.Item>
                            <div className="grid grid-flow-col gap-4">
                                New Tab
                                <span className="flex-1 place-self-end opacity-60">
                                    ⌘+T
                                </span>
                            </div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                            <div className="grid grid-flow-col gap-4 ">
                                New Window
                                <span className="flex-1 place-self-end opacity-60">
                                    ⌘+N
                                </span>
                            </div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                            <div className="grid grid-flow-col gap-4 ">
                                New Private Window
                                <span className="flex-1 place-self-end opacity-60">
                                    ⇧+⌘+P
                                </span>
                            </div>
                        </DropdownMenu.Item>

                        <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger>
                                <div className="grid grid-flow-col gap-4 ">
                                    More Tools
                                    <span className="flex-1 place-self-end opacity-60">
                                        <ChevronRightIcon />
                                    </span>
                                </div>
                            </DropdownMenu.SubTrigger>

                            <DropdownMenu.Portal>
                                <DropdownMenu.SubContent
                                    className="px-2 text-xs"
                                    sideOffset={2}
                                    alignOffset={-5}
                                >
                                    <DropdownMenu.Item>
                                        <div className="grid grid-flow-col gap-4 ">
                                            Save Page As…{" "}
                                            <span className="flex-1 place-self-end opacity-60">
                                                ⇧+S
                                            </span>
                                        </div>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item>
                                        <div className="grid grid-flow-col gap-4 ">
                                            Create Shortcut…
                                        </div>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item>
                                        <div className="grid grid-flow-col gap-4 ">
                                            Name Window…
                                        </div>
                                    </DropdownMenu.Item>

                                    <DropdownMenu.Separator className="m-[5px] h-[1px]  bg-zinc-600/90" />

                                    <DropdownMenu.Item>
                                        <div className="grid grid-flow-col gap-4 ">
                                            Developer Tools
                                        </div>
                                    </DropdownMenu.Item>
                                </DropdownMenu.SubContent>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Sub>

                        <DropdownMenu.Separator className="DropdownMenuSeparator" />

                        <DropdownMenu.CheckboxItem
                            className="DropdownMenuCheckboxItem"
                            // checked={bookmarksChecked}
                            // onCheckedChange={setBookmarksChecked}
                        >
                            <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                                <CheckIcon />
                            </DropdownMenu.ItemIndicator>
                            Show Bookmarks <div className="RightSlot">⌘+B</div>
                        </DropdownMenu.CheckboxItem>
                        <DropdownMenu.CheckboxItem
                            className="DropdownMenuCheckboxItem"
                            // checked={urlsChecked}
                            // onCheckedChange={setUrlsChecked}
                        >
                            <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                                <CheckIcon />
                            </DropdownMenu.ItemIndicator>
                            Show Full URLs
                        </DropdownMenu.CheckboxItem>

                        <DropdownMenu.Separator className="DropdownMenuSeparator" />

                        <DropdownMenu.Label className="DropdownMenuLabel">
                            People
                        </DropdownMenu.Label>
                        <DropdownMenu.RadioGroup
                        //    value={person} onValueChange={setPerson}
                        >
                            <DropdownMenu.RadioItem
                                className="DropdownMenuRadioItem"
                                value="pedro"
                            >
                                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                                    <DotFilledIcon />
                                </DropdownMenu.ItemIndicator>
                                Pedro Duarte
                            </DropdownMenu.RadioItem>
                            <DropdownMenu.RadioItem
                                className="DropdownMenuRadioItem"
                                value="colm"
                            >
                                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                                    <DotFilledIcon />
                                </DropdownMenu.ItemIndicator>
                                Colm Tuite
                            </DropdownMenu.RadioItem>
                        </DropdownMenu.RadioGroup>

                        <DropdownMenu.Arrow className="DropdownMenuArrow" />
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );
}
