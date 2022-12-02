import { Dispatch, MutableRefObject, SetStateAction } from "react";

export type ObserverOnScrollProps = {
    setVisible: Dispatch<SetStateAction<boolean>>;
    repeat: boolean;
    ref: MutableRefObject<null>;
};
