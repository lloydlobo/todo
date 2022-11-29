import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetStaticPaths } from "next";
import { NextRouter, Router, useRouter } from "next/router";
import { z } from "zod";
import { Layout } from "../../components/layout";

import { TaskCard } from "../../components/task";
import { fetchTask } from "../../lib/api";
import { TASK_API_QUERY_KEY } from "../../lib/constants";

export type SchemaSearch = {
    task?: string;
    id: number;
    slug?: string;
};

// Creating a schema for search input query.
export const SearchSchema = z.object({
    task: z.string().min(5).max(99),
    id: z.number(),
    slug: z.string().url(),
});

// https://github.com/colinhacks/zod/tree/6ce18f3de2ce29c3c3eb35ac08983d181311b40e#strings
export function validateRouterQuery(input: any | unknown | string): {
    data: string;
    error: Error;
} {
    const stringScheme = z.string();
    const validData = { id: input.id };

    const results = stringScheme.safeParse(validData.id);
    if (!results.success) {
        const fmtErrors = results.error.format();
        validData.id = Number(fmtErrors._errors.join(", ")) || Number("");
    }

    return { data: validData.id?.toString(), error: new Error("") };
}

export default function TaskPage() {
    const router: NextRouter = useRouter();
    const { data: taskID, error } = validateRouterQuery(router.query);

    const {
        isSuccess,
        data: task,
        isLoading,
        isError,
    } = useQuery(
        [TASK_API_QUERY_KEY.FETCH_TASK, taskID],
        () => fetchTask(taskID),
        { enabled: taskID?.length > 0, staleTime: Infinity }
    );

    const isUndefined = z.undefined();
    //// const isUndefinedTask = isUndefined.parse(task);
    //// if (true || !isUndefinedTask) {
    const isUndefinedTask = false;

    if (isSuccess) {
        return (
            <Layout title={task}>
                <div className="task">
                    <TaskCard task={task.task} />
                </div>
            </Layout>
        );
    }
    if (isLoading)
        return <div className="text-info text-center">Loading...</div>;
    if (isError)
        return (
            <div className="text-errcerterlex tei-foter">
                <p>Sorry! We couldn&apos;t find your pokemon </p>
                <div role="img" aria-label="sad">
                    😢r text-erro
                </div>
            </div>
        );
    return <></>;
}

/**
 * - pre-render these pages with Next.js' getStaticProps method.
 * Using Static pre-rendering instead of server-side pre-rendering because the
 * data is publicly available, will barely ever change, and we want the best
 * possible SEO performance.
 *
 * @source https://prateeksurana.me/blog/mastering-data-fetching-with-react-query-and-next-js/#fetching-data-on-the-server
 */
export const getStaticProps = async (ctx: {
    params: { id: string | unknown | any };
}) => {
    const id = ctx.params?.id; // http://../task/<_id>.com
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([TASK_API_QUERY_KEY.FETCH_TASK, id], () =>
        fetchTask(id)
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

/**
 * You should use getStaticProps if:
 * The data required to render the page is available at build time ahead of a
 * user's request The data comes from a headless CMS.
 *
 * The page must be pre-rendered (for SEO) and be very fast — getStaticProps
 * generates HTML and JSON files, both of which can be cached by a CDN for
 * performance The data can be publicly cached (not user-specific). This condition
 * can be bypassed in certain specific situation by using a Middleware to rewrite
 * the path.
 *
 * @source https://nextjs.org/docs/basic-features/data-fetching/get-static-props
 */
export const getStaticPaths: GetStaticPaths = async (): Promise<{
    paths: never[];
    fallback: "blocking";
}> => {
    return {
        paths: [],
        fallback: "blocking",
    };
};
