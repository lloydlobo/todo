import Link from "next/link";
import { BRAND } from "../../lib/constants";

export function Copyright() {
    return (
        <>
            <div className="inline-flex items-center gap-[1ch] text-xs">
                <span>Copyright &copy; {new Date().getFullYear()}</span>
                <Link href={"/"}>
                    <span>{BRAND.name}</span>
                </Link>
                <br />
            </div>
        </>
    );
}
