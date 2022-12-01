import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { searchTodos } from "../../lib/api";
import { useDebounce } from "../../lib/hooks";
import { TodoSearchResult } from "../ui/TodoSearchResult";
import { SearchIcon, CrossIcon } from "../ui/icons";

export default function Search() {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 300);

    //  enabled option, which prevents the Query from running automatically when set
    //  to false. So we wouldn't want to execute a request initially when the search
    //  string is empty or when the user clears the text field.
    const { isLoading, isError, isSuccess, data } = useQuery(
        ["searchTodos", debouncedSearchValue],
        async () => searchTodos(debouncedSearchValue),
        {
            enabled: debouncedSearchValue.length > 0,
        }
    );

    const renderSearchResult = () => {
        if (isLoading) {
            return <div className="sr-only search-message">Loading...</div>;
        }
        if (isError) {
            return (
                <div className="text-red-500 search-message">
                    Something went wrong
                </div>
            );
        }
        return isSuccess ? <TodoSearchResult todos={data} /> : <></>;
    };
    return (
        <>
            <div className="grid justify-center">
                <div className="relative z-10 grid w-[45vw] items-center xl:max-w-5xl">
                    <div
                        title="search-icon-result-space"
                        className="px-5 border rounded-3xl border-gray4 bg-gray7 hover:bg-gray7/90 "
                    >
                        <div className="z-50 flex items-center space-x-4">
                            <SearchIcon className="h-4 w-4 stroke-gray4 stroke-[4px]" />
                            <input
                                type="text"
                                className="w-full py-2 outline-none bg-transparant outline-transparant"
                                onChange={({ target: { value } }) =>
                                    setSearchValue(value)
                                }
                                value={searchValue}
                                // onBlur={() => setSearchValue("")}
                            />
                            <button
                                title="Clear Search Input"
                                type="button"
                                onClick={() => setSearchValue("")}
                            >
                                <CrossIcon className="w-5 h-5 stroke-gray4" />
                            </button>
                        </div>
                        <div
                            title="search-divider"
                            className={`linear top-0 mx-auto w-[99%] translate-y-0.5 border-t-[1.0px] border-gray4 transition-all delay-[205ms] ${
                                searchValue ? "opacity-80" : "opacity-0"
                            }`}
                        />
                    </div>

                    <div className="relative top-0 left-0 right-0 w-full -z-10">
                        {renderSearchResult()}
                    </div>
                </div>
            </div>
        </>
    );
}
