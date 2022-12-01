import _ from "lodash";
import { BRAND } from "../constants";

/**
 * Split the brand name into two parts.
 *
 * @return {Object} The two parts of the brand name.
 */
export function splitBrandName() {
    const brand = BRAND.name;
    const cloneBrand = _.cloneDeep(brand);
    const len = cloneBrand.length;
    const b1 = cloneBrand.slice(0, len / 2);
    const b2 = cloneBrand.slice(len / 2, len);
    return { b1, b2 };
}
