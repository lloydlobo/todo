import { motion } from "framer-motion";

export function TaskCard({ task }: { task: string }) {
    return (
        <>
            <section className="container  grid min-h-screen items-center justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                        // rotate: 360,
                        scale: 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                    whileTap={{
                        // scale: 0.8,
                        borderRadius: "100%",
                    }}
                    // whileHover={{ scale: 1.1 }}
                >
                    <div className="card text-inherit shadow-slate-700/40 prose-h1:text-inherit prose  h-fit rounded-md bg-black/40 p-8 shadow-lg backdrop-blur-lg">
                        <header className="card-header">
                            <h1 className="task">{task}</h1>
                        </header>

                        <div className="card-body">
                            <p className="text-sm">{task}</p>
                        </div>
                        <div className="card-actions">
                            <button>Hello</button>
                        </div>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
